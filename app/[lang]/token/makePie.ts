// app/[lang]/token/makePie.ts
// TS-safe version without relying on d3-shape type defs.
// - No implicit any on params or callbacks
// - Works on server (Buffer) and browser (btoa)

import { arc, pie } from 'd3-shape'

type PieItem = { value: number; [k: string]: unknown }

// Node/browser-safe base64
const toBase64 = (s: string): string =>
  typeof window !== 'undefined' && typeof window.btoa === 'function'
    ? window.btoa(s)
    : Buffer.from(s, 'utf8').toString('base64')

export default function makePie(
  data: PieItem[],
  innerRadius: number,
  outerRadius: number,
  cornerRadius: number,
  padAngle: number
) {
  // Annotate callback param to avoid implicit any (d: PieItem)
  const arcs = pie().value((d: PieItem) => d.value)(data)

  // d3-shape is untyped (shimmed), so arc() is any; accept unknown at call sites
  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(cornerRadius)
    .padAngle(padAngle)

  const paths = (arcs as unknown[]).map((arcData: unknown) => {
    const d = (arcGenerator as (x: unknown) => string | null)(arcData) ?? ''
    return `<path d="${d}" />`
  }).join('')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.01)">${paths}</g>
    </svg>
  `.trim()

  const pieSvgDataUri = `data:image/svg+xml;base64,${toBase64(svg)}`
  return { pieSvgDataUri, arcs, arcGenerator }
}
