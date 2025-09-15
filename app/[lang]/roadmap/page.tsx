// app/[lang]/roadmap/page.tsx

"use client";
import React, { useEffect, useRef, useState } from "react";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import Sky from "./HeroComponents/Sky";
import Seo from "@/components/seo";
import TilesTop from "./HeroComponents/TilesTop";
import TilesBottom from "./HeroComponents/TilesBottom";
import Road from "./HeroComponents/Road";
import Grass from "./HeroComponents/Grass";
import Horizon from "./HeroComponents/Horizon";
import OverlayShadows from "./HeroComponents/OverlayShadows";
import Car from "./HeroComponents/Car";
import { colorPalettes } from "./HeroComponents/ColorPalettes";
import {  useLang } from "@/components/locale";
import dicts from "./locale";
import RoadmapPanel from "./RoadmapPanel"
import Unisection from "@/components/Unisection";
import LightRays from "@/components/unisection/LightRays";
import Image from "next/image";

type CarPhase = 'idle' | 'out' | 'in'

export default function Page() {

    const lang = useLang();
    const t = (dicts as any)[lang] ?? dicts.en;

  const [paletteIdx, setPaletteIdx] = useState(0);
  const palette = colorPalettes[paletteIdx];

  // Transition state
  const [carPhase, setCarPhase] = useState<CarPhase>('idle');
  const [overlayOn, setOverlayOn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // ADDED: foreground label animation state
  const [shownLevelIdx, setShownLevelIdx] = useState(paletteIdx);
  const [fgState, setFgState] = useState<'idle' | 'leaving' | 'entering'>('idle');

  // Timers cleanup
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach(id => clearTimeout(id)); }, []);

  // Durations
  const CAR_OUT_MS = 2420;        // car moves/shrinks
  const OVERLAY_FADE_MS = 240;    // overlay fade in/out
  const HOLD_BLACK_MS = 80;       // short hold before/after palette swap
  const CAR_IN_MS = 320;          // car return animation

  // ADDED: react to carPhase to animate the foreground label
  useEffect(() => {
    if (carPhase === 'out') {
      setFgState('leaving'); // fade old label out
    } else if (carPhase === 'in') {
      setShownLevelIdx(paletteIdx); // swap to the new index
      setFgState('entering');       // fade new label in
      const t = window.setTimeout(() => setFgState('idle'), 360);
      return () => clearTimeout(t);
    } else {
      setFgState('idle');
    }
  }, [carPhase, paletteIdx]);

  const startPaletteTransition = () => {
    if (transitioning) return;
    setTransitioning(true);

    // Step 1: car moves toward horizon and shrinks
    setCarPhase('out');

    // Step 2: after car-out, fade in overlay to full black with noise
    timers.current.push(window.setTimeout(() => setOverlayOn(true), CAR_OUT_MS));

    // Step 3: when overlay is fully opaque, swap palette and start car "in"
    timers.current.push(window.setTimeout(() => {
      setPaletteIdx(i => (i + 1) % colorPalettes.length);
      setCarPhase('in');
    }, CAR_OUT_MS + OVERLAY_FADE_MS + HOLD_BLACK_MS));

    // Step 4: begin fading overlay out after car-in starts
    timers.current.push(window.setTimeout(() => {
      setOverlayOn(false);
    }, CAR_OUT_MS + OVERLAY_FADE_MS + HOLD_BLACK_MS + CAR_IN_MS));

    // Step 5: settle back to idle
    timers.current.push(window.setTimeout(() => {
      setCarPhase('idle');
      setTransitioning(false);
    }, CAR_OUT_MS + OVERLAY_FADE_MS + HOLD_BLACK_MS + CAR_IN_MS + OVERLAY_FADE_MS));
  };

  return (
    <>
     <Seo {...t.seo} />
    <Unisection opacity={[[0,0.5]]}>
      <LightRays raysColor="f9a729" />
        <div className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
            <div className="columns is-vcentered">
              {/* Left column: terminal */}
              <div className="column is-6">
                <ThreeDFrame variant={2}>
                  <div className="term-window">
                    <div className="term-titlebar">
                      <div className="term-lights">
                        <span className="light close" />
                        <span className="light min" />
                        <span className="light max" />
                      </div>
                      <div className="term-title">rtity:~/roadmap.sh</div>
                    </div>

                    {/* Center content both axes */}
                    <div className="term-body">
                      <div className="hero-wrapper">
                        <TilesTop palette={palette} nextPalette={startPaletteTransition} />
                        <Sky palette={palette} nextPalette={startPaletteTransition} />
                        <Horizon palette={palette} nextPalette={startPaletteTransition} />
                        <Road palette={palette} nextPalette={startPaletteTransition} />
                        <Grass palette={palette} nextPalette={startPaletteTransition} />
                        <TilesBottom
                          palette={palette}
                          nextPalette={startPaletteTransition}
                          phase={carPhase}
                          baseMs={8000}
                          accel={2.5}
                          lineShift={1}
                          lineDashGap={0}
                          lineWidth={2}
                        />
                        <OverlayShadows  nextPalette={startPaletteTransition} />

                        {/* Car gets explicit transition phase */}
                        <Car phase={carPhase} />

                        {/* ADDED: animate this existing foreground label */}
                        <div
                          className={`hero-foreground ${fgState === 'leaving' ? 'is-leaving' : ''} ${fgState === 'entering' ? 'is-entering' : ''}`}
                        >
                          {/* keep original text shape; only the index swaps after 'in' */}
                          Level 0{shownLevelIdx + 1}.
                        </div>
                      </div>

                      {/* Blackout + noise overlay (covers hero + footer area) */}
                      <div className={`transition-overlay ${overlayOn ? 'active' : ''}`} />

                      <div className="term-footer">
                        <span className="prompt">›</span> rendering road… v-sync on
                      </div>
                    </div>
                  </div>
                </ThreeDFrame>
              </div>

              {/* Right column: copy */}
              <div className="column is-6">
                <div className="p-3 container">
                  <RoadmapPanel
                    palette={palette}
                    paletteIndex={paletteIdx}
                    nextPalette={startPaletteTransition}
                    disabled={transitioning}
                  />
                  
                </div>
              </div>
              {/* Right column end */}
            </div>
          </div>
        </div>
         <Image
                                src="/pages/roadmap/bg-1.png"
                                alt=""
                                
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                                width={0.01}
                                height={0.01}
                              />
                                       <Image
                                src="/pages/roadmap/bg-2.png"
                                alt=""
                                
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                                width={0.01}
                                height={0.01}
                              />
                                       <Image
                                src="/pages/roadmap/bg-3.png"
                                alt=""
                                
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                                width={0.01}
                                height={0.01}
                              />
                                       <Image
                                src="/pages/roadmap/bg-4.png"
                                alt=""
                                
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                                width={0.01}
                                height={0.01}
                              />
                                       <Image
                                src="/pages/roadmap/bg-5.png"
                                alt=""
                                
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                                width={0.01}
                                height={0.01}
                              />
</div></Unisection>

      <style jsx>{`
.hero-foreground{
  /* ADDED: make it a true overlay at the top center of the monitor */
  position: absolute;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20; /* above transition-overlay (z-index:10) and scene */
  pointer-events: none;
  /* monospace, intentionally raw */
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-weight: 800;
  letter-spacing: 0.06em;
  font-size: clamp(14px, 1.2vw, 14px);
  color: #ffffffcc;
  /* hard black shadow */
  text-shadow:
    0 0 0 #000,
    2px 2px 0 #000,
    0 0 10px rgba(0,0,0,0.95),
    0 0 24px rgba(0,0,0,0.7);
  /* fade/slide animation */
  opacity: 1;
  transition: opacity 260ms ease, transform 260ms ease;
}
.hero-foreground.is-leaving{
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.98);
}
.hero-foreground.is-entering{
  animation: fgPop 620ms ease;
}
@keyframes fgPop{
  0%   { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.98); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.0); }
}

  :global(.hero-body > .columns) { width: 100%; }


  :global(.hero-body > .columns > .column.is-6),
  :global(.hero-body > .columns > .column.is-half),
  :global(.hero-body > .columns > .column.is-one-half) {
    flex: 0 0 50% !important;
    max-width: 50% !important;
    min-width: 0;
  }

  }

        /* Terminal skin */
        .term-window {
          display: flex;
          flex-direction: column;
          background: #0a0a0a;
          border: 1px solid #1f1f1f;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6),
                      inset 0 0 0 1px rgba(255,255,255,0.02);
          overflow: hidden;
          backdrop-filter: blur(2px);
          max-width: 100%;
          position: relative;
          isolation: isolate; /* ensures overlay blends stay bounded */
        }

        .term-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 14px;
          background: linear-gradient(180deg, #121212, #0c0c0c);
          border-bottom: 1px solid #1a1a1a;
          z-index: 2;
          position: relative;
        }
        .term-lights { display: inline-flex; gap: 8px; align-items: center; }
        .light { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 0 1px rgba(0,0,0,0.5), inset 0 0 4px rgba(0,0,0,0.6); }
        .light.close { background: #000000; }
        .light.min   { background: #ffbd2e; }
        .light.max   { background: #ffffff; }

        .term-title {
          color: #bfbfbf;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0.9;
        }

        /* Layout: hero + footer */
        .term-body {
          position: relative;
          display: grid;
          grid-template-rows: 1fr auto; /* hero area + footer */
          align-items: center;
          justify-items: center;
          background: #000;
          min-height: 0;
        }

        .hero-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          outline: 1px solid rgba(255,255,255,0.04);
          outline-offset: -1px;
          z-index: 1;
        }

        /* Desktop: horizontal aspect */
        @media (min-width: 769px) and (orientation: landscape) {
          .term-body { place-items: center; }
          .hero-wrapper {
            aspect-ratio: 16 / 9;
            max-height: 80vh;
          }
        }

        /* Mobile: safe viewport height */
        @media (max-width: 768px), (orientation: portrait) {
          .hero-wrapper {
            width: 100%;
            height: 30svh;
            height: 30dvh;
            height: 30vh;
            max-width: 100%;
            overflow: hidden;
          }
        }

        .hero-wrapper :global(.hero) { width: 100%; height: 100%; }

        .term-footer {
          padding: 8px 12px;
          border-top: 1px solid #1a1a1a;
          background: linear-gradient(180deg, #0c0c0c, #090909);
          color: #8a8a8a;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.25px;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          z-index: 1;
        }
        .prompt { color: #f9a729; }

        /* Blackout overlay with CRT noise */
        .transition-overlay {
          position: absolute;
          inset: 0;
          background: #000;
          opacity: 0;
          transition: opacity 240ms ease;
          z-index: 10; /* foreground label is above this */
          pointer-events: none;
        }
        .transition-overlay.active { opacity: 1; }

        @keyframes crtFlicker {
          0%, 100% { opacity: 0.18; }
          50%      { opacity: 0.26; }
        }
      `}</style>
    </>
  );
}
