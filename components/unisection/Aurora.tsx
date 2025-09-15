// ./components/unisection/Aurora.tsx
// Aurora.tsx — OGL with WebGL2→WebGL1 fallback, TypeScript-safe.

import { useEffect, useRef } from "react";
import {
  Renderer,
  Program,
  Mesh,
  Color,
  Triangle,
  type OGLRenderingContext,
} from "ogl";

// WebGL1 shaders
const VERT_GLSL1 = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_GLSL1 = `
precision mediump float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

float snoise(vec2 v){
  const vec4 C = vec4(0.2113248654, 0.3660254038, -0.5773502692, 0.0243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = mod(((i.y + vec3(0.0, i1.y, 1.0)) * 34.0 + 1.0) * (i.y + vec3(0.0, i1.y, 1.0)), 289.0)
         + i.x + vec3(0.0, i1.x, 1.0);
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m *= m; m *= m;
  vec3 x = 2.0 * fract(p * (1.0/41.0)) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.792842914 - 0.853734721 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 ramp(float f, vec3 c0, vec3 c1, vec3 c2){
  vec3 c = mix(c0, c1, smoothstep(0.0, 0.5, f));
  c = mix(c,  c2, smoothstep(0.5, 1.0, f));
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 rampColor = ramp(uv.x, uColorStops[0], uColorStops[1], uColorStops[2]);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;

  gl_FragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

// WebGL2 shaders
const VERT_GLSL3 = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG_GLSL3 = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

float snoise(vec2 v){
  const vec4 C = vec4(0.2113248654, 0.3660254038, -0.5773502692, 0.0243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = mod(((i.y + vec3(0.0, i1.y, 1.0)) * 34.0 + 1.0) * (i.y + vec3(0.0, i1.y, 1.0)), 289.0)
         + i.x + vec3(0.0, i1.x, 1.0);
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m *= m; m *= m;
  vec3 x = 2.0 * fract(p * (1.0/41.0)) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.792842914 - 0.853734721 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 ramp(float f, vec3 c0, vec3 c1, vec3 c2){
  vec3 c = mix(c0, c1, smoothstep(0.0, 0.5, f));
  c = mix(c,  c2, smoothstep(0.5, 1.0, f));
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 rampColor = ramp(uv.x, uColorStops[0], uColorStops[1], uColorStops[2]);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

export default function Aurora({
  colorStops = ["#f9a729", "#ffffff", "#f9a728"],
  amplitude = 1.0,
  blend = 0.5,
  time,
  speed = 1.0,
}: AuroraProps) {
  const propsRef = useRef({ colorStops, amplitude, blend, time, speed });
  propsRef.current = { colorStops, amplitude, blend, time, speed };

  const ctnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnRef.current;
    if (!ctn) return;

    const rect = ctn.getBoundingClientRect();
    const initW = Math.max(1, Math.floor(rect.width || ctn.offsetWidth || 1));
    const initH = Math.max(1, Math.floor(rect.height || ctn.offsetHeight || 1));

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "transparent";
    ctn.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Let OGL choose WebGL2 and fallback internally if needed
    const renderer = new Renderer({
      canvas,
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      dpr,
      powerPreference: "low-power",
    });

    const gl = renderer.gl as OGLRenderingContext;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    renderer.setSize(initW, initH);

    const geometry = new Triangle(gl);

    const toRGB = (hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b] as [number, number, number];
    };

    // Prefer Renderer.isWebgl2 when available
    const isGL2 = (renderer as unknown as { isWebgl2?: boolean }).isWebgl2 === true;

    const program = new Program(gl, {
      vertex: isGL2 ? VERT_GLSL3 : VERT_GLSL1,
      fragment: isGL2 ? FRAG_GLSL3 : FRAG_GLSL1,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: propsRef.current.amplitude },
        uColorStops: { value: (propsRef.current.colorStops || colorStops).map(toRGB) },
        uResolution: { value: [initW, initH] },
        uBlend: { value: propsRef.current.blend },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });


    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;

      const nowTime =
        ((propsRef.current.time ?? t * 0.01) * (propsRef.current.speed ?? 1.0)) * 0.1;

      (program.uniforms.uTime as { value: number }).value = nowTime;
      (program.uniforms.uAmplitude as { value: number }).value =
        propsRef.current.amplitude ?? 1.0;
      (program.uniforms.uBlend as { value: number }).value = propsRef.current.blend ?? 0.5;

      const stops = propsRef.current.colorStops ?? colorStops;
      (program.uniforms.uColorStops as { value: [number, number, number][] }).value =
        stops.map(toRGB);

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cr = entry.contentRect;
      const W = Math.max(1, Math.floor(cr.width));
      const H = Math.max(1, Math.floor(cr.height));
      renderer.setSize(W, H);
      (program.uniforms.uResolution as { value: [number, number] }).value = [W, H];
    });
    ro.observe(ctn);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    const onRestored = () => {
      // No-op; uniforms and sizes update each frame
    };
    canvas.addEventListener("webglcontextlost", onLost, { passive: false });
    canvas.addEventListener("webglcontextrestored", onRestored, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (canvas.parentNode === ctn) ctn.removeChild(canvas);
      (renderer as unknown as { dispose?: () => void }).dispose?.();
      try {
        (gl as unknown as WebGLRenderingContext)
          .getExtension("WEBGL_lose_context")
          ?.loseContext?.();
      } catch {
        /* noop */
      }
    };
  }, [colorStops]);

  return <div ref={ctnRef} className="aurora-container" />;
}
