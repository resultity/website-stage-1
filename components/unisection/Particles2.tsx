// components/Particles2.tsx
// Reusable canvas particle background (TypeScript-safe, with cleanup).

'use client'

import React, { useEffect, useRef } from 'react'

export type Particles2Props = {
  /** Number of particles */
  count?: number
  /** Max distance to draw links between particles */
  maxLinkDistance?: number
  /** Base particle color (hex like #ffaa00) */
  color?: string
  /** Canvas opacity for particle fills (0–1) */
  fillOpacity?: number
  /** Velocity multiplier */
  speedMultiplier?: number
  /** Size range [min, max] */
  sizeRange?: [number, number]
  /** Use devicePixelRatio for crisp rendering */
  crisp?: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export default function Particles2({
  count = 60,
  maxLinkDistance = 120,
  color = '#faa629',
  fillOpacity = 0.1,
  speedMultiplier = 0.5,
  sizeRange = [2, 8],
  crisp = true,
}: Particles2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')! // non-null: we bail out if unavailable

    const parent = canvas.parentElement
    if (!parent) return

    let raf = 0
    let dpr = crisp ? Math.max(1, window.devicePixelRatio || 1) : 1

    // Logical CSS pixels
    let cssW = parent.offsetWidth || 0
    let cssH = parent.offsetHeight || 0

    // Backing store pixels (scaled by DPR)
    const setCanvasSize = () => {
      cssW = parent.offsetWidth || cssW
      cssH = parent.offsetHeight || cssH
      canvas.width = Math.max(1, Math.floor(cssW * dpr))
      canvas.height = Math.max(1, Math.floor(cssH * dpr))
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // scale drawing ops to CSS pixels
    }

    setCanvasSize()

    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (Math.random() - 0.5) * speedMultiplier,
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      })
    }

    const hexWithAlpha = (hex: string, alpha01: number) => {
      const a = Math.max(0, Math.min(1, alpha01))
      const aa = Math.round(a * 255)
        .toString(16)
        .padStart(2, '0')
      return `${hex}${aa}`
    }

    function draw() {
      ctx.clearRect(0, 0, cssW, cssH)

      // draw links
      ctx.lineWidth = 1
      for (let i = 0; i < count; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxLinkDistance) {
            const alpha = 1 - dist / maxLinkDistance
            ctx.strokeStyle = hexWithAlpha(color, Math.min(1, alpha * 0.12))
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // draw particles
      ctx.fillStyle = hexWithAlpha(color, fillOpacity)
      for (const p of particles) {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > cssW) p.vx *= -1
        if (p.y < 0 || p.y > cssH) p.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(update)
    }

    update()

    const handleResize = () => {
      dpr = crisp ? Math.max(1, window.devicePixelRatio || 1) : 1
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [count, maxLinkDistance, color, fillOpacity, speedMultiplier, sizeRange, crisp])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
