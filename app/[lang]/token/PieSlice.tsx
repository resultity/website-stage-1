// PieSlice.tsx
// Typed props, spring-safe vector components, and tuple-typed extrude args.

'use client'

import React, { useMemo } from 'react'
import { animated, useSpring, config as springConfigs } from '@react-spring/three'
import { Text } from '@react-three/drei'
import { format } from 'd3-format'
import type { Shape, ExtrudeGeometryOptions } from 'three'

type Arc = {
  startAngle: number
  endAngle: number
  value: number
}

type ArcGenerator = {
  innerRadius(): (a: Arc) => number
  outerRadius(): (a: Arc) => number
}

type Datum = {
  value: number
  label?: string
  color?: string
  explode?: boolean
  roughness?: number
  metalness?: number
  height?: number
  offset?: number
}

interface PieSliceProps {
  i: number
  shape: Shape
  arcs: Arc[]
  datum: Datum
  arcGenerator: ArcGenerator
  extrudeSettings: ExtrudeGeometryOptions
  totalValue: number
  height: number
  onClick?: (index: number) => void
  valueLabelPosition?: number
  offset?: number
  roughness?: number
  metalness?: number
  formatter?: (n: number) => string
  showValue?: boolean
  valueAsPercent?: boolean
}

const springConfig = springConfigs.wobbly

export default function PieSlice({
  i,
  shape,
  arcs,
  datum,
  arcGenerator,
  extrudeSettings,
  totalValue,
  height,
  onClick,
  valueLabelPosition = 0.5,
  offset = 0,
  roughness = 0.2,
  metalness = 0,
  formatter = format('.0%'),
  showValue = true,
  valueAsPercent = true,
}: PieSliceProps) {
  const arc = arcs[i]
  const label = datum.label
  const color = datum.color ?? '#888'

  const theta = (arc.startAngle + arc.endAngle) / 2 - Math.PI / 2
  const explosionMagnitude = datum.explode ? 0.2 : 0
  const xOffset = Math.cos(theta) * explosionMagnitude
  const zOffset = Math.sin(theta) * explosionMagnitude

  const finalOffset = datum.offset ?? offset
  const finalRoughness = datum.roughness ?? roughness
  const finalMetalness = datum.metalness ?? metalness

  const innerRadius = arcGenerator.innerRadius()(arc)
  const outerRadius = arcGenerator.outerRadius()(arc)
  const labelRadius = (valueLabelPosition * (outerRadius - innerRadius) + innerRadius) * 0.01

  const xText = Math.cos(theta) * labelRadius
  const zText = Math.sin(theta) * labelRadius
  const yTextOffset = 0.125
  const percent = totalValue > 0 ? arc.value / totalValue : 0

  const { px, py, pz } = useSpring({
    px: xOffset,
    py: height + finalOffset,
    pz: zOffset,
    config: springConfig,
  })

  const extrudeGeometryArgs = useMemo<[Shape, ExtrudeGeometryOptions]>(
    () => [shape, extrudeSettings],
    [shape, extrudeSettings]
  )

  return (
    <animated.group position-x={px} position-y={py} position-z={pz}>
      <animated.mesh
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 1, height]}
        onClick={(evt) => {
          onClick?.(i)
          evt.stopPropagation()
        }}
        receiveShadow
      >
        <extrudeGeometry args={extrudeGeometryArgs} />
        <meshStandardMaterial color={color} roughness={finalRoughness} metalness={finalMetalness} />
      </animated.mesh>

      {showValue && (
        <Text position={[xText, yTextOffset, zText]} fontSize={0.2} anchorX="center" anchorY="middle" color="white">
          {valueAsPercent ? formatter(percent) : String(arc.value)}
        </Text>
      )}
      {label && (
        <Text
          position={[xText, yTextOffset + (showValue ? 0.15 : 0), zText]}
          fontSize={showValue ? 0.1 : 0.125}
          anchorX="center"
          anchorY="middle"
          color={color}
        >
          {label}
        </Text>
      )}
    </animated.group>
  )
}
