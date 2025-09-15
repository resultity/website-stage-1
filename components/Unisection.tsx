// components/Unisection.tsx
'use client'

import clsx from 'clsx'
import React, { useState, useEffect, useRef } from 'react'

type UnisectionProps = {
  className?: string
  fullheight?: boolean
  withNavbarOffset?: boolean
  opacity?: [number, number][]
  padding?: 'none' | 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  animation?: boolean
  stagger?: number
  children: React.ReactNode[]
}

export default function Unisection({
  className,
  fullheight,
  withNavbarOffset,
  padding = 'medium',
  style,
  opacity = [],
  animation,
  stagger = 0.2,
  children,
}: UnisectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const layers = React.Children.toArray(children)
  const opacityMap = Object.fromEntries(opacity)
  const navbarOffset = withNavbarOffset ? '3.25rem' : undefined

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

  return (
    <section
      ref={containerRef}
      className={clsx(
        'section',
        {
          'py-0': padding === 'none',
          'py-2': padding === 'small',
          'py-4': padding === 'medium',
          'py-6': padding === 'large',
        },
        className
      )}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: fullheight ? '100vh' : '1vh',
        paddingTop: navbarOffset,
        ...style,
      }}
    >
      {layers.map((child, i) => {
        const isLast = i === layers.length - 1
        const targetOpacity = opacityMap[i] ?? 1
        const baseStyle: React.CSSProperties = {
          position: isLast ? 'relative' : 'absolute',
          inset: isLast ? undefined : 0,
          zIndex: i,
          pointerEvents: isLast ? undefined : 'none',
          '--target-opacity': targetOpacity,
          opacity: animation ? 0 : targetOpacity,
        } as React.CSSProperties

        if (animation && (revealed || i === 0)) {
          const delay = `${i * stagger}s`
          Object.assign(baseStyle, {
            animationName: 'fadeInUp',
            animationDuration: '0.6s',
            animationFillMode: 'forwards',
            animationDelay: i === 0 ? '0s' : delay,
          })
        }

        return (
          <div
            key={i}
            className={`unisection-layer unisection-layer-${i}`}
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
    </section>
  )
}
