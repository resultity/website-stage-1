// components/HeroComponents/Car.tsx
// Make durations configurable via CSS variables set from props.

'use client'

type CarPhase = 'idle' | 'out' | 'in'

export default function Car({
  phase = 'idle',
  outMs = 2400, // shrink/move duration
  inMs = 320,  // return/settle duration
}: {
  phase?: CarPhase
  outMs?: number
  inMs?: number
}) {
  return (
    <div
      className={`car-on-road ${phase === 'out' ? 'car-transition-out' : ''} ${phase === 'in' ? 'car-transition-in' : ''}`}
      style={
        {
          // expose durations to CSS
          ['--car-out-ms' as any]: `${outMs}ms`,
          ['--car-in-ms' as any]: `${inMs}ms`,
        }
      }
    >
      <img src="/pages/roadmap/car-a.svg" alt="Car Frame A" className="car-frame frame-a" />
      <img src="/pages/roadmap/car-b.svg" alt="Car Frame B" className="car-frame frame-b" />
      <img src="/pages/roadmap/car-c.svg" alt="Car Frame C" className="car-frame frame-c" />
      <div className="car-glow" />

      <style jsx>{`
        :root { --car-ease: cubic-bezier(0.2, 0.7, 0.0, 1); }

        .car-on-road {
          position: absolute;
          left: 55%;
          bottom: 5%;
          transform: translateX(-50%);
          z-index: 3;
          pointer-events: none;
          width: 60%;
          will-change: transform, filter;
          transition:
            transform var(--car-out-ms, 400ms) var(--car-ease),
            filter   var(--car-out-ms, 400ms) var(--car-ease);
        }

       /* Animate shrink + upward shift over 2s and keep the final pose */
.car-transition-out {
  /* final pose (for non-animating browsers) */
  transform: translateX(-50%) translateY(-8%) scale(0.24);
  filter: brightness(0.95);

  /* animation */
  transform-origin: center bottom; /* makes the shrink feel like moving forward */
  animation: carShrinkUp 2s var(--car-ease, ease-out) forwards;
}

/* Starts from the base .car-on-road pose: translateY(0) scale(1) */
@keyframes carShrinkUp {
  0%   { transform: translateX(-50%) translateY(0%)   scale(1);    filter: brightness(1); }
  10%  { transform: translateX(-52%) translateY(-3.5em) scale(0.66); filter: brightness(0.97); }
  100% { transform: translateX(-54%) translateY(-7em) scale(0.33); filter: brightness(0.95); }
}
      


      

      @media (max-width: 1240px) {
@keyframes carShrinkUp {
  0%   { transform: translateX(-50%) translateY(0%)   scale(1);    filter: brightness(1); }
 10%  { transform: translateX(-52%) translateY(-3em) scale(0.66); filter: brightness(0.97); }
  100% { transform: translateX(-54%) translateY(-5em) scale(0.33); filter: brightness(0.95); }
}
      }

      @media (max-width: 768px) {
@keyframes carShrinkUp {
  0%   { transform: translateX(-50%) translateY(0%)   scale(1);    filter: brightness(1); }
  10%  { transform: translateX(-58%) translateY(-2.5rem) scale(0.66); filter: brightness(0.97); }
  100% { transform: translateX(-62%) translateY(-3.6rem) scale(0.33); filter: brightness(0.95); }
}
      }

     
        .car-transition-in {
          animation: carReturn var(--car-in-ms, 2420ms) var(--car-ease);
        }
        @keyframes carReturn {
          0%   { transform: translateX(-50%) translateY(-8%) scale(0.84); }
          60%  { transform: translateX(-50%) translateY(0%)  scale(1.02); }
          100% { transform: translateX(-50%) translateY(0%)  scale(1); }
        }

        @media (max-width: 768px) {
          .car-on-road { bottom: 10%; width: 40%; left: 57%; }
        }

        .car-frame {
          width: 75%;
          min-width: 45%;
          max-width: 60%;
          position: absolute;
          left: 75%;
          bottom: 0%;
          z-index: 3;
          pointer-events: none;
          display: block;
          animation: carMove 11s ease-in-out infinite, carFrameCycle 0.09s steps(1, end) infinite;
          transform-origin: center center;
          opacity: 0;
        }
        .frame-a { animation-delay: 0s, 0s; }
        .frame-b { animation-delay: 0s, 0.03s; }
        .frame-c { animation-delay: 0s, 0.06s; }

        @keyframes carMove {
          0%   { transform: translate(-50%, 0%)   translateX(-3.2%) scale(1); }
          20%  { transform: translate(-50%, -2.3%) translateX( 1.5%) scale(1.005); }
          40%  { transform: translate(-50%, 2.4%)  translateX( 4.0%) scale(1.01); }
          50%  { transform: translate(-50%, 0.5%)  translateX( 1.2%) scale(1.015); }
          60%  { transform: translate(-50%, -0.5%) translateX(-1.0%) scale(1.01); }
          80%  { transform: translate(-50%, -0.2%) translateX(-1.8%) scale(0.995); }
          100% { transform: translate(-50%, 0%)   translateX(-2.2%) scale(1); }
        }

        @keyframes carFrameCycle {
          0% { opacity: 1; }
          33.33%, 100% { opacity: 0; }
        }

        .car-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 20%;
          background: radial-gradient(ellipse at center, rgba(249,167,41,0.35), rgba(0,0,0,0));
          filter: blur(18px);
          z-index: 2;
          pointer-events: none;
          transition: filter 200ms ease, opacity 200ms ease;
        }

        .car-transition-out .car-glow { filter: blur(16px); opacity: 0.85; }
        .car-transition-in  .car-glow { filter: blur(22px); opacity: 0.95; }
      `}</style>
    </div>
  )
}
