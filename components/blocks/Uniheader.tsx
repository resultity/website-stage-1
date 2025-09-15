// components/blocks/UniHeader.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

type UniHeaderProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  header: string
  subheader?: string
  colorText?: 'primary' | 'black' | 'white'
  colorLine?: 'primary' | 'black' | 'white'
  className?: string
  align?: 'left' | 'center' | 'right'  
}

export default function UniHeader({
  as: Tag = 'h2',
  header,
  subheader,
  colorText = 'black',
  colorLine = 'primary',
  className = 'mb-6',
  align = 'left'
}: UniHeaderProps) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    requestAnimationFrame(() => {
      line.style.width = '10vw'
    })
  }, [])

  return (
    <div
      className={clsx(
        'uniheader-wrapper',
        className,
        align === 'center' && 'has-text-centered',
        align === 'right' && 'has-text-right'
      )}
    >
      <Tag
        className={clsx(
          'uniheader-title',
          'has-text-weight-extrabold',
          colorText === 'primary' && 'has-text-primary',
          colorText === 'white' && 'has-text-white',
          colorText === 'black' && 'has-text-black'
        )}
        style={{
          opacity: 0,
          transform: 'translateY(-20px)',
          animation: 'slideIn 0.6s forwards'
        }}
      >
        {header}
      </Tag>

      <div
        ref={lineRef}
        className={clsx(
          'uniheader-line',
          colorLine === 'primary' && 'has-background-primary',
          colorLine === 'white' && 'has-background-white',
          colorLine === 'black' && 'has-background-black'
        )}
        style={{
          width: 0,
          height: '4px',
          marginBottom: '0.5rem',
          transition: 'width 0.8s ease-in-out 0.4s',
          marginLeft: align === 'center' ? 'auto' : align === 'right' ? 'auto' : undefined,
          marginRight: align === 'center' ? 'auto' : align === 'right' ? 0 : undefined
        }}
      />

      {subheader && (
        <p
          className={clsx(
            'uniheader-subtitle',
            colorText === 'primary' && 'has-text-primary',
            colorText === 'white' && 'has-text-white',
            colorText === 'black' && 'has-text-black'
          )}
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            animation: 'slideIn 0.6s forwards 0.2s'
          }}
        >
          {subheader}
        </p>
      )}

      <style jsx>{`
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile: smaller font size for h1–h3 */
        @media (max-width: 768px) {
          .uniheader-title:is(h1, h2, h3) {
            font-size: 125% !important;
          }
        }

        /* Tablet: larger font size for h1–h3 */
        @media (min-width: 769px) and (max-width: 1024px) {
          .uniheader-title:is(h1, h2, h3) {
            font-size: 200% !important;
          }
        }
      `}</style>
    </div>
  )
}
