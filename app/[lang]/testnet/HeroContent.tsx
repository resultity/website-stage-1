// app/[lang]/testnet/HeroContent.tsx
// Localized hero content (no SEO here). Uses the same ./locale as the page.

'use client';

import { useEffect, useState } from "react";
import { Cpu, Cloud, Network } from "lucide-react";
import Shuffle from '@/components/text/Shuffle';
import { useLang, type Lang } from "@/components/locale";
import dicts from "./locale";

// Narrow dict type used by this hero
type TestnetHeroDict = {
  heroTitle: string;
  phase: string;
  tiles: {
    node: { title: string; subtitle: string };
    cloud: { title: string; subtitle: string };
    referral: { title: string; subtitle: string };
  };
  aria: { node: string; cloud: string; referral: string };
  info: { contribute: string; duration: string; learnMore: string };
};

// Type the locale object instead of casting to any
const DICTS = dicts as Record<Lang, TestnetHeroDict>;

export default function HeroTestnetContent() {
  const [startTyping, setStartTyping] = useState(false);
  const lang = useLang();
  const t = DICTS[lang] ?? DICTS.en;

  useEffect(() => {
    const timeout = setTimeout(() => setStartTyping(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="hero-body content-wrapper">
      <div className="testnet-box has-text-centered is-family-monospace">
        {/* Scanline overlay */}
        <div className="scanline-overlay">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <g stroke="#F9A729">
              <line x1="0" x2="100" y1="2" y2="2" strokeWidth="0.4" opacity="0.1" />
              <line x1="0" x2="100" y1="5" y2="5" strokeWidth="0.6" opacity="0.15" />
              <line x1="0" x2="100" y1="8" y2="8" strokeWidth="0.5" opacity="0.1" />
              <line x1="0" x2="100" y1="20" y2="20" strokeWidth="1" opacity="0.25" />
              <line x1="0" x2="100" y1="24" y2="24" strokeWidth="0.8" opacity="0.2" />
              <line x1="0" x2="100" y1="28" y2="28" strokeWidth="1" opacity="0.3" />
              <line x1="0" x2="100" y1="40" y2="40" strokeWidth="1.5" opacity="0.35" />
              <line x1="0" x2="100" y1="52" y2="52" strokeWidth="0.5" opacity="0.12" />
              <line x1="0" x2="100" y1="56" y2="56" strokeWidth="0.7" opacity="0.18" />
              <line x1="0" x2="100" y1="60" y2="60" strokeWidth="0.6" opacity="0.15" />
              <line x1="0" x2="100" y1="75" y2="75" strokeWidth="1.2" opacity="0.3" />
              <line x1="0" x2="100" y1="78" y2="78" strokeWidth="0.9" opacity="0.2" />
              <line x1="0" x2="100" y1="82" y2="82" strokeWidth="1" opacity="0.25" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <div className="is-family-code">
          <Shuffle
            text={t.heroTitle}
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="h1"
            className="is-family-code is-size-1"
          />
        </div>
        <h4 className="has-text-white has-text-weight-light is-family-monospace is-size-5">
          {t.phase}
        </h4>

        {/* Three-button monitor grid */}
        <div className="monitor-grid mt-5">
          <a
            onClick={() => {
              const target = document.getElementById("node");
              if (!target) return;
              const navbar = document.querySelector(".navbar") as HTMLElement | null;
              const offset = navbar ? navbar.offsetHeight : 0;
              const top = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="monitor-btn"
            aria-label={t.aria.node}
          >
            <div className="is-hidden-touch">
              <Cpu size={48} aria-hidden="true" />
              <p>{t.tiles.node.title}</p>
              <p className="is-size-7">{t.tiles.node.subtitle}</p>
            </div>

            <div className="btn-inner is-hidden-desktop">
              <Cpu className="btn-icon " aria-hidden="true" />
              <div className="has-text-left">
                <p className="is-size-6">{t.tiles.node.title}</p>
                <p className="is-size-7">{t.tiles.node.subtitle}</p>
              </div>
            </div>
          </a>

          <a
            onClick={() => {
              const target = document.getElementById("cloud");
              if (!target) return;
              const navbar = document.querySelector(".navbar") as HTMLElement | null;
              const offset = navbar ? navbar.offsetHeight : 0;
              const top = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="monitor-btn"
            aria-label={t.aria.cloud}
          >
            <div className="is-hidden-touch">
              <Cloud size={48} aria-hidden="true" />
              <p>{t.tiles.cloud.title}</p>
              <p className="is-size-7">{t.tiles.cloud.subtitle}</p>
            </div>

            <div className="btn-inner is-hidden-desktop">
              <Cloud className="btn-icon " aria-hidden="true" />
              <div className="has-text-left">
                <p className="is-size-6">{t.tiles.cloud.title}</p>
                <p className="is-size-7">{t.tiles.cloud.subtitle}</p>
              </div>
            </div>
          </a>

          <a
            onClick={() => {
              const target = document.getElementById("affiliate-program");
              if (!target) return;
              const navbar = document.querySelector(".navbar") as HTMLElement | null;
              const offset = navbar ? navbar.offsetHeight : 0;
              const top = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="monitor-btn"
            aria-label={t.aria.referral}
          >
            <div className="is-hidden-touch">
              <Network size={48} aria-hidden="true" />
              <p>{t.tiles.referral.title}</p>
              <p className="is-size-7">{t.tiles.referral.subtitle}</p>
            </div>

            <div className="btn-inner is-hidden-desktop">
              <Network className="btn-icon " aria-hidden="true" />
              <div className="has-text-left">
                <p className="is-size-6">{t.tiles.referral.title}</p>
                <p className="is-size-7">{t.tiles.referral.subtitle}</p>
              </div>
            </div>
          </a>
        </div>

        {/* Info lines */}
        <div className="mt-5 has-text-centered">
          <p className="is-size-6">{t.info.contribute}</p>
          <p className="is-size-7">{t.info.duration}</p>
        </div>

        {/* Typewriter buttons */}
        <div className="buttons mt-5 is-centered typewriter-row">
          <button
            onClick={() => {
              const target = document.getElementById("about-testnet");
              if (!target) return;
              const navbar = document.querySelector(".navbar") as HTMLElement | null;
              const offset = navbar ? navbar.offsetHeight : 0;
              const top = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className={`tw-link orange ${startTyping ? "animated-link" : ""}`}
          >
            <span className={startTyping ? "typewriter shown delay-0" : "typewriter"}>
              {t.info.learnMore}
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* (styles unchanged) */
        .monitor-panel { background: rgba(0, 0, 0, 0.7); padding: 0.5rem; border-radius: 6px; font-size: 0.95rem; text-align: left; max-width: 560px; margin: 0 auto; box-shadow: 0 0 8px rgba(255, 255, 255, 0.05); }
        .monitor-line { display: flex; align-items: baseline; color: #ccc; margin-bottom: 0.5rem; line-height: 1.4; }
        .monitor-line.info { color: #88ffcc; font-style: italic; }
        .monitor-separator { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 1rem 0; }

        .monitor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; max-width: 640px; margin: 0 auto; }
        @media (max-width: 768px) { .monitor-grid { grid-template-columns: 1fr; } }

        .monitor-btn { position: relative; display: block; text-decoration: none; color: #eaeaea; background: rgba(0,0,0,0.72); border: 1px solid rgba(249,167,41,0.28); border-radius: 8px; padding: 0.9rem 0.95rem; box-shadow: 0 0 0 rgba(249,167,41,0); transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background 160ms ease; isolation: isolate; overflow: hidden; }
        .monitor-btn::before { content: ""; position: absolute; inset: 0; background: radial-gradient(120px 120px at var(--mx, 50%) var(--my, 50%), rgba(249,167,41,0.15), transparent 60%); opacity: 0; transition: opacity 160ms ease; pointer-events: none; z-index: 0; }
        .monitor-btn:hover { border-color: rgba(249,167,41,0.55); box-shadow: 0 0 18px rgba(249,167,41,0.18); transform: translateY(-1px); background: rgba(0,0,0,0.82); }
        .monitor-btn:hover::before { opacity: 1; }

        .btn-inner { position: relative; z-index: 1; display: flex; gap: 0.9rem; align-items: left; }
        .btn-icon { width: 24px; height: 24px; flex: 0 0 24px; color: #F9A729; filter: drop-shadow(0 0 6px rgba(249,167,41,0.25)); }

        .content-wrapper { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
        .testnet-box { position: relative; background: rgba(0, 0, 0, 0.85); padding: 2rem 1.5rem; border-radius: 8px; max-width: 640px; width: 100%; overflow: hidden; box-shadow: 0 0 30px rgba(255, 255, 255, 0.1); transform: scale(1.01); animation: flicker 1.8s infinite; }
        .scanline-overlay { position: absolute; top: -200%; left: 0; width: 100%; height: 400%; pointer-events: none; z-index: 1; animation: svgScanline 6s linear infinite, scanlineFlicker 2.4s ease-in-out infinite; }
        .scanline-overlay svg { width: 100%; height: 100%; }
        .testnet-box > :not(.scanline-overlay) { position: relative; z-index: 2; }

        .typewriter-row { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
        .tw-link { font-family: monospace; font-size: 1.3rem; text-decoration: underline; position: relative; }
        .tw-link.orange { color: #F9A729; }
        .typewriter { display: inline-block; overflow: hidden; white-space: nowrap; max-width: 0ch; opacity: 0; }
        .typewriter.shown { animation: typingEffect 2s steps(20) forwards; }

        @keyframes typingEffect { 0% { max-width: 0ch; opacity: 0.2; } 100% { max-width: 20ch; opacity: 1; } }
        .animated-link { animation: floatLink 1.8s ease-in-out infinite, linkFlicker 2s ease-in-out infinite; }
        @keyframes floatLink { 0%, 100% { transform: translateY(3px); letter-spacing: 0.2pt; } 50% { transform: translateY(-5px); letter-spacing: 0pt; } }
        @keyframes linkFlicker { 0%, 100% { opacity: 1; } 40% { opacity: 0.92; } 60% { opacity: 0.98; } 70% { opacity: 0.94; } }

        @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.97; } 53% { opacity: 0.99; } 57% { opacity: 0.96; } }
        @keyframes svgScanline { 0% { transform: translateY(0%); } 100% { transform: translateY(50%); } }
        @keyframes scanlineFlicker { 0%, 100% { opacity: 0.25; } 45% { opacity: 0.15; } 52% { opacity: 0.35; } 60% { opacity: 0.2; } 75% { opacity: 0.28; } }
      `}</style>

      {/* Mouse-follow glow for buttons */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var root = document.currentScript.parentElement;
              if (!root) return;
              root.addEventListener('pointermove', function(e) {
                var t = e.target.closest('.monitor-btn');
                if (!t) return;
                var r = t.getBoundingClientRect();
                var x = ((e.clientX - r.left) / r.width) * 100;
                var y = ((e.clientY - r.top) / r.height) * 100;
                t.style.setProperty('--mx', x + '%');
                t.style.setProperty('--my', y + '%');
              }, { passive: true });
            })();
          `
        }}
      />
    </div>
  );
}
