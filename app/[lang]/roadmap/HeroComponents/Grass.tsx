// app/[lang]/roadmap/HeroComponents/Grass.tsx
// Uses percentages so it scales with the parent height, not the viewport.
import React from "react"

type Palette = { grass: string[] }

export default function Grass({
  palette,
  nextPalette,
}: {
  palette: Palette
  nextPalette: () => void
}) {
  const gradient = `linear-gradient(to top, ${palette.grass.join(",")})`

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: "40%",              /* percentage of the Hero container height */
    zIndex: 0,
    backgroundImage: gradient,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 200%",
    backgroundPosition: "0% 0%",
    animation: "gradientPulse 8s ease-in-out infinite alternate",
    cursor: "pointer",
    willChange: "background-position",
  }

  return (
    <>
      <div
        className="road-grass left"
        onClick={nextPalette}
        style={{
          ...baseStyle,
          left: 0,
          clipPath: "polygon(0% 100%, 10% 100%, 95% 0%, 0% 0%)",
        }}
      />
      <div
        className="road-grass right"
        onClick={nextPalette}
        style={{
          ...baseStyle,
          right: 0,
          clipPath: "polygon(100% 100%, 90% 100%, 5% 0%, 100% 0%)",
        }}
      />
      <style jsx>{`
      .road-grass{
      z-index:5}
        @keyframes gradientPulse {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
      `}</style>
    </>
  )
}
