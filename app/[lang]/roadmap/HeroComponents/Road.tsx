// app/[lang]/roadmap/HeroComponents/Road.tsx

type Palette = {
  roadStart?: string;
  roadEnd?: string;
};

export default function Road({
  palette,
  nextPalette,
}: {
  palette: Palette;
  nextPalette: () => void;
}) {
  const roadStart = palette.roadStart ?? '#121212';
  const roadEnd = palette.roadEnd ?? '#2a2a2a';

  return (
    <>
      <div
        className="road-surface"
        onClick={nextPalette}
        style={{ cursor: 'pointer' }}
      />

      <style jsx>{`
        .road-surface {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 40%;
          background: linear-gradient(to top, ${roadStart}, ${roadEnd} 80%, transparent);
          clip-path: polygon(0% 100%, 40% 0%, 60% 0%, 100% 100%);
          z-index: 1;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
