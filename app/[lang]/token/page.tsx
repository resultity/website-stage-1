"use client";
import { useLang } from '@/components/locale';
import Seo from '@/components/seo'
import dicts from './locale';
import React from "react";
import Unisection from "@/components/Unisection";
import UniHeader from "@/components/blocks/Uniheader";
import Tokenomics from "./Tokenomics";
import IconMasonry, { Slide } from "@/components/blocks/IconMasonry";
import Orb from "@/components/unisection/Orb";
import Gradient from "@/components/unisection/Gradient";
import FeaturesGrid from "@/components/blocks/FeaturesGrid";
import Particles from "@/components/unisection/Particles";
import Squares from "@/components/unisection/Squares";
import TextType from "@/components/text/TextType";
import AccentText from "@/components/text/AccentText";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
import {
  Gem,
  Bubbles,
  Pickaxe,
  DiamondPercent,
  Banknote,
  LandPlot,
  ShieldPlus,
  Network,
  Trophy,
} from "lucide-react";
import { LibGradient } from '@/components/unisection/LibGradient';

export default function NodePage() {
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  const FEATURE_IMAGES = [
    "/pages/token/feature-1.png",
    "/pages/token/feature-2.png",
    "/pages/token/feature-3.png",
  ];
  const FEATURES = t.features.map((f: any, i: number) => ({
    ...f,
    imageSrc: FEATURE_IMAGES[i] || FEATURE_IMAGES[0],
  }));

  const backgrounds = [
    "linear-gradient(220.55deg, #FFD439 0%, #FF7A00 100%)",
    "linear-gradient(161.15deg, #757575 12.73%, #050505 72.95%)",
    "linear-gradient(161.15deg, #6714CC 12.73%, #2E68F5 72.95%)",
  ];
const ICONS = [
  <Bubbles key="icon-0" color="#ffffff" />,
  <Pickaxe key="icon-1" color="#f9a729" />,
  <DiamondPercent key="icon-2" color="#ffffff" />,
  <Banknote key="icon-3" color="#f9a729" />,
  <LandPlot key="icon-4" color="#ffffff" />,
  <ShieldPlus key="icon-5" color="#f9a729" />,
  <Network key="icon-6" color="#ffffff" />,
  <Trophy key="icon-7" color="#f9a729" />,
  <Gem key="icon-8" color="#ffffff" />,
];
  const COLOR_PRESETS = [
    { bg: backgrounds[0], colorText: "black", colorLine: "white" },
    { bg: backgrounds[1], colorText: "white", colorLine: "primary" },
    { bg: backgrounds[0], colorText: "black", colorLine: "white" },
    { bg: backgrounds[1], colorText: "white", colorLine: "primary" },
    { bg: backgrounds[2], colorText: "white", colorLine: "primary" },
    { bg: backgrounds[1], colorText: "white", colorLine: "primary" },
    { bg: backgrounds[0], colorText: "black", colorLine: "white" },
    { bg: backgrounds[1], colorText: "white", colorLine: "primary" },
    { bg: backgrounds[0], colorText: "black", colorLine: "white" },
  ];
  const slides: Slide[] = t.acquire.slides.map((s: any, i: number) => ({
    header: s.header,
    text: s.text,
    icon: ICONS[i],
    background: COLOR_PRESETS[i].bg,
    colorText: COLOR_PRESETS[i].colorText as any,
    colorLine: COLOR_PRESETS[i].colorLine as any,
  }));

  return (
    <>
      <Seo {...t.seo} />
      <Unisection
        padding="large"
        fullheight
        opacity={[
          [0, 0.55],
          [1, 0.5],
          [2, 0.35],
        ]}
      >
        <Gradient variant="dark" form="radial" />
        <Particles />
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Orb hoverIntensity={150} rotateOnHover hue={200} forceHoverState={false} />
        </div>

        <div className="hero is-fullheight-with-navbar has-text-centered">
          <div className="hero-body is-align-items-center is-justify-content-center">
            <div className="container">
              <div className=" has-text-weight-bold has-text-white">
                <h3>
                  <TextType
                    text={["commun", "result", "util"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    cursorCharacter="#"
                  />
                  <span className="has-text-primary">ity</span>
                </h3>
                <h1 className="title is-3 has-text-primary mb-4 has-text-weight-bold is-family-secondary">
                  {t.hero.tokenLabel}
                  <br />
                  <span className="has-text-white is-size-1 is-family-monospace">
                    {t.hero.ticker}
                  </span>
                </h1>
                <button
                  className="button is-medium is-primary"
                  onClick={() => {
                    const target = document.getElementById("details");
                    if (!target) return;
                    const navbar = document.querySelector(".navbar") as HTMLElement | null;
                    const offset = navbar ? navbar.offsetHeight : 0;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                >
                  {t.hero.ctaDetails}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Unisection>

      <div className="hero is-medium is-white" id="details">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.profile.header}
              subheader={t.profile.subheader}
              colorText="black"
              colorLine="primary"
            />
            <AccentText as="p" text={t.profile.paragraph} />
            <div className="buttons">
              <RLink className="button is-outlined" route={R.roadmap.href}>
                {t.profile.ctas.roadmap}
              </RLink>
              <button
                className="button is-primary"
                onClick={() => {
                  const target = document.getElementById("tokenomics");
                  if (!target) return;
                  const navbar = document.querySelector(".navbar") as HTMLElement | null;
                  const offset = navbar ? navbar.offsetHeight : 0;
                  const top = target.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
              >
                {t.profile.ctas.tokenomics}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero is-primary ">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.featuresSection.header}
              subheader={t.featuresSection.subheader}
              colorText="black"
              colorLine="white"
            />
            <FeaturesGrid features={FEATURES} />
          </div>
        </div>
      </div>

      <div id="tokenomics" />
      <Tokenomics />

      <Unisection opacity={[[1, 0.2], [2, 0.9]]}>
        <LibGradient color="black" variant={2} />
        <Squares speed={0} squareSize={100} direction="right" borderColor="#fff" hoverFillColor="#222" />
        <div className="hero ">
          <div className="hero-body">
            <UniHeader
              as="h2"
              header={t.acquire.header}
              subheader={t.acquire.subheader}
              colorText="white"
              colorLine="primary"
            />
            <IconMasonry slides={slides} columnsDesktop={4} />
          </div>
        </div>
      </Unisection>

      <section className="section p-0 overflow-hidden-mobile">
        <div className="columns is-gapless is-flex-desktop is-flex-direction-row-desktop">
          <div className="column is-flex">
            <div className="hero is-primary is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.spendAndHealth.spend.header}
                    subheader={t.spendAndHealth.spend.subheader}
                    colorText="black"
                    colorLine="white"
                  />
                  <div className="content mt-5">
                    {t.spendAndHealth.spend.bullets.map((p: string, i: number) => (
                      <AccentText key={i} as="p" text={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-flex">
            <div className="hero is-white is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.spendAndHealth.health.header}
                    subheader={t.spendAndHealth.health.subheader}
                    colorText="black"
                    colorLine="primary"
                  />
                  <div className="content mt-5">
                    {t.spendAndHealth.health.bullets.map((p: string, i: number) => (
                      <AccentText key={i} as="p" text={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
