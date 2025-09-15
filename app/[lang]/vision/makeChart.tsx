'use client'

import React, { useMemo, useEffect, useRef, useState, useLayoutEffect } from 'react'
import rough from 'roughjs/bin/rough'
import { RoughSVG } from 'roughjs/bin/svg'

type Point = { date: string | number | Date; value: number }

type Props = {
  width?: number | string
  height?: number
  padding?: { top: number; right: number; bottom: number; left: number }
  known: Point[]
  forecast: Point[]
  yLabel?: string
  title?: string
  theme?: {
    bg?: string
    axis?: string
    knownStroke?: string
    knownFill?: string
    forecastStroke?: string
    forecastFill?: string
  }
  /** Round Y ticks to multiples of this number in the chosen unit (default 50) */
  yTickRoundTo?: number
  /** Number of Y ticks including top (default 4 -> 0%, 25%, 50%, 75%, 100%) */
  yTicksCount?: number
  /** Unit for rounding: 'raw' (no unit), 'K' (1e3), 'M' (1e6), 'B' (1e9). Default 'B' for nicer billions. */
  yTickUnit?: 'raw' | 'K' | 'M' | 'B'
}

type ResolvedTheme = Required<NonNullable<Props['theme']>>

export default function InferenceMarketSketch({
  width = '100%',
  height = 420,
  padding = { top: 32, right: 40, bottom: 72, left: 72 },
  known,
  forecast,
  yLabel = '$',
  title = 'Inference Market (USD)',
  theme,
  yTickRoundTo = 50,
  yTicksCount = 4,
  yTickUnit = 'B',
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const roughRef = useRef<RoughSVG | null>(null)
  const [measuredW, setMeasuredW] = useState<number>(typeof width === 'number' ? width : 800)

  // Resolve theme into guaranteed strings
  const resolvedTheme: ResolvedTheme = useMemo(
    () => ({
      bg: 'transparent',
      axis: '#222',
      knownStroke: '#2c7be5',
      knownFill: '#2c7be5',
      forecastStroke: '#F59E0B',
      forecastFill: '#F59E0B',
      ...(theme ?? {}),
    }),
    [theme]
  )

  useLayoutEffect(() => {
    if (typeof width === 'number') {
      setMeasuredW(width)
      return
    }
    const el = wrapRef.current
    if (!el) return

    let frame = 0
    const threshold = 1
    const measure = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0 && Math.abs(w - measuredW) > threshold) setMeasuredW(w)
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    })
    ro.observe(el)
    measure()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [width, measuredW])

  const {
    ptsKnown,
    ptsForecast,
    xScale,
    xTicks,
    yTicks,
    x0,
    y0,
    yMax,
  } = useMemo(() => {
    const W = measuredW
    const H = height
    const toDate = (d: Point['date']) => new Date(d).getTime()
    const k = [...known].sort((a, b) => toDate(a.date) - toDate(b.date))
    const f = [...forecast].sort((a, b) => toDate(a.date) - toDate(b.date))
    const all = [...k, ...f]

    const minX = Math.min(...all.map(d => toDate(d.date)))
    const maxX = Math.max(...all.map(d => toDate(d.date)))
    const rawMaxY = Math.max(1, ...all.map(d => d.value)) * 1.1

    // Map unit symbol to multiplier
    const unitMap = { raw: 1, K: 1e3, M: 1e6, B: 1e9 } as const
    const unitVal = unitMap[yTickUnit] ?? 1

    // Round Y max to the next multiple of (yTickRoundTo * unitVal)
    const quantum = yTickRoundTo * unitVal
    const yMax = Math.ceil(rawMaxY / quantum) * quantum

    const x0 = padding.left
    const x1 = W - padding.right
    const y0 = H - padding.bottom
    const y1 = padding.top

    const xScale = (t: number) => x0 + ((t - minX) / (maxX - minX || 1)) * (x1 - x0)
    const yScale = (v: number) => y0 - (v / (yMax || 1)) * (y0 - y1)

    let ptsKnown = k.map(d => [xScale(toDate(d.date)), yScale(d.value)] as [number, number])
    let ptsForecast = f.map(d => [xScale(toDate(d.date)), yScale(d.value)] as [number, number])

    if (k.length && f.length) {
      const knownEndDate = toDate(k[k.length - 1].date)
      const forecastStartDate = toDate(f[0].date)
      if (knownEndDate !== forecastStartDate) {
        const midX = forecastStartDate
        const knownY = k[k.length - 1].value
        const forecastY = f[0].value
        const midY = (knownY + forecastY) / 2
        const interpolated = [xScale(midX), yScale(midY)] as [number, number]
        ptsKnown = [...ptsKnown, interpolated]
        ptsForecast = [interpolated, ...ptsForecast]
      }
    }

    // X ticks
    const xTicks: number[] = []
    const xTicksCount = 5
    for (let i = 0; i <= xTicksCount; i++) {
      xTicks.push(minX + (i / xTicksCount) * (maxX - minX))
    }

    // Y ticks: choose a step that is a multiple of the quantum
    const rawStep = yMax / yTicksCount
    const stepsInQuantum = Math.max(1, Math.round(rawStep / quantum))
    const step = stepsInQuantum * quantum

    const yTicks: number[] = []
    for (let v = 0; v <= yMax + 1e-9; v += step) {
      const val = v + step > yMax && yMax - v < step * 0.5 ? yMax : v
      if (!yTicks.length || Math.abs(val - yTicks[yTicks.length - 1]) >= 1e-9) {
        yTicks.push(Number(val.toFixed(10)))
      }
      if (val === yMax) break
    }

    return { ptsKnown, ptsForecast, xScale, xTicks, yTicks, x0, y0, yMax }
  }, [known, forecast, measuredW, height, padding, yTickRoundTo, yTicksCount, yTickUnit])

  useEffect(() => {
    if (!svgRef.current) return
    const W = measuredW
    const H = height
    svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svgRef.current.innerHTML = ''
    const rc = rough.svg(svgRef.current)
    roughRef.current = rc

    if (resolvedTheme.bg && resolvedTheme.bg !== 'transparent') {
      const bg = rc.rectangle(0, 0, W, H, { fill: resolvedTheme.bg, fillStyle: 'solid', stroke: 'none' })
      svgRef.current.appendChild(bg)
    }

    const axisStyle = { stroke: resolvedTheme.axis as string, strokeWidth: 1.2 }
    svgRef.current.appendChild(
      rc.line(padding.left, H - padding.bottom, W - padding.right, H - padding.bottom, axisStyle)
    )
    svgRef.current.appendChild(
      rc.line(padding.left, padding.top, padding.left, H - padding.bottom, axisStyle)
    )

    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    labelGroup.setAttribute('font-family', 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial')
    labelGroup.setAttribute('font-size', '12')
    labelGroup.setAttribute('fill', resolvedTheme.axis)

    // Horizontal grid lines and Y labels
    yTicks.forEach(v => {
      const y = y0 - (v / yMax) * (y0 - padding.top)
      const grid = rc.line(padding.left, y, W - padding.right, y, {
        stroke: resolvedTheme.axis,
        strokeWidth: 0.6,
        roughness: 0.7,
      })
      // dashed grid
      grid.setAttribute('stroke-dasharray', '4 6')
      svgRef.current!.appendChild(grid)

      const tx = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      tx.setAttribute('x', String(padding.left - 8))
      tx.setAttribute('y', String(y + 4))
      tx.setAttribute('text-anchor', 'end')
      tx.textContent = `${yLabel}${formatNumber(v)}`
      labelGroup.appendChild(tx)
    })

    // X ticks and labels
    xTicks.forEach(t => {
      const x = xScale(t)
      const tick = rc.line(x, y0, x, y0 + 6, { stroke: resolvedTheme.axis, strokeWidth: 1 })
      svgRef.current!.appendChild(tick)

      const tx = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const yText = y0 + 20
      tx.setAttribute('x', String(x))
      tx.setAttribute('y', String(yText))
      tx.setAttribute('text-anchor', 'end')
      tx.setAttribute('dx', '6')
      tx.setAttribute('transform', `rotate(-45 ${x} ${yText})`)
      tx.textContent = formatDate(t)
      labelGroup.appendChild(tx)
    })

    svgRef.current.appendChild(labelGroup)

    // Known area and curve
    if (ptsKnown.length >= 2) {
      const areaKnown = rc.polygon(
        [...ptsKnown, [ptsKnown[ptsKnown.length - 1][0], y0], [ptsKnown[0][0], y0]],
        {
          fill: resolvedTheme.knownFill,
          fillStyle: 'hachure',
          fillWeight: 1.5,
          hachureGap: 8,
          hachureAngle: -45,
          roughness: 1.2,
          stroke: 'none',
        }
      )
      svgRef.current.appendChild(areaKnown)

      const curveKnown = rc.curve(ptsKnown, {
        stroke: resolvedTheme.knownStroke,
        strokeWidth: 2,
        roughness: 1,
      })
      svgRef.current.appendChild(curveKnown)
    }

    // Forecast area and curve
    if (ptsForecast.length >= 2) {
      const areaForecast = rc.polygon(
        [...ptsForecast, [ptsForecast[ptsForecast.length - 1][0], y0], [ptsForecast[0][0], y0]],
        {
          fill: resolvedTheme.forecastFill,
          fillStyle: 'zigzag',
          fillWeight: 1.2,
          hachureGap: 10,
          hachureAngle: 45,
          roughness: 1.3,
          stroke: 'none',
        }
      )
      svgRef.current.appendChild(areaForecast)

      const curveForecast = rc.curve(ptsForecast, {
        stroke: resolvedTheme.forecastStroke,
        strokeWidth: 2,
        roughness: 1.1,
      })
      // dashed forecast line without using `any`
      curveForecast.setAttribute('stroke-dasharray', '8 6')
      svgRef.current.appendChild(curveForecast)
    }

    // Title
    const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    titleEl.setAttribute('x', String(padding.left))
    titleEl.setAttribute('y', String(padding.top - 10))
    titleEl.setAttribute('font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial')
    titleEl.setAttribute('font-size', '12')
    titleEl.setAttribute('font-weight', '600')
    titleEl.setAttribute('fill', resolvedTheme.axis)
    titleEl.textContent = title
    svgRef.current.appendChild(titleEl)
  }, [
    ptsKnown,
    ptsForecast,
    xScale,
    xTicks,
    yTicks,
    yMax,
    x0,
    y0,
    resolvedTheme,
    measuredW,
    height,
    padding,
    title,
    yLabel,
  ])

  return (
    <div
      ref={wrapRef}
      style={{ width: typeof width === 'string' ? width : undefined }}
    >
      <svg
        ref={svgRef}
        width={typeof width === 'number' ? width : undefined}
        height={height}
        role="img"
        aria-label={title}
        style={{
          display: 'block',
          width: '100%',
          height,
          background: resolvedTheme.bg || 'transparent',
        }}
      />
    </div>
  )
}

function formatDate(t: number) {
  const d = new Date(t)
  const y = d.getFullYear()
  const m = d.toLocaleString('en', { month: 'short' })
  return `${m} ${y}`
}

function formatNumber(n: number) {
  if (n >= 1e12) return (n / 1e12).toFixed(1).replace(/\.0$/, '') + 'T'
  if (n >= 1e9) return (n / 1e9).toFixed(0).replace(/\.0$/, '') + 'B' // integer billions for clean 50B steps
  if (n >= 1e6) return (n / 1e6).toFixed(0).replace(/\.0$/, '') + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(0).replace(/\.0$/, '') + 'K'
  return String(Math.round(n))
}
