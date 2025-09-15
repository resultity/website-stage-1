// app/[lang]/roadmap/HeroComponents/TilesBottom.tsx
'use client';

import React from 'react';

// Matches the "Car" pattern: phase-based class + CSS vars.
// When phase === 'out', both tiles grid and lane lines scroll faster.

type Phase = 'idle' | 'out' | 'in';

type RoadPalette = {
  tile?: string;
  tileBorder?: string;
  line?: string;
  // allow extra theme keys without using `any`
  [key: string]: unknown;
};

type TilesBottomProps = {
  palette: RoadPalette;
  nextPalette: () => void;
  lineDashLength?: number;
  lineDashGap?: number;
  lineWidth?: number;
  lineOffset?: number;
  lineShift?: number;
  overlayColor?: string;
  phase?: Phase;
  baseMs?: number; // normal scroll duration
  accel?: number;  // speed multiplier when phase === 'out'
};

type ScrollVars = Record<'--scroll-ms' | '--scroll-ms-out', string>;

export default function TilesBottom({
  palette,
  nextPalette,
  lineDashLength = 100,
  lineDashGap = 100,
  lineWidth = 10,
  lineOffset = 0,
  lineShift = 5,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  phase = 'idle',
  baseMs = 8000,
  accel = 2.5,
}: TilesBottomProps) {
  const {
    tile: tileBg = 'rgba(0, 0, 0, 0.03)',
    tileBorder = 'rgba(255, 255, 255, 0.03)',
    line: lineColor = 'rgba(250, 250, 180, 0.5)',
  } = palette;

  const dashTotal = lineDashLength + lineDashGap;
  const dashColor = lineColor;

  // Precompute durations (ms). Clamp to a sane minimum.
  const fastMs = Math.max(200, Math.round(baseMs / Math.max(0.1, accel)));

  // Typed CSS variables, no `any` casts
  const styleVars: React.CSSProperties & ScrollVars = {
    '--scroll-ms': `${baseMs}ms`,
    '--scroll-ms-out': `${fastMs}ms`,
  };

  return (
    <div
      className={`tiles-wrapper ${phase === 'out' ? 'phase-out' : ''} ${phase === 'in' ? 'phase-in' : ''}`}
      onClick={nextPalette}
      style={styleVars}
    >
      <div className="tiles animated-tiles">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="tile" />
        ))}
      </div>

      <div className="line-overlay animated-lines">
        <div className="left-line" />
        <div className="right-line" />
      </div>

      <div className="gradient-overlay" />

      <style jsx>{`
        .tiles-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .tiles {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 1fr;
          width: 100%;
          height: 200%;
          transform: perspective(800px) rotateX(60deg);
          transform-origin: top;
          will-change: transform;
        }

        .animated-tiles {
          animation-name: scrollDown;
          animation-duration: var(--scroll-ms, 18000ms);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Speed-up on phase OUT (same pattern as Car: class toggle + CSS var override) */
        .phase-out .animated-tiles {
          animation-duration: var(--scroll-ms-out, 50ms);
        }

        .tile {
          background: ${tileBg};
          border: 1px solid ${tileBorder};
        }

        .line-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1400%;
          transform: perspective(800px) rotateX(60deg);
          transform-origin: top;
          z-index: 2;
          display: flex;
          justify-content: center;
          pointer-events: none;
          will-change: transform;
        }

        .animated-lines {
          animation-name: scrollDown;
          animation-duration: var(--scroll-ms, 18000ms);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .phase-out .animated-lines {
          animation-duration: var(--scroll-ms-out, 50ms);
        }

        .left-line,
        .right-line {
          width: ${lineWidth}px;
          height: 400%;
          background-image: repeating-linear-gradient(
            to bottom,
            ${dashColor},
            ${dashColor} ${lineDashLength}px,
            transparent ${lineDashLength}px,
            transparent ${dashTotal}px
          );
          opacity: 0.9;
        }

        .left-line {
          margin-right: ${lineOffset}px;
          transform: translateX(-${lineShift}px);
        }

        .right-line {
          margin-left: ${lineOffset}px;
          transform: translateX(${lineShift}px);
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            ${overlayColor},
            transparent 70%
          );
          z-index: 3;
          pointer-events: none;
        }

        @keyframes scrollDown {
          0%   { transform: perspective(800px) rotateX(60deg) translateY(-50%); }
          100% { transform: perspective(800px) rotateX(60deg) translateY(0%); }
        }
      `}</style>
    </div>
  );
}
