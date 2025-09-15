// app/[lang]/node/install/page.tsx
// Type-safe: no `any`. Typed dict access and map callbacks.

"use client";
import { useLang } from "@/components/locale";
import Seo from "@/components/seo";
import React from "react";
import Unisection from "@/components/Unisection";
import Uniblock from "@/components/Uniblock";
import UniHeader from "@/components/blocks/Uniheader";
import { LibGradient } from "@/components/unisection/LibGradient";
import HeroSideBg from "@/components/blocks/HeroSideBg";
import AccentText from "@/components/text/AccentText";
import FeaturesGrid, { Feature } from "@/components/blocks/FeaturesGrid";
import Multiterminal from "./Multiterminal";
import Wallpaper from "@/components/unisection/Wallpaper";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import FloatGrid from "@/components/unisection/FloatGrid";
import Squares from "@/components/unisection/Squares";
import LightRays from "@/components/unisection/LightRays";
import dicts from "./locale";
import { useWaitlistModal } from "@/components/Waitlist";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
// derive dictionary type from `en` entry
type NodeInstallDict = typeof dicts.en;
type FeatureLocale = NodeInstallDict["capabilities"]["features"][number];

const FEATURES_IMAGES: string[] = [
  "/pages/node-install/feature-1.png",
  "/pages/node-install/feature-2.png",
  "/pages/node-install/feature-3.png",
];

