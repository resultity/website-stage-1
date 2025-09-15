'use client';

import { CircleParking, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type RCPStreamerProps = {
  fontSize?: number | string;         // e.g. 24 or "2.5rem"
  color?: string;                     // brand default: #F9A729
  fontFamily?: string;                // ensure the font is loaded globally if you pass a custom one
  durationSec?: number;               // time to travel bottom->top
  spawnEveryMs?: number;              // emission interval
  maxAlive?: number;                  // cap concurrent items
  horizontalMarginPct?: number;       // keep inside left/right edges in %
  zIndex?: number;                    // optional stacking control
};

type Item = { id: number; leftPct: number };

let _id = 0;

export default function RCPStreamer({
  fontSize = "1.75rem",
  color = "#000000",
  fontFamily = `"PT Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, "Liberation Mono", Consolas, "Courier New", monospace`,
  durationSec = 8,
  spawnEveryMs = 80,
  maxAlive = 8,
  horizontalMarginPct = 6,
  zIndex = 1,
}: RCPStreamerProps) {
  const [items, setItems] = useState<Item[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const spawn = () => {
      setItems(prev => {
        if (prev.length >= maxAlive) return prev;
        const clamp = Math.max(0, Math.min(50 - horizontalMarginPct, horizontalMarginPct));
        const left = clamp + Math.random() * (300 - 2 * clamp);
        return [...prev, { id: ++_id, leftPct: left }];
      });
    };
    spawn();
    timerRef.current = window.setInterval(spawn, spawnEveryMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [spawnEveryMs, maxAlive, horizontalMarginPct]);

  const handleEnd = (id: number) => setItems(prev => prev.filter(x => x.id !== id));

  return (
    <div
      className="rcp-streamer"
      style={
        {
          // use CSS vars + inline to win against external styles
          "--rcp-color": color,
          "--rcp-font": fontFamily,
          "--rcp-z": zIndex,
        } as React.CSSProperties
      }
    >
      {items.map(({ id, leftPct }) => (
        <span
          key={id}
          className="rcp-item"
          style={{
            left: `${leftPct}%`,
            animationDuration: `${durationSec}s`,
            fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
            color,                 // inline color
            fontFamily,            // inline font
          }}
          onAnimationEnd={() => handleEnd(id)}
          aria-hidden="true"
        >
          {/* no <strong>; force bold mono via CSS to avoid inheritance issues */}
          <span className="rcp-text"><Plus /><CircleParking size={32} /></span>
        </span>
      ))}

      <style jsx>{`
        .rcp-streamer {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: var(--rcp-z);
        }

        .rcp-item {
          position: absolute;
          top: 100%;
          transform: translateX(-50%);
          line-height: 1;
          white-space: nowrap;
          user-select: none;
          will-change: top, opacity;
          animation-name: rcp-rise;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          color: var(--rcp-color) !important;         /* enforce brand color */
          font-family: var(--rcp-font) !important;     /* enforce mono font */
        }

        .rcp-text {
          font-weight: 900;
          letter-spacing: 0.02em;
          color: inherit;
          font-family: inherit;
        }

        @keyframes rcp-rise {
          0%   { top: 100%; opacity: 0.25; }
          40%  { top: 60%;  opacity: 0.1; }  /* fade to 0 by 40% height */
          100% { top: -10%; opacity: 0; }  /* continue above the top edge */
        }
      `}</style>
    </div>
  );
}
