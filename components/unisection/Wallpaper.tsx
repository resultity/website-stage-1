// ./components/unisection/Wallpaper.tsx

'use client'

import React, { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'

type FitMode = 'cover' | 'contain' | 'height' | 'width'

type WallpaperProps = {
  src: string
  posX?: number
  posY?: number
  zoom?: number
  background?: string
  blur?: number
  brightness?: number
  grayscale?: number
  opacity?: number
  blendMode?: React.CSSProperties['mixBlendMode']
  parallax?: boolean
  parallaxStrength?: number
  className?: string
  style?: React.CSSProperties

  // fit controls
  fit?: FitMode
  mobileFit?: FitMode
  mobileBreakpoint?: number
}

export default function Wallpaper({
  src,
  posX = 50,
  posY = 50,
  zoom = 100,
  background = '#000',
  blur,
  brightness,
  grayscale,
  opacity = 1,
  blendMode,
  parallax = false,
  parallaxStrength = 30,
  className,
  style,

  fit = 'cover',
  mobileFit,
  mobileBreakpoint = 768,
}: WallpaperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // detect mobile by breakpoint
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [mobileBreakpoint])

  // build filter string
  const filters = [
    blur !== undefined ? `blur(${blur}px)` : '',
    brightness !== undefined ? `brightness(${brightness})` : '',
    grayscale !== undefined ? `grayscale(${grayscale})` : '',
  ]
    .filter(Boolean)
    .join(' ')

  // parallax effect
  useEffect(() => {
    if (!parallax) return

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current
      if (!container) return

      let clientX: number, clientY: number
      if ('touches' in e) {
        clientX = e.touches[0]?.clientX ?? 0
        clientY = e.touches[0]?.clientY ?? 0
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const rect = container.getBoundingClientRect()
      const relX = (clientX - rect.left) / rect.width - 0.5
      const relY = (clientY - rect.top) / rect.height - 0.5

      setOffset({
        x: relX * parallaxStrength,
        y: relY * parallaxStrength,
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [parallax, parallaxStrength])

  useEffect(() => {
    if (!parallax) setOffset({ x: 0, y: 0 })
  }, [parallax])

  // effective fit
  const effFit: FitMode = isMobile && mobileFit ? mobileFit : fit

  // derived dimensions for the <img>
  const imgDim: React.CSSProperties =
    effFit === 'height'
      ? { width: 'auto', height: '100%', objectFit: 'unset' }
      : effFit === 'width'
      ? { width: '100%', height: 'auto', objectFit: 'unset' }
      : { width: '100%', height: '100%', objectFit: effFit }

  return (
    <div
      ref={containerRef}
      className={clsx('unisection-back-wallpaper', className)}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background,
        ...style,
      }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `
            translate(-50%, -50%)
            scale(${zoom / 100})
            translate(${offset.x}px, ${offset.y}px)
          `,
          objectPosition: `${posX}% ${posY}%`,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          filter: filters || undefined,
          opacity,
          mixBlendMode: blendMode,
          transition: parallax
            ? 'transform 0.2s cubic-bezier(.34,1.56,.64,1), filter 0.3s'
            : 'filter 0.3s',
          willChange: 'transform, filter',
          ...imgDim,
        }}
        draggable={false}
        decoding="async"
        loading="lazy"
      />
    </div>
  )
}
