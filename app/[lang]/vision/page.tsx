// app/[lang]/vision/page.tsx
"use client";
import React from "react";
import { useLang } from "@/components/locale";
import Seo from "@/components/seo";
import Unisection from "@/components/Unisection";
import Uniblock from "@/components/Uniblock";
import UniHeader from "@/components/blocks/Uniheader";
import Particles from "@/components/unisection/Particles";
import Lightning from "@/components/unisection/Lightning";
import { LibGradient } from "@/components/unisection/LibGradient";
import IconMasonry, { Slide } from "@/components/blocks/IconMasonry";
import AccentText from "@/components/text/AccentText";
import FeatureBoxes, { FeatureItem } from "@/components/blocks/FeatureBoxes";
import Wallpaper from "@/components/unisection/Wallpaper";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import Squares from "@/components/unisection/Squares";
import Demo from "./Chart";
import IconCard from "@/components/blocks/IconCard";
import FeaturesGrid, { Feature } from "@/components/blocks/FeaturesGrid";
import dicts from "./locale";
import RLink from '@/components/rlink';
import { ROUTES as R } from '@/app/routes';
import {
  FlaskConical,
  Activity,
  TextSelect,
  ScanEye,
  BrainCog,
  Timer,
  Network,
  Cloudy,
  Divide,
  BrickWall,
  ServerCog,
  Binary,
  FileTerminal,
  ChartBar,
  Handshake,
  EarthLock,
  Rocket,
  GraduationCap,
  BriefcaseMedical,
  Landmark,
} from "lucide-react";

const masonry_backgrounds = [
  "linear-gradient(220.55deg, #FFFFFF 0%, #F7F7F7 100%)",
  "linear-gradient(161.15deg, #FFE5C2 0%, #FFB877 100%)",
  "linear-gradient(161.15deg, #555555 0%, #2B2B2B 100%)",
];

