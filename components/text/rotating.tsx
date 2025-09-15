// RotatingText.tsx
// A reusable component that cycles through an array of text items with flip animation.

'use client'

import { useEffect, useState } from 'react'

type RotatingTextProps = {
  /** Array of strings to rotate through */
  items: string[]
  /** Interval in milliseconds between rotations */
  interval?: number
  /** Optional CSS class for the text container */
  className?: string
}

export default function RotatingText({
  items,
  interval = 3000,
  className = ''
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, interval)
    return () => clearInterval(timer)
  }, [items.length, interval])

  return (
    <span key={index} className={`is-block animate-flip ${className}`}>
      {items[index]}
    </span>
  )
}
