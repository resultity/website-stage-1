// app/[lang]/roadmap/HeroComponents/TilesTop.tsx
'use client';

type TilesPalette = {
  tileBackground?: string;
  tileBorder?: string;
  // allow extra theme keys without using `any`
  [key: string]: unknown;
};

type TilesTopProps = {
  palette: TilesPalette;
  nextPalette: () => void;
};

export default function TilesTop({ palette, nextPalette }: TilesTopProps) {
  const {
    tileBackground = 'rgba(0, 0, 0, 0.03)',
    tileBorder = 'rgba(255, 255, 255, 0.03)',
  } = palette;

  return (
    <div className="tiles-top" onClick={nextPalette} style={{ cursor: 'pointer' }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="tile-top" />
      ))}
      <style jsx>{`
        .tiles-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60%;
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          grid-template-columns: repeat(10, 1fr);
          z-index: 2;
          pointer-events: none;
          cursor: pointer;
        }
        .tile-top {
          background: ${tileBackground};
          border: 1px solid ${tileBorder};
        }
      `}</style>
    </div>
  );
}
