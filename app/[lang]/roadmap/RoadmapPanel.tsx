// app/[lang]/roadmap/RoadmapPanel.tsx
// All copy comes from ./locale. Types imported from dict for consistency.

"use client";

import UniHeader from "@/components/blocks/Uniheader";
import AccentText from "@/components/text/AccentText";
import { ArrowRight } from "lucide-react";
import { useLang, type Lang } from "@/components/locale";
import dicts from "./locale";
import type { StageDict } from "./locale/dict";

// Minimal palette shape this panel reads
type PaletteLike = {
  line?: string;
  primary?: string;
  accent?: string;
};

// Locale subset this panel uses
type PanelLocale = {
  stages: StageDict[];
  panel: {
    nextStageFallback: string;
    ariaRoadmap: string;
    nextLabelPrefix: string;
  };
};

// Type the dictionaries instead of using `any`
const DICTS = dicts as Record<Lang, PanelLocale>;

export default function RoadmapPanel({
  palette,
  paletteIndex,
  nextPalette,
  disabled = false,
}: {
  palette: PaletteLike;
  paletteIndex: number;
  nextPalette: () => void;
  disabled?: boolean;
}) {
  const lang = useLang();
  const t = DICTS[lang] ?? DICTS.en;

  const stages: StageDict[] = t.stages;
  const stage = stages[paletteIndex % stages.length];

  const accent = palette.line ?? palette.primary ?? palette.accent ?? "#f9a729";
  const lineColor = "#3a3a3a";

  const nextIdx = (paletteIndex + 1) % stages.length;
  const nextStageTitle = stages[nextIdx]?.header ?? t.panel.nextStageFallback;

  const padding = 16;
  const spacing = 72;
  const lineX = 28;
  const labelX = 80;
  const height = padding * 2 + spacing * (stage.stations.length - 1);
  const svgWidth = 720; // numeric viewBox width so the SVG scales correctly
  const yAt = (i: number) => padding + i * spacing;

  return (
    <div className="roadmap-panel">
      <UniHeader
        as="h1"
        header={stage.header}
        subheader={stage.subheader}
        colorText="white"
        colorLine="primary"
      />

      <div className="metro-wrap">
        <svg
          className="metro"
          width="100%"
          height={height}
          viewBox={`0 0 ${svgWidth} ${height}`}
          role="img"
          aria-label={t.panel.ariaRoadmap}
          preserveAspectRatio="xMinYMin meet"
        >
          <line x1={lineX} y1={padding} x2={lineX} y2={height - padding} className="backbone" />

          {stage.stations.map((s, i) => {
            const y = yAt(i);
            const dotFill =   accent ;
            const segColor =
              s.done && i < stage.stations.length - 1 ? s.color || accent : lineColor;

            return (
              <g key={i} className={`station ${s.done ? "done" : ""}`}>
                <circle cx={lineX} cy={y} r={16} className="dot" fill={dotFill} />
                <text x={labelX} y={y - 6} className="x-title">
                  {s.title}
                </text>
                <text x={labelX} y={y + 22} className="x-subtitle">
                  {s.subtitle}
                </text>

                {i < stage.stations.length - 1 && (
                  <line x1={lineX} y1={y} x2={lineX} y2={yAt(i + 1)} className="segment" stroke={segColor} />
                )}
              </g>
            );
          })}
        </svg>

      </div>

      <div className="pt-6 pb-6">
        <AccentText inverted as="p" text={stage.accentText} />
      </div>

      <div className="cta-row">
        <button
          className="button is-primary is-medium is-hidden-touch"
          onClick={nextPalette}
          disabled={disabled}
          aria-label={`${t.panel.nextLabelPrefix} ${nextStageTitle}`}
          title={`${t.panel.nextLabelPrefix} ${nextStageTitle}`}
        >
          {nextStageTitle} <ArrowRight size={18} style={{ marginLeft: "16px" }} />
        </button>

      </div>
      <nav className="navbar is-hidden-desktop is-fixed-bottom p-2">
        <div className="navbar-menu is-active">
          <div className="navbar-item p-0" style={{ width: "100%" }}>
            <button
              onClick={nextPalette}
              className="button is-primary is-medium "
              aria-label={`${t.panel.nextLabelPrefix} ${nextStageTitle}`}
              title={`${t.panel.nextLabelPrefix} ${nextStageTitle}`}
            >
              {nextStageTitle}
              <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </button>
          </div>
        </div>
      </nav>


      <style jsx>{`
        .roadmap-panel { width: 100%; min-width: 0; }
        .metro-wrap { padding-top: 1rem; user-select: none; width: 100%; }
        .metro { display: block; width: auto; height: auto; overflow: visible; }
        .backbone { stroke: ${lineColor}; stroke-width: 8; stroke-linecap: round; }
        .segment { stroke-width: 8; stroke-linecap: round; }
        .dot { stroke: #1b1b1b; stroke-width: 2; }
        .station.done .dot { filter: drop-shadow(0 0 8px rgba(0,0,0,0.35)); }
        .x-title {
          font: 600 clamp(16px, 1.8vw, 22px) / 1.2 ui-sans-serif, system-ui,
            -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          fill: #ffffff;
        }

        .x-subtitle {
          font: clamp(13px, 1.4vw, 18px) / 1.2 ui-sans-serif, system-ui,
            -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          fill: #c9c9c9;
        }
        .cta-row { margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .metro-wrap { margin-top: 0.5rem; }
          .backbone, .segment { stroke-width: 10; }
        }
        .mobile-bottom-nav {
          position: sticky; bottom: 0; background: #0a0a0a;
          border-top: 1px solid #1f1f1f; padding: 0.5rem; z-index: 30;
        }
        .nav-btn {
          display: flex; align-items: center; justify-content: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .navbar-menu { width: 100%; display: flex; justify-content: space-between; }
      `}</style>
    </div>
  );
}
