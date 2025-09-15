// ./components/unisection/Particles.tsx
'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

type ParticlesProps = {
  particleColors?: string[]
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  moveParticlesOnHover?: boolean
  particleHoverFactor?: number
  alphaParticles?: boolean
  disableRotation?: boolean
  className?: string
  style?: React.CSSProperties
}

const defaultColors = ['#ffffff', '#ffffff', '#ffffff']

function hexToRgb(hex: string) {
  // convert #rgb or #rrggbb to float rgb (0..1)
  let h = hex.replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const int = parseInt(h, 16)
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

// Renderer options type to avoid using `any`
type OglRendererOptions = {
  dpr?: number
  alpha?: boolean
  depth?: boolean
  antialias?: boolean
  premultipliedAlpha?: boolean
  stencil?: boolean
  preserveDrawingBuffer?: boolean
  powerPreference?: WebGLPowerPreference
  webgl?: 1 | 2
}

// vertex shader
const vertex = `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vRandom = random;
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = modelMatrix * vec4(pos, 1.0);
  float t = uTime;
  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

  vec4 mvPos = viewMatrix * mPos;
  gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}
`

// fragment shader
const fragment = `
precision highp float;

uniform float uTime;
uniform float uAlphaParticles;
varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - vec2(0.5));

  if (uAlphaParticles < 0.5) {
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
  }
}
`

export default function Particles({
  particleColors,
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  disableRotation = false,
  className,
  style,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // SSR guard and container presence
    if (typeof window === 'undefined') return
    const container = containerRef.current
    if (!container) return

    // bail if container has no size
    const rect0 = container.getBoundingClientRect()
    if (rect0.width === 0 || rect0.height === 0) return

    // quick WebGL capability probe
    const canUseWebGL = (() => {
      try {
        const c = document.createElement('canvas')
        return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
      } catch {
        return false
      }
    })()
    if (!canUseWebGL) return

    // clamp DPR for mobile to avoid oversized framebuffers
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    // create renderer (try WebGL2, fallback to WebGL1 by hinting)
    let renderer: Renderer | null = null
    try {
      const opts: OglRendererOptions = {
        dpr,
        alpha: true,
        depth: false,
        antialias: false,
        premultipliedAlpha: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
        webgl: 2,
      }
      renderer = new Renderer(opts)
    } catch {
      try {
        const optsFallback: OglRendererOptions = {
          dpr,
          alpha: true,
          depth: false,
          antialias: false,
          premultipliedAlpha: false,
          stencil: false,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
          webgl: 1,
        }
        renderer = new Renderer(optsFallback)
      } catch {
        return
      }
    }
    if (!renderer) return

    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    container.appendChild(gl.canvas)
    gl.clearColor(0, 0, 0, 0)

    // camera
    const camera = new Camera(gl, { fov: 15 })
    camera.position.set(0, 0, cameraDistance)

    // resize handling
    const doResize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (w === 0 || h === 0) return
      renderer!.setSize(w, h)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }

    // ResizeObserver with proper callback
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => doResize())
      ro.observe(container)
    } else {
      window.addEventListener('resize', doResize, false)
    }
    doResize()

    // mouse tracking on window because container has pointer-events: none
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseRef.current = { x, y }
    }
    if (moveParticlesOnHover) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // geometry
    const count = Math.max(1, Math.floor(particleCount))
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count * 4)
    const colors = new Float32Array(count * 3)
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors

    for (let i = 0; i < count; i++) {
      let x, y, z, len
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
        len = x * x + y * y + z * z
      } while (len > 1 || len === 0)
      const r = Math.cbrt(Math.random())
      positions.set([x * r, y * r, z * r], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      const col = hexToRgb(palette[(Math.random() * palette.length) | 0])
      colors.set(col, i * 3)
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    })

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    // context lost protection
    let animationFrameId = 0
    const onLost = (e: Event) => {
      e.preventDefault()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
    const onRestored = () => {
      // no-op, full rebuild would be needed for proper restore
    }
    gl.canvas.addEventListener('webglcontextlost', onLost, false)
    gl.canvas.addEventListener('webglcontextrestored', onRestored, false)

    // animation loop
    let lastTime = performance.now()
    let elapsed = 0
    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update)
      const delta = t - lastTime
      lastTime = t
      elapsed += delta * speed
      program.uniforms.uTime.value = elapsed * 0.001

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor
        particles.position.y = -mouseRef.current.y * particleHoverFactor
      } else {
        particles.position.x = 0
        particles.position.y = 0
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15
        particles.rotation.z += 0.01 * speed
      }

      renderer!.render({ scene: particles, camera })
    }
    animationFrameId = requestAnimationFrame(update)

    // cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', doResize)
      if (moveParticlesOnHover) window.removeEventListener('mousemove', handleMouseMove)
      gl.canvas.removeEventListener('webglcontextlost', onLost)
      gl.canvas.removeEventListener('webglcontextrestored', onRestored)
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas)
    }
  }, [
    particleColors,
    particleCount,
    particleSpread,
    speed,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    disableRotation,
  ])

  return (
    <>
      <style>
        {`
        .particles-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        `}
      </style>
      <div
        ref={containerRef}
        className={`particles-container ${className || ''}`}
        style={style}
      />
    </>
  )
}
