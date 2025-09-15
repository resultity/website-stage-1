// components/blocks/FeatureBoxes.tsx
'use client'

import clsx from 'clsx'
import React from 'react'

export type FeatureItem = {
  title: string
  text: string
}

type FeatureBoxesProps = {
  items: FeatureItem[]
  layout?: 'grid' | 'masonry' // grid uses Bulma columns; masonry uses CSS columns
  variant?: 'dark' | 'light'  // color scheme for cards
  columnsDesktop?: 2 | 3 | 4  // used for grid layout
  hoverLift?: boolean         // card hover animation
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  dense?: boolean             // tighter padding inside cards
  className?: string
}

/**
 * FeatureBoxes renders a list of feature cards with configurable layout and styling.
 * - layout="grid": Bulma columns with 2/3/4 columns on desktop
 * - layout="masonry": CSS multi-column masonry with automatic wrapping
 */
export default function FeatureBoxes({
  items,
  layout = 'grid',
  variant = 'dark',
  columnsDesktop = 2,
  hoverLift = true,
  rounded = 'md',
  dense = false,
  className,
}: FeatureBoxesProps) {
  const radius = rounded === 'lg' ? 14 : rounded === 'md' ? 10 : rounded === 'sm' ? 6 : 0
  const padX = dense ? 'px-3' : 'px-4'
  const padY = dense ? 'py-4' : 'py-5'

  const cardClass =
    variant === 'dark'
      ? clsx('box has-background-dark', padX, padY)
      : clsx('box has-background-white', padX, padY)

  const titleClass =
    variant === 'dark' ? 'title is-6 has-text-primary mb-2' : 'title is-6 has-text-black mb-2'

  const textClass =
    variant === 'dark' ? 'is-size-7 has-text-grey-light' : 'is-size-7 has-text-grey'

  if (layout === 'masonry') {
    // Masonry layout using CSS columns; cards avoid breaking inside
    return (
      <div className={clsx('feature-masonry', className, hoverLift && 'with-hover')}>
        {items.map((it, idx) => (
          <div key={idx} className="masonry-item">
            <div className={cardClass} style={{ borderRadius: `${radius}px` }}>
              <h3 className={titleClass}>{it.title}</h3>
              <p className={textClass}>{it.text}</p>
            </div>
          </div>
        ))}

        <style jsx>{`
          .feature-masonry {
            column-gap: 1rem;
          }
          /* Desktop: 2 columns by default; increase automatically based on content width */
          @media (min-width: 1024px) {
            .feature-masonry {
              column-count: ${Math.max(2, Math.min(4, columnsDesktop))};
            }
          }
          /* Tablet */
          @media (min-width: 769px) and (max-width: 1023px) {
            .feature-masonry {
              column-count: 2;
            }
          }
          /* Mobile */
          @media (max-width: 768px) {
            .feature-masonry {
              column-count: 1;
            }
          }
          .masonry-item {
            break-inside: avoid;
            margin-bottom: 1rem;
          }
          .with-hover :global(.box) {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .with-hover :global(.box:hover) {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>
    )
  }

  // Grid layout using Bulma columns
  const colDesktop =
    columnsDesktop === 4 ? 'is-3' : columnsDesktop === 3 ? 'is-4' : /* 2 */ 'is-6'

  return (
    <div className={clsx('columns is-multiline is-variable is-4', className)}>
      {items.map((it, idx) => (
        <div key={idx} className={clsx('column', colDesktop, 'is-12-mobile', 'is-6-tablet')}>
          <div
            className={clsx(cardClass, hoverLift && 'with-hover-card')}
            style={{ borderRadius: `${radius}px` }}
          >
            <h3 className={titleClass}>{it.title}</h3>
            <p className={textClass}>{it.text}</p>
          </div>
        </div>
      ))}

      <style jsx>{`
        .with-hover-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .with-hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
