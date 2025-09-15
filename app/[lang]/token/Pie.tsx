// Pie.tsx
// Strong typing and clean hook usage (no conditional calls).

'use client'

import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { sum } from 'd3-array'
import type { Shape, ExtrudeGeometryOptions } from 'three'
import makePie from './makePie'
import PieSlice from './PieSlice'

type PieDatum = {
  value: number
  label?: string
  color?: string
  explode?: boolean
  roughness?: number
  metalness?: number
  height?: number
  offset?: number
}

type Arc = {
  startAngle: number
  endAngle: number
  value: number
}

type ArcGenerator = {
  innerRadius(): (a: Arc) => number
  outerRadius(): (a: Arc) => number
}

type PieBuild = {
  pieSvgDataUri: string
  arcs: Arc[]
  arcGenerator: ArcGenerator
}

type SVGResult = {
  paths: { toShapes(isCCW?: boolean, noHoles?: boolean): Shape[] }[]
}

const DEFAULT_EXTRUDE_SETTINGS: ExtrudeGeometryOptions = {
  curveSegments: 256,
  steps: 2,
  depth: 1,
  bevelEnabled: true,
  bevelThickness: 0.01,
  bevelSize: 0.01,
  bevelOffset: 0.0,
  bevelSegments: 1,
}

interface PieProps {
  data: PieDatum[]
  innerRadius?: number
  outerRadius?: number
  cornerRadius?: number
  padAngle?: number
  roughness?: number
  metalness?: number
  onClickSlice?: (index: number) => void
  valueLabelPosition?: number
  showValues?: boolean
  valuesAsPercent?: boolean
}

export default function Pie({
  data: inputData,
  innerRadius = 2,
  outerRadius = 100,
  cornerRadius = 0,
  padAngle = 0.05,
  roughness,
  metalness,
  onClickSlice,
  valueLabelPosition,
  showValues,
  valuesAsPercent,
}: PieProps) {
  const { data, arcs, shapes, arcGenerator } = useStablePie(
    inputData,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle
  )

  const totalValue = useMemo(() => sum(arcs, d => d.value), [arcs])

  return (
    <group>
      {shapes.map((shape, i) => (
        <PieSlice
          key={i}
          i={i}
          shape={shape}
          arcs={arcs}
          datum={data[i]}
          arcGenerator={arcGenerator}
          extrudeSettings={DEFAULT_EXTRUDE_SETTINGS}
          totalValue={totalValue}
          height={data[i].height ?? 0.6}
          onClick={onClickSlice}
          roughness={roughness}
          metalness={metalness}
          valueLabelPosition={valueLabelPosition}
          showValue={showValues}
          valueAsPercent={valuesAsPercent}
        />
      ))}
    </group>
  )
}

/**
 * Always calls hooks in a stable order. Loading is handled by Suspense (via useLoader).
 */
function useStablePie(
  data: PieDatum[],
  innerRadius: number,
  outerRadius: number,
  cornerRadius: number,
  padAngle: number
) {
  const { pieSvgDataUri, arcs, arcGenerator } = makePie(
    data,
    innerRadius,
    outerRadius,
    cornerRadius,
    padAngle
  ) as PieBuild

  // useLoader will suspend if the resource is not ready; that's fine under <Suspense>.
  const loadedSvg = useLoader(
    SVGLoader as unknown as { new (): SVGLoader },
    pieSvgDataUri
  ) as unknown as SVGResult

  const shapes = useMemo<Shape[]>(
    () => loadedSvg.paths.flatMap((p) => p.toShapes()),
    [loadedSvg]
  )

  return { data, arcs, arcGenerator, shapes }
}
