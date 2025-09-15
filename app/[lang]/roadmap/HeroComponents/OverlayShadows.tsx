// app/[lang]/roadmap/HeroComponents/OverlayShadows.tsx

type OverlayShadowsProps = {
  // Kept for API consistency; not used inside this component
  nextPalette: () => void;
};

export default function OverlayShadows({
  nextPalette,
}: OverlayShadowsProps) {
  return (
    <>
      <div className="overlay-shadow delay-1" onClick={nextPalette} aria-hidden="true" />
      <div className="overlay-shadow delay-2" onClick={nextPalette} aria-hidden="true" />
      <div className="overlay-shadow delay-3" onClick={nextPalette} aria-hidden="true" />
      <style jsx>{`
        .overlay-shadow {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 5%;
          background: rgba(0, 0, 0, 0.1);
          animation: moveShadowDown 12s linear infinite;
          z-index: 5;
          cursor: pointer;
        }
        .overlay-shadow.delay-1 {
          animation-delay: 3s;
        }
        .overlay-shadow.delay-2 {
          animation-delay: 4s;
        }
        .overlay-shadow.delay-3 {
          animation-delay: 8s;
        }
        @keyframes moveShadowDown {
          0% { top: -10%; }
          100% { top: 100%; }
        }
      `}</style>
    </>
  );
}
