// components/blocks/IconMasonry.tsx
'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

export type Slide = {
  header: string
  text: string
  icon: React.ReactNode
  background: string
  colorText?: 'primary' | 'black' | 'white'
  colorLine?: 'primary' | 'black' | 'white'
  display?: 'exclude-non-touch' | 'exclude-touch'
}

type MasonryProps = {
  slides: Slide[]
  columnsDesktop?: number
  columnsTablet?: number
}

/** Parse *bold* spans and \n line breaks into React nodes. */
function renderRichText(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  lines.forEach((line, lineIdx) => {
    const parts = line.split(/(\*[^*]+\*)/)
    parts.forEach((part, idx) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const clean = part.slice(1, -1)
        nodes.push(
          <span key={`b-${lineIdx}-${idx}`} className="has-text-weight-bold">
            {clean}
          </span>,
        )
      } else {
        nodes.push(<span key={`t-${lineIdx}-${idx}`}>{part}</span>)
      }
    })
    if (lineIdx !== lines.length - 1) nodes.push(<br key={`br-${lineIdx}`} />)
  })
  return nodes
}

/** Robust touch detection with SSR-safe initial state */
export function useIsTouch(breakpoint: number = 768): boolean | null {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const compute = () => window.innerWidth <= breakpoint;
    const update = () => setIsTouch(compute());

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isTouch;
}

export default function IconMasonry({
  slides,
  columnsDesktop = 4,
  columnsTablet = 2,
}: MasonryProps) {
  const isTouch = useIsTouch()

  const txt = (c?: string) =>
    ({ primary: 'has-text-primary', white: 'has-text-white', black: 'has-text-black' }[
      c || 'black'
    ])

  const line = (c?: string) =>
    ({ primary: '#f9a729', white: '#ffffff', black: '#000000' }[c || 'primary'])

  // SSR-safe: until we know isTouch, render all slides (prevents “missing” cards on first paint)
  const visibleSlides = slides.filter((s) => {
    if (isTouch === null) return true
    if (s.display === 'exclude-non-touch' && !isTouch) return false
    if (s.display === 'exclude-touch' && isTouch) return false
    return true
  })

  return (
    <div className="masonry">
      {visibleSlides.map((s, i) => (
        <article key={i} className="card" style={{ background: s.background }}>
          <h3 className={clsx('title is-4', txt(s.colorText))}>{s.header}</h3>
          <div className="decor" style={{ background: line(s.colorLine) }} />
          <p className={clsx('is-size-6', txt(s.colorText))}>{renderRichText(s.text)}</p>
          <div className="icon">{s.icon}</div>
        </article>
      ))}

      <style jsx>{`
        .masonry {
          column-count: ${columnsDesktop};
          column-gap: 2rem;
        }
        .card {
          display: inline-block;
          width: 100%;
          margin: 0 0 2rem;
          padding: 2rem;
          border-radius: 1rem;
          position: relative;
          break-inside: avoid;
          min-height: 16rem;
          overflow: hidden;
          transform: perspective(750px) translateZ(-2px) rotateX(5deg) scale(0.99);
          border: 5px solid #e6e6e6;
          box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
          transition: transform 0.4s ease-in-out;
        }
        .card:hover { transform: translateZ(-50px); }
        .decor {
          width: 6rem;
          height: 0.125rem;
          margin: 0.5rem 0 1rem;
        }
        .icon {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          width: 8rem;
          height: 8rem;
          opacity: 0.4;
          pointer-events: none;
          transform-origin: bottom right;
          transition: transform 0.35s ease;
        }
        .icon :global(svg) { width: 100%; height: 100%; }
        .card:hover .icon { transform: scale(0.33); }

        @media (max-width: 1279px) {
          .masonry { column-count: ${columnsTablet}; }
        }
        @media (max-width: 768px) {
          .masonry { column-count: 1; }
          .card { padding: 1rem; border-radius: 0.75rem; min-height: 14rem; }
          .decor { width: 8rem; }
          .icon { right: 0.5rem; bottom: 0.5rem; width: 5rem; height: 5rem; opacity: 0.3; }
          .card:hover .icon { transform: scale(0.2); }
        }
      `}</style>
    </div>
  )
}
