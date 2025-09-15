// ./components/unisection/LetterGlitch2.tsx
'use client'
import React, { useRef, useEffect, useMemo, useCallback } from 'react'

type RGB = { r: number; g: number; b: number }

type Cell = {
  char: string
  color: string
  targetColor: string
  colorProgress: number
}

type Grid = { columns: number; rows: number }

type LetterGlitch2Props = {
  // Visual
  className?: string
  background?: string
  fontFamily?: string
  fontSize?: number
  cellWidth?: number
  cellHeight?: number

  // Content
  charset?: string[] | string

  // Glitch behavior
  glitchColors?: string[]
  glitchSpeed?: number
  glitchRatio?: number
  smooth?: boolean
  smoothStep?: number

  // Overlays
  centerVignette?: boolean
  outerVignette?: boolean
}

const DEFAULT_COLORS = ['#f9a729', '#000000', '#ffffff']

function hexToRgb(hex: string): RGB | null {
  const s = hex.replace(/^#/, '')
  if (s.length === 3) {
    const r = parseInt(s[0] + s[0], 16)
    const g = parseInt(s[1] + s[1], 16)
    const b = parseInt(s[2] + s[2], 16)
    return { r, g, b }
  }
  if (s.length === 6) {
    const r = parseInt(s.slice(0, 2), 16)
    const g = parseInt(s.slice(2, 4), 16)
    const b = parseInt(s.slice(4, 6), 16)
    return { r, g, b }
  }
  return null
}

function interpolateRgb(start: RGB, end: RGB, t: number): string {
  const r = Math.round(start.r + (end.r - start.r) * t)
  const g = Math.round(start.g + (end.g - start.g) * t)
  const b = Math.round(start.b + (end.b - start.b) * t)
  return `rgb(${r}, ${g}, ${b})`
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const LetterGlitch2: React.FC<LetterGlitch2Props> = ({
  // Visual
  className = '',
  background = '#000000',
  fontFamily = 'monospace',
  fontSize = 16,
  cellWidth,
  cellHeight,

  // Content
  charset = '$RESULTITY',

  // Glitch behavior
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 50,
  glitchRatio = 0.05,
  smooth = true,
  smoothStep = 0.05,

  // Overlays
  centerVignette = false,
  outerVignette = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const gridRef = useRef<Grid>({ columns: 0, rows: 0 })
  const cellsRef = useRef<Cell[]>([])
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(Date.now())

  // Stable, memoized inputs to avoid complex deps
  const charsetArr = useMemo(
    () => (Array.isArray(charset) ? charset : String(charset).split('').filter(Boolean)),
    [charset]
  )
  const glitchColorsMemo = useMemo(
    () => (glitchColors && glitchColors.length ? glitchColors : DEFAULT_COLORS),
    [glitchColors]
  )
  const resolvedCellWidth = useMemo(
    () => (cellWidth ?? Math.ceil(fontSize * 0.625)),
    [cellWidth, fontSize]
  )
  const resolvedCellHeight = useMemo(
    () => (cellHeight ?? Math.ceil(fontSize * 1.25)),
    [cellHeight, fontSize]
  )

  const getRandomChar = useCallback(
    () => pick(charsetArr.length ? charsetArr : ['$']),
    [charsetArr]
  )
  const getRandomColor = useCallback(
    () => pick(glitchColorsMemo),
    [glitchColorsMemo]
  )

  const calcGrid = useCallback(
    (w: number, h: number): Grid => {
      const columns = Math.max(1, Math.ceil(w / resolvedCellWidth))
      const rows = Math.max(1, Math.ceil(h / resolvedCellHeight))
      return { columns, rows }
    },
    [resolvedCellWidth, resolvedCellHeight]
  )

  const initCells = useCallback(
    (columns: number, rows: number) => {
      gridRef.current = { columns, rows }
      const total = columns * rows
      cellsRef.current = Array.from({ length: total }, () => {
        const c = getRandomColor()
        return {
          char: getRandomChar(),
          color: c,
          targetColor: c,
          colorProgress: 1,
        }
      })
    },
    [getRandomChar, getRandomColor]
  )

  const draw = useCallback(() => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    const { width: cssW, height: cssH } = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, cssW, cssH)
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.textBaseline = 'top'

    const { columns } = gridRef.current
    const cw = resolvedCellWidth
    const ch = resolvedCellHeight

    for (let i = 0; i < cellsRef.current.length; i++) {
      const cell = cellsRef.current[i]
      const x = (i % columns) * cw
      const y = Math.floor(i / columns) * ch
      ctx.fillStyle = cell.color
      ctx.fillText(cell.char, x, y)
    }
  }, [fontFamily, fontSize, resolvedCellWidth, resolvedCellHeight])

  const glitchStep = useCallback(() => {
    const total = cellsRef.current.length
    if (!total) return

    const updates = Math.max(1, Math.floor(total * Math.min(Math.max(glitchRatio, 0), 1)))

    for (let i = 0; i < updates; i++) {
      const idx = Math.floor(Math.random() * total)
      const cell = cellsRef.current[idx]
      if (!cell) continue

      cell.char = getRandomChar()
      const next = getRandomColor()

      if (!smooth) {
        cell.color = next
        cell.targetColor = next
        cell.colorProgress = 1
      } else {
        cell.targetColor = next
        cell.colorProgress = 0
      }
    }
  }, [glitchRatio, getRandomChar, getRandomColor, smooth])

  const smoothColors = useCallback(() => {
    let any = false
    for (let i = 0; i < cellsRef.current.length; i++) {
      const cell = cellsRef.current[i]
      if (cell.colorProgress < 1) {
        const start = hexToRgb(cell.color) || { r: 0, g: 0, b: 0 }
        const end = hexToRgb(cell.targetColor) || { r: 0, g: 0, b: 0 }
        const t = Math.min(1, cell.colorProgress + smoothStep)
        cell.color = interpolateRgb(start, end, t)
        cell.colorProgress = t
        any = true
      }
    }
    return any
  }, [smoothStep])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const rect = container.getBoundingClientRect()

    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctxRef.current = ctx

    const grid = calcGrid(rect.width, rect.height)
    initCells(grid.columns, grid.rows)
    draw()
  }, [calcGrid, initCells, draw])

  const tick = useCallback(() => {
    const now = Date.now()
    if (now - lastTickRef.current >= glitchSpeed) {
      glitchStep()
      draw()
      lastTickRef.current = now
    }

    if (smooth) {
      const needRedraw = smoothColors()
      if (needRedraw) draw()
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [draw, glitchStep, smooth, smoothColors, glitchSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resize()
    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      resize()
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', onResize)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [resize, tick])

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    background,
    overflow: 'hidden',
  }

  const canvasStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
  }

  const outerVignetteStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
  }

  const centerVignetteStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle} />}
      {centerVignette && <div style={centerVignetteStyle} />}
    </div>
  )
}

export default LetterGlitch2
