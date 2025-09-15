// components/blocks/ThreeDFrame.tsx

'use client'

import React, { PropsWithChildren } from 'react'

type ThreeDVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Props = {
  variant?: ThreeDVariant
  className?: string
  style?: React.CSSProperties
  bgMode?: boolean 
}

export default function ThreeDFrame({
  variant = 5,
  className,
  style,
  bgMode = false,
  children,
}: PropsWithChildren<Props>) {
  const cls = ['t3d', `t3d-${variant}`, bgMode && 't3d--bg', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} style={style}>
      <div className="t3d-inner">{children}</div>

      <style jsx>{`
        .t3d {
          position: relative;
          display: block;
          will-change: transform, box-shadow;
          border-radius: 0; /* each preset sets its own radius */
        }
        /* bgMode: make the wrapper a containing block with size */
.t3d--bg {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* default for desktop */
  overflow: hidden;
}

@media (max-width: 768px) {
  .t3d--bg {
    aspect-ratio: auto;
    height: 100%; 
  }
}
        /* ensure child layer fills the box in bgMode */
        .t3d--bg .t3d-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          overflow: hidden;
        }
        /* default inner (when not bgMode) */
        .t3d:not(.t3d--bg) .t3d-inner {
          position: relative;
          z-index: 1;
          border-radius: inherit;
          overflow: hidden;
        }

        /* Presets (same as before) */

        .t3d-1 {
          transform: perspective(75em) rotateX(18deg);
          box-shadow: rgba(22, 31, 39, 0.42) 0px 60px 123px -25px,
            rgba(19, 26, 32, 0.08) 0px 35px 75px -35px;
          border-radius: 10px;
          border: 1px solid;
          border-color: rgb(213, 220, 226) rgb(213, 220, 226) rgb(184, 194, 204);
        }

        .t3d-2 {
          transform: perspective(1500px) rotateY(15deg);
          border-radius: 1rem;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
          transition: transform 1s ease 0s;
        }
        .t3d-2:hover {
          transform: perspective(3000px) rotateY(5deg);
        }

        .t3d-3 {
          transform: rotate3d(0.5, -0.866, 0, 15deg) rotate(1deg);
          box-shadow: 2em 4em 6em -2em rgba(0, 0, 0, 0.5),
            1em 2em 3.5em -2.5em rgba(0, 0, 0, 0.5);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border-radius: 0.5em;
        }
        .t3d-3:hover {
          transform: rotate3d(0, 0, 0, 0deg) rotate(0deg);
        }

        .t3d-4 {
          transform: perspective(800px) rotateY(-8deg);
          transition: transform 1s ease 0s;
          border-radius: 4px;
          box-shadow: rgba(0, 0, 0, 0.024) 0px 0px 0px 1px,
            rgba(0, 0, 0, 0.05) 0px 1px 0px 0px,
            rgba(0, 0, 0, 0.03) 0px 0px 8px 0px,
            rgba(0, 0, 0, 0.1) 0px 20px 30px 0px;
        }
        .t3d-4:hover {
          transform: perspective(800px) rotateY(-4deg);
        }

        .t3d-5 {
          transform: perspective(1000px) rotateX(4deg) rotateY(-16deg) rotateZ(4deg);
          box-shadow: 24px 16px 64px 0 rgba(0, 0, 0, 0.08);
          border-radius: 2px;
        }

        .t3d-6 {
          transform: rotateX(51deg) rotateZ(43deg);
          transform-style: preserve-3d;
          border-radius: 32px;
          box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
            28px 28px 28px 0 rgba(34, 33, 81, 0.25);
          transition: 0.4s ease-in-out transform, 0.4s ease-in-out box-shadow;
        }
        .t3d-6:hover {
          transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
          box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
            54px 54px 28px -10px rgba(34, 33, 81, 0.15);
        }

        .t3d-7 {
          transform: perspective(2000px) translate3d(0px, -66px, 198px) rotateX(-55deg)
            scale3d(0.86, 0.75, 1) translateY(50px);
          border-radius: 5px;
          will-change: transform;
          transition: 0.4s ease-in-out transform;
        }
        .t3d-7:hover {
          transform: scale3d(1, 1, 1);
        }

        .t3d-8 {
          transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg)
            scale(0.9, 0.9);
          border-radius: 20px;
          border: 5px solid #e6e6e6;
          box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
          transition: 0.4s ease-in-out transform;
        }
        .t3d-8:hover {
          transform: translate3d(0px, 0px, -250px);
        }

        .t3d-9 {
          transform: perspective(600px) rotateX(20deg);
          border-radius: 6px;
        }

        .t3d-10 {
          transform: perspective(900px) rotateX(60deg) scale(0.7);
          box-shadow: 0px 20px 100px #555;
          transition: 0.5s ease all;
          border-radius: 8px;
        }
        .t3d-10:hover {
          transform: rotate(0deg) scale(1) translateY(10px);
        }

        .t3d-11 {
          transform: scale(0.75) rotateY(-30deg) rotateX(45deg) translateZ(4.5rem);
          transform-origin: 50% 100%;
          transform-style: preserve-3d;
          box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.25);
          transition: 0.6s ease transform;
          border-radius: 12px;
        }
        .t3d-11:hover {
          transform: scale(1) rotateY(-30deg) rotateX(45deg) translateZ(4.5rem);
        }
        .t3d-11::before,
        .t3d-11::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }
        .t3d-11::before {
          background: rgba(0, 0, 0, 0.03);
          transform: translateZ(4rem);
          transition: transform 0.6s ease;
        }
        .t3d-11:hover::before {
          transform: translateZ(0);
        }
        .t3d-11::after {
          background: rgba(0, 0, 0, 0.06);
          transform: translateZ(-4rem);
          transition: transform 0.6s ease;
        }
        .t3d-11:hover::after {
          transform: translateZ(-1px);
        }

        .t3d-12 {
          border-radius: 1em;
          perspective: 600px;
          box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.25),
            0 0.02125em 0.06125em rgba(0, 0, 0, 0.25);
        }
        .t3d-12::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 50%;
          border-radius: 0 0 1em 1em;
          transform-origin: center top;
          transform: rotateX(180deg);
          background: #333232;
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.4)
          );
          transition: 0.7s ease-in-out transform;
          pointer-events: none;
        }
        .t3d-12:hover::before {
          transform: rotateX(0);
        }
          @media (max-width: 768px) {
  .t3d {
    transform: none !important;
    box-shadow: none !important;
  }
  .t3d:hover {
    transform: none !important;
  }
}
      `}</style>
    </div>
  )
}
