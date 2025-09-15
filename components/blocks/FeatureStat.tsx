// FeatureStat.tsx
// Bulma-friendly circular metric with ONLY the ring, text, and icon (no fills, no shaded backgrounds).
// - Bulma classes only (no Tailwind).
// - Progress is 0..100 via prop.
// - Icon can be 'above', 'badge' (top-right, no backplate), 'inside' (centered above label), or 'none'.
// - Ring color accepts Bulma color names or any CSS color; text color likewise.

import React, { useEffect, useMemo, useRef, useState } from 'react'

type IconComp = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>

type FeatureStatProps = {
  label: string
  value: string | number
  progress: number            // 0..100
  size?: number               // px
  strokeWidth?: number        // px
  ringColor?: string          // Bulma name or CSS color
  textColor?: string          // Bulma name or CSS color
  Icon?: IconComp
  iconPosition?: 'badge' | 'inside' | 'above' | 'none'
  animateOnVisible?: boolean
  animationMs?: number
  className?: string
}

const BULMA_COLOR_NAMES = new Set([
  'primary', 'link', 'info', 'success', 'warning', 'danger',
  'white', 'black', 'light', 'dark',
])

const colorCache = new Map<string, string>()

function resolveBulmaNamedColor(name: string): string | null {
  if (!BULMA_COLOR_NAMES.has(name)) return null
  if (colorCache.has(name)) return colorCache.get(name)!
  if (typeof window === 'undefined' || !document?.body) return null
  const el = document.createElement('span')
  el.className = `has-text-${name}`
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  document.body.appendChild(el)
  const color = getComputedStyle(el).color
  document.body.removeChild(el)
  colorCache.set(name, color)
  return color
}

function resolveColor(input: string | undefined, fallback: string): string {
  if (!input) return fallback
  const trimmed = input.trim()
  if (BULMA_COLOR_NAMES.has(trimmed)) return resolveBulmaNamedColor(trimmed) ?? fallback
  if (/^(#|rgb|hsl|var\()/.test(trimmed)) return trimmed
  return fallback
}

function textColorClassOrStyle(textColor?: string): {
  className: string
  style: React.CSSProperties | undefined
} {
  if (textColor && BULMA_COLOR_NAMES.has(textColor)) {
    return { className: `has-text-${textColor}`, style: undefined }
  }
  const style = textColor ? { color: textColor } : undefined
  return { className: '', style }
}

export default function FeatureStat({
  label,
  value,
  progress,
  size = 140,
  strokeWidth = 10,
  ringColor = 'primary',
  textColor = 'black',
  Icon,
  iconPosition = 'above',
  animateOnVisible = true,
  animationMs = 900,
  className = '',
}: FeatureStatProps) {
  const clamped = Math.max(0, Math.min(100, progress))
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth])
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius])

  const ring = resolveColor(ringColor, '#f9a729')
  const { className: textClass, style: textStyle } = textColorClassOrStyle(textColor)

  const [visible, setVisible] = useState(!animateOnVisible)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animateOnVisible) return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [animateOnVisible])

  const dashOffset = useMemo(() => {
    const k = clamped / 100
    return circumference * (1 - k)
  }, [clamped, circumference])

  const labelFontSize = Math.max(18, size * 0.16)
  const valueFontSize = Math.max(12, size * 0.12)

  return (
    <div
      ref={rootRef}
      className={`feature-stat has-text-centered ${textClass} ${className}`}
      style={textStyle}
      aria-label={`${label} ${value}`}
    >
      <div className="is-relative" style={{ width: size, height: size, margin: '0 auto' }}>
        {/* Only the progress ring (no track/fill) */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ring}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={visible ? dashOffset : circumference}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            style={{ transition: `stroke-dashoffset ${animationMs}ms ease-out` }}
          />
        </svg>

        {/* Optional badge icon (no background plate) */}
        {Icon && iconPosition === 'badge' && (
          <div
            className="is-overlay"
            style={{
              top: '-24px',
              right: '-24px',
              bottom: 'auto',
              left: 'auto',
              width: 'auto',
              height: 'auto',
            }}
          >
            <Icon size={18} />
          </div>
        )}

        {/* Centered content: icon (above/inside), label, value */}
        <div className="is-overlay is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          {Icon && (iconPosition === 'above' || iconPosition === 'inside') && (
            <Icon size={36} style={{ marginBottom: '-0.55rem' }} />
          )}
          <div className="has-text-weight-light" style={{ fontSize: labelFontSize, lineHeight: 1.5 }}>
            {label}
          </div>
          <div style={{ fontSize: valueFontSize, lineHeight: 1.1 }}>{value}</div>
        </div>
      </div>
    </div>
  )
}
