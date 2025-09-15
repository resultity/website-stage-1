// components/AnimatedButton.tsx
// A Bulma-compatible fancy button with brand colors, gradient, geometric accents and continuous animation.

'use client'

import React from 'react'
import clsx from 'clsx'

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button label */
  children: React.ReactNode
  /** Additional Bulma button modifiers, e.g. 'is-large' */
  modifiers?: string
}

export default function AnimatedButton({
  children,
  modifiers = '',
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      {...props}
      className={clsx('button animated-button', modifiers, className)}
    >
      {children}
      <style jsx>{`
        .animated-button {
          position: relative;
          overflow: hidden;
          z-index: 1;
          padding: 0.75em 1.5em;
          font-weight: 600;
          color: #000;
          background: linear-gradient(45deg, #f9a729, #ffec99, #f9a729);
          background-size: 200% 200%;
          border: none;
          border-radius: 0.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .animated-button::before,
        .animated-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Continuous gradient animation */
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-button {
          animation: bgShift 4s ease infinite;
        }

        /* Broken border effect */
        .animated-button::before {
          border: 2px solid #f9a729;
          clip-path: polygon(
            0% 0%, 90% 0%, 100% 10%,
            100% 90%, 10% 100%, 0% 90%
          );
          transition: opacity 0.3s ease;
          opacity: 0.6;
        }

        .animated-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .animated-button:hover::before {
          opacity: 1;
        }

        /* Geometric accent lines */
        .animated-button::after {
          background-image:
            linear-gradient(135deg, rgba(0,0,0,0.1) 25%, transparent 25%),
            linear-gradient(225deg, rgba(0,0,0,0.1) 25%, transparent 25%);
          background-size: 10px 10px;
          mix-blend-mode: overlay;
        }
      `}</style>
    </button>
  )
}