export default function Page() {
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  const FEATURES_IMAGES = [
    "/pages/vision/feature-1.png",
    "/pages/vision/feature-2.png",
    "/pages/vision/feature-3.png",
  ];

  const FEATURES: Feature[] = t.features.map((f: any, i: number) => ({
    title: f.title,
    imageSrc: FEATURES_IMAGES[i],
    alt: f.alt,
    description: f.description,
  }));

  const centralizedInferenceProblems: FeatureItem[] = t.problems;

  const SLIDE_META: Omit<Slide, "header" | "text">[] = [
    {
      icon: <BrainCog color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-touch",
    },
    {
      icon: <Timer color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-touch",
    },
    {
      icon: <Network color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-touch",
    },

    {
      icon: <Cloudy color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-touch",
    },
    {
      icon: <Divide color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-touch",
    },
    {
      icon: <BrickWall color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-touch",
    },

    {
      icon: <ServerCog color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-touch",
    },
    {
      icon: <Binary color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-touch",
    },
    {
      icon: <FileTerminal color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-touch",
    },

    {
      icon: <ChartBar color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-touch",
    },
    {
      icon: <Handshake color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-touch",
    },
    {
      icon: <EarthLock color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-touch",
    },

    {
      icon: <ScanEye color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-touch",
    },
    {
      icon: <TextSelect color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-touch",
    },
    {
      icon: <Activity color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-touch",
    },

    {
      icon: <BrainCog color="#000000" />,
      background: masonry_backgrounds[1],
      colorText: "black",
      colorLine: "black",
      display: "exclude-non-touch",
    },
    {
      icon: <BrickWall color="#ffffff" />,
      background: masonry_backgrounds[2],
      colorText: "white",
      colorLine: "primary",
      display: "exclude-non-touch",
    },
    {
      icon: <Divide color="#f9a729" />,
      background: masonry_backgrounds[0],
      colorText: "black",
      colorLine: "primary",
      display: "exclude-non-touch",
    },
  ];

  const ASPECTS_MASONRY_SLIDES: Slide[] = t.approach.slides.map(
    (s: any, i: number) => ({
      header: s.header,
      text: s.text,
      ...SLIDE_META[i],
    })
  );

  return (
    <>
      <Seo {...t.seo} />

      <Unisection
        opacity={[
          [1, 0.2],
          [3, 0.7],
          [4, 0.4],
          [5, 0.3],
        ]}
      
      >
        <Squares direction="down" speed={0} squareSize={256} />
        <div></div>
        <Particles />

        <Wallpaper
          background="rgba(0,0,0,0)"
          zoom={105}
          posY={1}
          blur={2}
          src="/pages/vision/hero-2.png"
          fit="cover"
          mobileBreakpoint={1024}
          mobileFit="cover"
        />
        <Wallpaper
          background="rgba(0,0,0,0)"
          zoom={107}
          posY={6}
          parallax
          src="/pages/vision/hero-1.png"
          fit="cover"
          mobileBreakpoint={1024}
          mobileFit="cover"
        />

        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Lightning
            hue={25}
            xOffset={-1.6}
            speed={0.95}
            intensity={2.75}
            size={1}
          />
        </div>

        <div className="hero is-fullheight">
          <div className="hero-body">
            <div className="">
              <div className="columns">
                <div className="column is-6">
                  <ThreeDFrame variant={2} className="has-background-black">
                    <LibGradient variant={3} color="black" />
                    <div className="p-6">
                      <UniHeader
                        as="h1"
                        header={t.hero.title}
                        subheader={t.hero.subtitle}
                        colorText="white"
                        colorLine="primary"
                      />
                      <button
                        className="button is-medium is-primary"
                        onClick={() => {
                          const target = document.getElementById("market");
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
                        {t.hero.cta}
                      </button>
                    </div>
                  </ThreeDFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Unisection>

      <div className="hero is-medium is-primary">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.whatIsInference.title}
              subheader={t.whatIsInference.subtitle}
              colorText="black"
              colorLine="white"
            />
            <AccentText as="p" text={t.whatIsInference.p1} />
            <AccentText as="p" text={t.whatIsInference.p2} />
          </div>
        </div>
      </div>

      <div className="hero is-black" id="market">
        <div className="hero-body">
          <div className="container">
            <div className="columns my-6">
              <div className="column">
                <UniHeader
                  as="h2"
                  header={t.market.title}
                  subheader={t.market.subtitle}
                  colorText="white"
                  colorLine="primary"
                />
              </div>
              <div className="column is-7">
                <AccentText inverted as="p" text={t.market.p1} />
              </div>
            </div>
            <div className="my-6">
              <Demo />
            </div>

            <div className="columns my-6 is-vcentered">
              <div className="column">
                <UniHeader
                  as="h3"
                  header={t.challenges.title}
                  subheader={t.challenges.subtitle}
                  colorText="white"
                  colorLine="primary"
                />
                <p className="mb-5">{t.challenges.intro1}</p>
                <p className="mb-5">{t.challenges.intro2}</p>
                <div className="mt-5">
                  <RLink
                    route={R.roadmap.href}
                    className="button is-large is-rounded is-outlined is-white"
                  >
                    {t.challenges.cta}
                  </RLink>
                </div>
              </div>
              <div className="column is-8">
                <div className="hero">
                  <div className="hero-body">
                    <div className="container">
                      <div className="content">
                        <FeatureBoxes
                          items={centralizedInferenceProblems}
                          layout="grid"
                          variant="dark"
                          columnsDesktop={2}
                          hoverLift
                          dense={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero is-white ">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.builtToChange.title}
              subheader={t.builtToChange.subtitle}
              colorText="black"
              colorLine="primary"
            />
            <div className="container my-6">
              <FeaturesGrid features={FEATURES} />
            </div>
            <AccentText
              as="p"
              className="is-size-5-desktop"
              text={t.builtToChange.conclusion}
            />
          </div>
        </div>
      </div>

      <div className="hero is-black is-medium" id="inference">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.approach.title}
              subheader={t.approach.subtitle}
              colorText="white"
              colorLine="primary"
            />
            <div
              className="tags are-medium is-justify-content-center"
              style={{ gap: "1rem", margin: "1.5rem 0" }}
            >
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-black"
                style={{ background: masonry_backgrounds[0] }}
              >
                {t.approach.tags.affordability}
              </span>
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-black"
                style={{ background: masonry_backgrounds[1] }}
              >
                {t.approach.tags.applicability}
              </span>
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-white"
                style={{ background: masonry_backgrounds[2] }}
              >
                {t.approach.tags.reliability}
              </span>
            </div>
            <IconMasonry columnsDesktop={3} slides={ASPECTS_MASONRY_SLIDES} />
          </div>
        </div>
      </div>

      <section className="section p-0 overflow-hidden-mobile">
        <div className="columns is-gapless is-flex-desktop is-flex-direction-row-desktop">
          <div className="column is-flex pt-6 pb-6">
            <Unisection opacity={[[1, 0.5]]}>
              <Wallpaper
                src="/pages/vision/subclouds.png"
                parallax
                zoom={110}
                blur={2}
                brightness={5}
                grayscale={15}
              />
              <LibGradient color="gray" variant={1} />
              <div className="mt-6 mb-6">
                <Uniblock opacity={[[0, 0.5]]}>
                  <LibGradient color="gray" variant={3} />
                  <div className="hero is-transparent ">
                    <div className="hero-body ">
                      <div className="container ">
                        <UniHeader
                          as="h2"
                          header={t.subclouds.title}
                          subheader={t.subclouds.subtitle}
                          colorText="black"
                          colorLine="black"
                        />
                        <div className="content mt-5">
                          <AccentText as="p" text={t.subclouds.p1} />
                          <AccentText as="p" text={t.subclouds.p2} />
                        </div>
                      </div>
                      <div className="mt-5">
                        <RLink
                          route={R.docsSubclouds.href}
                          className="button is-medium is-rounded is-outlined is-black"
                        >
                          {t.subclouds.cta}
                        </RLink>
                      </div>
                    </div>
                  </div>
                </Uniblock>
              </div>
            </Unisection>
          </div>

          <div className="column is-flex pt-6 pb-6">
            <Unisection opacity={[[1, 0.5]]}>
              <Wallpaper
                src="/pages/vision/space.png"
                parallax
                zoom={110}
                blur={2}
                grayscale={15}
              />
              <LibGradient color="blue" variant={3} />
              <div className="mt-6 mb-6">
                <Uniblock opacity={[[0, 0.5]]}>
                  <LibGradient color="blue" variant={3} />
                  <div className="hero is-transparent ">
                    <div className="hero-body ">
                      <div className="container">
                        <UniHeader
                          as="h2"
                          header={t.space.title}
                          subheader={t.space.subtitle}
                          colorText="white"
                          colorLine="white"
                        />
                        <div className="content mt-5">
                          <AccentText inverted as="p" text={t.space.p1} />
                          <AccentText inverted as="p" text={t.space.p2} />
                          <AccentText inverted as="p" text={t.space.p3} />
                        </div>
                        <div className="mt-5">
                          <RLink
                            route={R.docsSpace.href}
                            className="button is-medium is-rounded is-outlined is-white"
                          >
                            {t.space.cta}
                          </RLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </Uniblock>
              </div>
            </Unisection>
          </div>
        </div>
      </section>

      <div className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.publicGood.title}
              subheader={t.publicGood.subtitle}
              colorText="black"
              colorLine="white"
            />

            <div className="columns is-variable is-6 is-multiline mt-5">
              <div className="column is-4 is-flex">
                <IconCard
                  icon={<Rocket color="#f9a729" size={28} />}
                  title={t.publicGood.cards.startups.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.startups.p}
                  </p>
                </IconCard>
              </div>

              <div className="column is-4 is-flex">
                <IconCard
                  icon={<FlaskConical color="#f9a729" size={28} />}
                  title={t.publicGood.cards.openScience.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.openScience.p}
                  </p>
                </IconCard>
              </div>

              <div className="column is-4 is-flex">
                <IconCard
                  icon={<Landmark color="#f9a729" size={28} />}
                  title={t.publicGood.cards.government.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.government.p}
                  </p>
                </IconCard>
              </div>

              <div className="column is-4 is-flex is-hidden-touch">
                <IconCard
                  icon={<BriefcaseMedical color="#f9a729" size={28} />}
                  title={t.publicGood.cards.medicine.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.medicine.p}
                  </p>
                </IconCard>
              </div>

              <div className="column is-4 is-flex is-hidden-touch">
                <IconCard
                  icon={<GraduationCap color="#f9a729" size={28} />}
                  title={t.publicGood.cards.education.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.education.p}
                  </p>
                </IconCard>
              </div>

              <div className="column is-4 is-flex is-hidden-touch">
                <IconCard
                  icon={<Handshake color="#f9a729" size={28} />}
                  title={t.publicGood.cards.civicTech.title}
                >
                  <p className="has-text-grey-light">
                    {t.publicGood.cards.civicTech.p}
                  </p>
                </IconCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero is-white is-medium">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.foundation.title}
              subheader={t.foundation.subtitle}
              colorText="black"
              colorLine="primary"
            />
            <div className="content mt-5">
              <AccentText as="p" text={t.foundation.p1} />
              <AccentText as="p" text={t.foundation.p2} />
              <AccentText as="p" text={t.foundation.p3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
