// app/[lang]/roadmap/HeroComponents/Horizon.tsx

type Palette = {
  horizonHeight?: string;
  horizonColor?: string;
};

type HorizonProps = {
  palette: Palette;
  nextPalette: () => void;
};

export default function Horizon({ palette, nextPalette }: HorizonProps) {
  const height = palette.horizonHeight ?? "9px";
  const color = palette.horizonColor ?? "rgba(0, 0, 0, 0.5)";

  return (
    <div
      className="horizon-line"
      onClick={nextPalette}
      style={{ cursor: "pointer" }}
    >
      <style jsx>{`
        .horizon-line {
          position: absolute;
          top: 60%;
          left: 0;
          width: 100%;
          height: ${height};
          background-color: ${color};
          z-index: 2;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
