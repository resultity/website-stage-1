// components/FloatGrid.tsx
'use client'

type FloatGridProps = { variant?: 'green' | 'orange'; style?: React.CSSProperties }

export default function FloatGrid({ variant = 'green', style }: FloatGridProps) {
  const palette = {
    green: { stroke: '#9fff80', s1: '#666', s2: '#555', s3: '#777', s4: '#888' },
    orange: { stroke: '#ffb86b', s1: '#664c30', s2: '#553f28', s3: '#775d3f', s4: '#886948' },
  }[variant]

  const grid30 = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><rect x='1' y='1' width='28' height='28' fill='none' stroke='${palette.stroke}' stroke-width='2'/></svg>`,
  )
  const deco80 = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
       <rect width='10' height='10' x='30' y='10' fill='${palette.s1}'/>
       <rect width='15' height='15' x='55' y='5'  fill='${palette.s2}'/>
       <rect width='12' height='12' x='10' y='50' fill='${palette.s3}'/>
       <rect width='18' height='18' x='40' y='45' fill='${palette.s4}'/>
     </svg>`,
  )

  return (
    <>
      <div
        className="float-grid"
        style={{
          ...style,
          backgroundImage: `url("data:image/svg+xml,${grid30}"), url("data:image/svg+xml,${deco80}")`,
        }}
      />
      <style jsx>{`
        .float-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-repeat: repeat, repeat;
          background-size: 30px 30px, 80px 80px;
          animation: rain-scroll 10s linear infinite,
            opacity-pulse 10s ease-in-out infinite;
          opacity: 0.1;
          will-change: background-position; /* hint GPU */
          z-index: 0;
        }
        @keyframes rain-scroll {
          0%   { background-position: 0 0,   0 0;   }
          100% { background-position: 0 30px, 0 80px; } 
        }
        @keyframes opacity-pulse {
          0%,100% { opacity: 0; }
          50%     { opacity: 0.1; }
        }
      `}</style>
    </>
  )
}
