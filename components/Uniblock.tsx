// components/Uniblock.tsx

'use client'

import clsx from 'clsx'
import React, { useState, useEffect, useRef } from 'react'

type UniblockProps = {
  className?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  opacity?: [number, number][]
  animation?: boolean
  stagger?: number
  children: React.ReactNode[]
}

type LayerStyle = React.CSSProperties & {
  ['--target-opacity']?: number | string
}

export default function Uniblock({
  className,
  padding = 'medium',
  style,
  opacity = [],
  animation = false,
  stagger = 0.2,
  children,
}: UniblockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const layers = React.Children.toArray(children)
  const opacityMap = Object.fromEntries(opacity)

  useEffect(() => {
    if (!animation) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [animation])

  const paddingClasses = {
    none: 'py-0',
    small: 'py-2',
    medium: 'py-4',
    large: 'py-6',
  }[padding]
  const marginClasses = {
    none: 'my-0',
    small: 'my-2',
    medium: 'my-4',
    large: 'my-6',
  }[padding]

  return (
    <div
      ref={containerRef}
      className={clsx(paddingClasses, marginClasses, className)}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {layers.map((child, i) => {
        const isTop = i === layers.length - 1
        const targetOpacity = (opacityMap as Record<number, number | undefined>)[i] ?? 1
        const baseStyle: LayerStyle = {
          position: isTop ? 'relative' : 'absolute',
          inset: isTop ? undefined : 0,
          zIndex: i,
          pointerEvents: isTop ? undefined : 'none',
          ['--target-opacity']: targetOpacity,
          opacity: animation ? 0 : Number(targetOpacity),
        }

        if (animation && (revealed || i === 0)) {
          const delay = `${i * (stagger ?? 0)}s`
          Object.assign(baseStyle, {
            animationName: 'fadeInUp',
            animationDuration: '0.6s',
            animationFillMode: 'forwards',
            animationDelay: i === 0 ? '0s' : delay,
          } as LayerStyle)
        }

        return (
          <div
            key={i}
            className={`uniblock-layer uniblock-layer-${i}`}
            style={baseStyle}
          >
            {child}
          </div>
        )
      })}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0); opacity: var(--target-opacity); }
        }
      `}</style>
    </div>
  )
}