export default function Page() {
  const lang = useLang();
  const { openWaitlist } = useWaitlistModal();
  // typed lookup with fallback to 'en'
  const t: NodeInstallDict = (dicts as Record<string, NodeInstallDict>)[lang] ?? dicts.en;

  const FEATURES: Feature[] = (t.capabilities.features as FeatureLocale[]).map(
    (f: FeatureLocale, i: number): Feature => ({
      title: f.title,
      alt: f.alt,
      description: f.description,
      imageSrc: FEATURES_IMAGES[i] ?? FEATURES_IMAGES[FEATURES_IMAGES.length - 1],
    })
  );

  return (
    <>
      <Seo {...t.seo} />

      <Unisection>
        <LibGradient color="black" variant={6} />

        <ThreeDFrame variant={4} bgMode>
          <Uniblock
            opacity={[
              [0, 0.15],
              [1, 0.55],
              [2, 0.35],
            ]}
          >
            <Wallpaper
              background="rgba(0,0,0,0)"
              zoom={105}
              parallax
              src="/pages/node-install/hero.png"
              fit="cover"
              mobileFit="cover"
            />
            <FloatGrid />
            <LibGradient color="black" variant={6} />
            <div className="hero is-fullheight">
              <div className="hero-body"></div>
            </div>
          </Uniblock>
        </ThreeDFrame>

        <div className="hero is-fullheight ">
          <div className="hero-body">
            <div>
              <div className="columns">
                <div className="column is-6 ">
                  <ThreeDFrame variant={2} className="has-background-black">
                    <div className="p-6">
                      <UniHeader
                        as="h1"
                        header={t.hero.title}
                        subheader={t.hero.subtitle}
                        colorText="white"
                        colorLine="primary"
                      />
                      <AccentText as="p" inverted text={t.hero.blurb} />
                      <div className="buttons mt-5">
                        <button
                          className="button is-medium  is-outlined is-white"
                          onClick={() => {
                            const target = document.getElementById("install");
                            if (!target) return;
                            const navbar = document.querySelector(
                              ".navbar"
                            ) as HTMLElement | null;
                            const offset = navbar ? navbar.offsetHeight : 0;
                            const top =
                              target.getBoundingClientRect().top +
                              window.scrollY -
                              offset;
                            window.scrollTo({ top, behavior: "smooth" });
                          }}
                        >
                          {t.hero.ctas.install}
                        </button>
                        <button onClick={openWaitlist} className="button is-medium  is-outlined is-primary">
                          {t.hero.ctas.waitlist}
                        </button>
                      </div>
                    </div>
                  </ThreeDFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Unisection>

      <section className="section p-0 overflow-hidden-mobile">
        <div className="columns is-gapless is-flex-desktop is-flex-direction-row-desktop">
          {/* LEFT — TESTNET SECTION */}
          <div className="column is-flex pt-6 pb-6">
            <Unisection opacity={[[0, 0.9]]}>
              <LibGradient color="yellow" variant={3} />
              <div className="hero is-transparent is-medium">
                <div className="hero-body">
                  <div className="container">
                    <UniHeader
                      as="h2"
                      header={t.halves.testnet.header}
                      subheader={t.halves.testnet.subheader}
                      colorText="black"
                      colorLine="black"
                    />
                    <div className="content">
                      <AccentText as="p" text={t.halves.testnet.p1} />
                      <AccentText as="p" text={t.halves.testnet.p2} />
                    </div>
                    <div className="mt-5">
                      <RLink
                        route={R.testnet.href}
                        className="button is-medium  is-outlined is-black"
                      >
                        {t.halves.testnet.cta}
                      </RLink>
                    </div>
                  </div>
                </div>
              </div>
            </Unisection>
          </div>

          {/* RIGHT — MAINNET SECTION */}
          <div className="column is-flex pt-6 pb-6">
            <Unisection opacity={[[0, 0.9]]}>
              <LibGradient color="black" variant={3} />
              <div className="hero is-transparent is-medium">
                <div className="hero-body">
                  <div className="container">
                    <UniHeader
                      as="h2"
                      header={t.halves.mainnet.header}
                      subheader={t.halves.mainnet.subheader}
                      colorText="white"
                      colorLine="white"
                    />
                    <div>
                      <AccentText as="p" inverted text={t.halves.mainnet.p1} />
                      <AccentText as="p" inverted text={t.halves.mainnet.p2} />
                    </div>
                    <div className="mt-5">
                      <RLink
                        route={R.token.href}
                        className="button is-medium is-outlined is-white"
                      >
                        {t.halves.mainnet.cta}
                      </RLink>
                    </div>
                  </div>
                </div>
              </div>
            </Unisection>
          </div>
        </div>
      </section>

      <div id="install"></div>
      <Unisection
        opacity={[
          [0, 0.5],
          [1, 0.2],
        ]}
      >
        <LightRays raysColor="f9a729" />
        <Squares direction="down" speed={0.1} squareSize={128} />
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="container is-max-tablet">
              <UniHeader
                header={t.installSection.header}
                subheader={t.installSection.subheader}
                colorText="white"
                colorLine="primary"
              />

              <Multiterminal />

              <div className="mt-6 mb-6"></div>
              <p className="is-size-6 has-text-light-grey">
                {t.installSection.narrative}
              </p>
            </div>
          </div>
        </section>
      </Unisection>

      <section className="hero is-primary ">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.capabilities.header}
              subheader={t.capabilities.subheader}
              colorText="black"
              colorLine="white"
            />
            <FeaturesGrid features={FEATURES} />
            <div className="columns mt-6">
              <div className="column">
                <p className="is-size-6 has-text-black-ter is-family-secondary">
                  {t.capabilities.col1}
                </p>
              </div>
              <div className="column">
                <p className="is-size-6 has-text-black-ter is-family-secondary">
                  {t.capabilities.col2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Unisection>
        <LibGradient color="gray" variant={3}></LibGradient>
        <section className="hero is-small">
          <div className="hero-body">
            <div className="containter is-max-desktop has-text-centered">
              <h3 className="title is-4 has-text-black mb-4">
                <span>{t.deeper.title}</span>
              </h3>
              <p className="is-size-6 has-text-dark mb-4">{t.deeper.p}</p>
              <div className="buttons is-centered">
                <RLink route={R.cloud.href} className="button is-black is-outlined">
                  {t.deeper.ctas.cloud}
                </RLink>
                <RLink route={R.docs.href} className="button is-black is-outlined ">
                  {t.deeper.ctas.docs}
                </RLink>
              </div>
            </div>
          </div>
        </section>
      </Unisection>

      <Unisection opacity={[[0, 0.3]]}>
        <Squares speed={0.1} squareSize={128} direction="down" />
        <section className="hero ">
          <div className="hero-body">
            <div className="containter is-max-desktop">
              <HeroSideBg
                contentCol={7}
                imageCol={5}
                imageSrc="/pages/node-install/dbcs.png"
                imageRight
                imageAlt=""
                inverted
              >
                <UniHeader
                  as="h3"
                  header={t.dashboard.header}
                  subheader={t.dashboard.subheader}
                  colorText="white"
                  colorLine="primary"
                />
                <div className="content">
                  <p className="mt-5 is-size-5 has-text-light  is-family-secondary has-text-weight-light">
                    {t.dashboard.listHeading}
                  </p>

                  <ul className="has-text-light is-family-secondary is-size-5 has-text-weight-light ml-5">
                    {t.dashboard.bullets.map((b: string, i: number) => (
                      <li key={i} className="is-family-secondary">
                        {b}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 is-size-5 is-family-secondary">
                    {t.dashboard.narrative}
                  </p>
                </div>
              </HeroSideBg>
            </div>
          </div>
        </section>
      </Unisection>

      <section className="hero is-white is-medium">
        <div className="hero-body">
          <div className="containter is-max-desktop">
            <HeroSideBg
              contentCol={7}
              imageCol={5}
              imageSrc="/pages/node-install/rocket.jpg"
              imageAlt=""
            >
              <UniHeader
                as="h2"
                header={t.final.header}
                subheader={t.final.subheader}
                colorText="black"
                colorLine="primary"
              />
              <div className="content">
                <p className="mt-5 is-size-5 has-text-dark has-text-weight-bold">
                  {t.final.lead}
                </p>

                <ul className="has-text-dark  is-size-5 has-text-weight-bold ml-5">
                  {t.final.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="buttons mt-5">
                  <RLink route={R.testnet.href} className="button is-medium  is-bordered is-primary">
                    {t.final.buttons.primary}
                  </RLink>
                  <button onClick={openWaitlist} className="button is-medium  is-bordered is-grey">
                    {t.final.buttons.secondary}
                  </button>
                </div>

                <p className="mt-5 is-size-5">{t.final.p}</p>
              </div>
            </HeroSideBg>
          </div>
        </div>
      </section>
    </>
  );
}
