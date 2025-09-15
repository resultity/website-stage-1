// Prism.tsx (optimized, backward-compatible)
// Notes:
// - Props API is unchanged; you can pass the same props as before.
// - Added optional `maxFPS` and `maxDpr` (non-breaking).
// - The fragment shader steps reduced to 64 for performance.
// - Hover listeners are scoped to the canvas; throttled.
// - IntersectionObserver is enabled by default to pause offscreen.
// - Respects prefers-reduced-motion by clamping effective timeScale.

import React, { useEffect, useRef } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";
import "./styles.css";

type PrismProps = {
  height?: number;
  baseWidth?: number;
  animationType?: "rotate" | "hover" | "3drotate";
  glow?: number;
  offset?: { x?: number; y?: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
  maxFPS?: number;
  maxDpr?: number;
};

const Prism: React.FC<PrismProps> = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = "rotate",
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = true,
  timeScale = 0.5,
  maxFPS = 30,
  maxDpr = 1.5,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW = Math.max(0.0, glow);
    const NOISE = Math.max(0.0, noise);
    const offX = offset?.x ?? 0;
    const offY = offset?.y ?? 0;
    const SAT = transparent ? 1.5 : 1.0;
    const SCALE = Math.max(0.001, scale);
    const HUE = hueShift || 0;
    const CFREQ = Math.max(0.0, colorFrequency || 1);
    const BLOOM = Math.max(0.0, bloom || 1);
    const TS = Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

    const prefersReducedMotion = (() => {
      try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {
        return false;
      }
    })();
    const effectiveTimeScale = prefersReducedMotion ? Math.min(TS, 0.1) : TS;

    const dpr = Math.min(maxDpr, Math.max(1, window.devicePixelRatio || 1));
    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      antialias: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
      depth: false,
      stencil: false,
    });

    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
    } as Partial<CSSStyleDeclaration>);
    container.appendChild(gl.canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 28;

        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / max(d, 1e-3);
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: iResBuf },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uGlow: { value: GLOW },
        uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE },
        uSaturation: { value: SAT },
        uScale: { value: SCALE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 },
        uTimeScale: { value: effectiveTimeScale },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0] = gl.drawingBufferWidth;
      iResBuf[1] = gl.drawingBufferHeight;
      offsetPxBuf[0] = offX * dpr;
      offsetPxBuf[1] = offY * dpr;
      program.uniforms.uPxScale.value =
        1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const rotBuf = new Float32Array(9);
    const setMat3FromEuler = (
      yawY: number,
      pitchX: number,
      rollZ: number,
      out: Float32Array
    ) => {
      const cy = Math.cos(yawY), sy = Math.sin(yawY);
      const cx = Math.cos(pitchX), sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ), sz = Math.sin(rollZ);
      const r00 = cy * cz + sy * sx * sz;
      const r01 = -cy * sz + sy * sx * cz;
      const r02 = sy * cx;
      const r10 = cx * sz;
      const r11 = cx * cz;
      const r12 = -sx;
      const r20 = -sy * cz + cy * sx * sz;
      const r21 = sy * sz + cy * sx * cz;
      const r22 = cy * cx;
      out[0] = r00; out[1] = r10; out[2] = r20;
      out[3] = r01; out[4] = r11; out[5] = r21;
      out[6] = r02; out[7] = r12; out[8] = r22;
      return out;
    };

    const NOISE_IS_ZERO = NOISE < 1e-6;

    const frameInterval = 1000 / Math.max(1, maxFPS);
    let raf = 0;
    let lastFrameTime = 0;
    const t0 = performance.now();

    const startRAF = () => {
      if (raf) return;
      raf = requestAnimationFrame(render);
    };
    const stopRAF = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let yaw = 0, pitch = 0, roll = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const pointer = { x: 0, y: 0, inside: false };
    let lastPointerUpdate = 0;
    const pointerUpdateInterval = 1000 / 30;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointerUpdate < pointerUpdateInterval) return;
      lastPointerUpdate = now;

      const rect = gl.canvas.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      pointer.x = Math.max(-1, Math.min(1, nx));
      pointer.y = Math.max(-1, Math.min(1, ny));
      pointer.inside = true;
      startRAF();
    };
    const onEnter = () => { pointer.inside = true; };
    const onLeave = () => { pointer.inside = false; };

    if (animationType === "hover") {
      program.uniforms.uUseBaseWobble.value = 0;
      gl.canvas.addEventListener("pointermove", onMove as EventListener, { passive: true });
      gl.canvas.addEventListener("pointerenter", onEnter as EventListener, { passive: true });
      gl.canvas.addEventListener("pointerleave", onLeave as EventListener, { passive: true });
      window.addEventListener("blur", onLeave as EventListener);
    } else if (animationType === "3drotate") {
      program.uniforms.uUseBaseWobble.value = 0;
    } else {
      program.uniforms.uUseBaseWobble.value = 1;
    }

    const rnd = () => Math.random();
    const wX = (0.3 + rnd() * 0.6);
    const wY = (0.2 + rnd() * 0.7);
    const wZ = (0.1 + rnd() * 0.5);
    const phX = rnd() * Math.PI * 2;
    const phZ = rnd() * Math.PI * 2;

    let prevRot0 = NaN;

    const render = (t: number) => {
      if (t - lastFrameTime < frameInterval) {
        raf = requestAnimationFrame(render);
        return;
      }
      const time = (t - t0) * 0.001;
      lastFrameTime = t;

      program.uniforms.iTime.value = time;

      let continueRAF = true;

      if (animationType === "hover") {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        const ty = (pointer.inside ? -pointer.x : 0) * maxYaw;
        const tp = (pointer.inside ?  pointer.y : 0) * maxPitch;

        const nextYaw = lerp(yaw, ty, INERT);
        const nextPitch = lerp(pitch, tp, INERT);
        const nextRoll = lerp(roll, 0, 0.1);

        if (nextYaw !== yaw || nextPitch !== pitch || nextRoll !== roll) {
          yaw = nextYaw; pitch = nextPitch; roll = nextRoll;
          const m = setMat3FromEuler(yaw, pitch, roll, rotBuf);
          if (m[0] !== prevRot0) {
            prevRot0 = m[0];
            program.uniforms.uRot.value = m;
          }
        }

        if (NOISE_IS_ZERO && !pointer.inside) {
          const settled =
            Math.abs(yaw - ty) < 1e-4 &&
            Math.abs(pitch - tp) < 1e-4 &&
            Math.abs(roll) < 1e-4;
          if (settled) continueRAF = false;
        }
      } else if (animationType === "3drotate") {
        const tScaled = time * effectiveTimeScale;
        const nyaw = tScaled * wY;
        const npitch = Math.sin(tScaled * wX + phX) * 0.6;
        const nroll = Math.sin(tScaled * wZ + phZ) * 0.5;

        if (nyaw !== yaw || npitch !== pitch || nroll !== roll) {
          yaw = nyaw; pitch = npitch; roll = nroll;
          const m = setMat3FromEuler(yaw, pitch, roll, rotBuf);
          if (m[0] !== prevRot0) {
            prevRot0 = m[0];
            program.uniforms.uRot.value = m;
          }
        }

        if (effectiveTimeScale < 1e-6) continueRAF = false;
      } else {
        if (prevRot0 !== 1) {
          rotBuf[0] = 1; rotBuf[1] = 0; rotBuf[2] = 0;
          rotBuf[3] = 0; rotBuf[4] = 1; rotBuf[5] = 0;
          rotBuf[6] = 0; rotBuf[7] = 0; rotBuf[8] = 1;
          prevRot0 = 1;
          program.uniforms.uRot.value = rotBuf;
        }
        if (effectiveTimeScale < 1e-6) continueRAF = false;
      }

      renderer.render({ scene: mesh });
      if (continueRAF) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    let io: IntersectionObserver | null = null;
    if (suspendWhenOffscreen) {
      io = new IntersectionObserver((entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis) startRAF();
        else stopRAF();
      }, { root: null, threshold: 0.01 });
      io.observe(container);
      startRAF();
    } else {
      startRAF();
    }

    return () => {
      stopRAF();
      ro.disconnect();
      if (animationType === "hover") {
        gl.canvas.removeEventListener("pointermove", onMove as EventListener);
        gl.canvas.removeEventListener("pointerenter", onEnter as EventListener);
        gl.canvas.removeEventListener("pointerleave", onLeave as EventListener);
        window.removeEventListener("blur", onLeave as EventListener);
      }
      if (io) io.disconnect();
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    height,
    baseWidth,
    animationType,
    glow,
    noise,
    offset?.x,
    offset?.y,
    scale,
    transparent,
    hueShift,
    colorFrequency,
    timeScale,
    hoverStrength,
    inertia,
    bloom,
    suspendWhenOffscreen,
    maxFPS,
    maxDpr,
  ]);

  return <div className="prism-container" ref={containerRef} />;
};

export default Prism;
