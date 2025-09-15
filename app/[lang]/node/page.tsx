// app/[lang]/node/page.tsx
"use client";
import { useLang } from "@/components/locale";
import Seo from "@/components/seo";
import React from "react";
import Unisection from "@/components/Unisection";
import Uniblock from "@/components/Uniblock";
import UniHeader from "@/components/blocks/Uniheader";
import Image from "next/image";
import { LibGradient } from "@/components/unisection/LibGradient";
import HeroSideBg from "@/components/blocks/HeroSideBg";
import AccentText from "@/components/text/AccentText";
import IconMasonry, { Slide } from "@/components/blocks/IconMasonry";
import { useWaitlistModal } from "@/components/Waitlist";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import FeaturesGrid, { Feature } from "@/components/blocks/FeaturesGrid";
import FeatureBoxes from "@/components/blocks/FeatureBoxes";
import TextType from "@/components/text/TextType";
import {
  MessageSquare,
  Mic,
  Image as ImgIcon,
  Brush,
  Code2,
  Search,
  FunctionSquare,
  Workflow,
} from "lucide-react";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
import LetterGlitch2 from "@/components/unisection/LetterGlitch2";
import Squares from "@/components/unisection/Squares";
import LightRays from "@/components/unisection/LightRays";
import Wallpaper from "@/components/unisection/Wallpaper";
import Aurora from "@/components/unisection/Aurora";
import TransparentBox from "@/components/blocks/TransparentBox";
import dicts from "./locale";

export default function Page() {
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;
  const { openWaitlist } = useWaitlistModal();

  const FEATURES_IMAGES = [
    "/pages/node/feature-1.png",
    "/pages/node/feature-2.png",
    "/pages/node/feature-3.png",
  ];

  const COLOR_SCHEMES = {
    phase1: {
      background: "linear-gradient(161.15deg, #e8c47a 12.73%, #c78507 72.95%)",
      colorText: "black",
      colorLine: "white",
      iconColor: "#000000",
    },
    phase2: {
      background: "linear-gradient(161.15deg, #c78507 12.73%, #323232 72.95%)",
      colorText: "white",
      colorLine: "black",
      iconColor: "#ffffff",
    },
    phase3: {
      background: "linear-gradient(161.15deg, #565656 12.73%, #121212 72.95%)",
      colorText: "white",
      colorLine: "primary",
      iconColor: "#f9a729",
    },
  } as const;

  const ICONS = [
    <MessageSquare key="0" />,
    <Mic key="1" />,
    <ImgIcon key="2" />,
    <Brush key="3" />,
    <Search key="4" />,
    <FunctionSquare key="5" />,
    <Code2 key="6" />,
    <Workflow key="7" />,
  ];

  const slides: Slide[] = t.supportedModels.slides.map((s: any, i: number) => {
    const scheme = COLOR_SCHEMES[s.phase as keyof typeof COLOR_SCHEMES];
    const Icon = ICONS[i % ICONS.length];
    return {
      header: s.header,
      text: s.text,
      icon: React.cloneElement(Icon, { color: scheme.iconColor }),
      background: scheme.background,
      colorText: scheme.colorText,
      colorLine: scheme.colorLine,
    };
  });

  // map localized text + local image paths into FeaturesGrid model
  const FEATURES: Feature[] = t.features.map(
    (f: any, i: number): Feature => ({
      title: f.title,
      alt: f.alt,
      description: f.description,
      imageSrc: FEATURES_IMAGES[i],
    })
  );

  return (
    <>
      <Seo {...t.seo} />

      <Unisection>
        <LibGradient color="black" variant={2} />

        <Uniblock
          opacity={[
            [0, 0.75],
            [1, 0.25],
            [2, 0.05],
            [3, 0.03],
            [4, 0.03],
            [5, 0.15],
          ]}
        >
          <Wallpaper
            background="rgba(0,0,0,0)"
            zoom={105}
            posY={6}
            parallax
            src="/pages/node/hero-1.png"
            fit="cover"
            mobileBreakpoint={1024}
            mobileFit="cover"
          />
          <Wallpaper
            background="rgba(0,0,0,0)"
            zoom={105}
            posY={1}
            src="/pages/node/hero-2.png"
            fit="cover"
            mobileBreakpoint={1024}
            mobileFit="cover"
            blendMode="hue"
            blur={2}
            brightness={1}
          />
          <LibGradient color="black" variant={3} />

          <LetterGlitch2
            fontSize={128}
            glitchSpeed={200}
            smoothStep={0.5}
            outerVignette
            centerVignette
            fontFamily="monospace"
            charset="▉▞▚▙▟▛▜▧▨▩▰▱◼◻◾◽◵◴◶◷◢◣⣷⣿◥◤⬢⬣●✱❚❴❵☵☲⚀⛁⛃▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▖▗▘▙▚▛▜▝▥▤▧▨▩◢◣◥◤▲△▼▽▶▷◀◁▸▹◂◃●○◉◎◍◐◑◒◓▪▫⦿⦾≈≋⋮⋯⋰⋱"
            glitchColors={["#f9a729", "#ffe599", "#f6a5a5"]}
          />
          <LetterGlitch2
            fontSize={48}
            glitchSpeed={200}
            smoothStep={0.5}
            outerVignette
            centerVignette
            fontFamily="monospace"
            charset="$ABCDEF0123456789ℝⅆ⅀"
            glitchColors={["#006712", "#12f405", "#dadada"]}
          />
          <Squares speed={0.1} direction="down" squareSize={128} />

          <div className="hero is-fullheight">
            <div className="hero-body"></div>
          </div>
        </Uniblock>

        <div className="hero is-fullheight ">
          <div className="hero-body">
            <div className="">
              <div className="columns">
                <div className="column is-7 ">
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
                        <RLink
                          className="button is-medium  is-outlined is-white"
                          route={R.nodeInstall.href}
                        >
                          {t.hero.ctas.install}
                        </RLink>
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

      <div className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.nodeIntro.header}
              subheader={t.nodeIntro.subheader}
              colorText="black"
              colorLine="white"
            />
            <AccentText as="p" text={t.nodeIntro.p1} />
            <AccentText as="p" text={t.nodeIntro.p2} />
          </div>
        </div>
      </div>

      <Unisection>
        <LightRays raysColor="f9a729" />
        <section className="hero  is-medium">
          <div className="hero-body">
            <div className="container is-max-tablet">
              <UniHeader
                as="h2"
                header={t.howItWorks.header}
                subheader={t.howItWorks.subheader}
                colorText="white"
                colorLine="primary"
              />

              <TransparentBox borderColor="orange" borderVariant={2} radius={25}>
                <HeroSideBg
                  contentCol={6}
                  imageCol={6}
                  imageSrc="/pages/node/about-1.png"
                  imageAlt=""
                >
                  <UniHeader
                    as="h3"
                    header={t.howItWorks.consumer.header}
                    subheader={t.howItWorks.consumer.subheader}
                    colorText="white"
                    colorLine="primary"
                  />
                  <AccentText as="p" text={t.howItWorks.consumer.p} inverted />
                </HeroSideBg>
              </TransparentBox>

              <p className="my-6">{t.howItWorks.narrative1}</p>

              <TransparentBox borderColor="gray" borderVariant={2} radius={25}>
                <HeroSideBg
                  contentCol={6}
                  imageCol={6}
                  imageSrc="/pages/node/about-2.png"
                  imageAlt=""
                  imageRight
                >
                  <UniHeader
                    as="h3"
                    header={t.howItWorks.cloud.header}
                    subheader={t.howItWorks.cloud.subheader}
                    colorText="white"
                    colorLine="primary"
                  />
                  <AccentText as="p" inverted text={t.howItWorks.cloud.p} />
                </HeroSideBg>
              </TransparentBox>

              <p className="my-6">{t.howItWorks.narrative2}</p>

              <TransparentBox borderColor="orange" borderVariant={2} radius={25}>
                <HeroSideBg
                  contentCol={6}
                  imageCol={6}
                  imageSrc="/pages/node/about-3.png"
                  imageAlt=""
                >
                  <UniHeader
                    as="h3"
                    header={t.howItWorks.node.header}
                    subheader={t.howItWorks.node.subheader}
                    colorText="white"
                    colorLine="primary"
                  />
                  <AccentText as="p" inverted text={t.howItWorks.node.p} />
                </HeroSideBg>
              </TransparentBox>

              <div className="mt-6 has-text-centered">
                <h3 className="title is-4 has-text-white mb-4">
                  <span>{t.howItWorks.deeper.title}</span>
                </h3>
                <p className="is-size-6 has-text-white mb-4">
                  {t.howItWorks.deeper.p}
                </p>
                <div className="buttons is-centered">
                  <RLink className="button is-light is-outlined"
                  route={R.cloud.href}>
                    {t.howItWorks.deeper.ctas.cloud}
                  </RLink>
                  <RLink className="button is-light is-outlined " route={R.docs.href}>
                    {t.howItWorks.deeper.ctas.docs}
                  </RLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Unisection>

      <section className="hero has-background-light">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.supportedModels.header}
              subheader={t.supportedModels.subheader}
              colorText="black"
              colorLine="primary"
            />
            <div
              className="tags are-medium is-justify-content-center"
              style={{ gap: "1rem", margin: "1.5rem 0" }}
            >
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-black"
                style={{
                  background:
                    "linear-gradient(161.15deg, #e8c47a 12.73%, #c78507 72.95%)",
                }}
              >
                {t.supportedModels.tags.phase1}
              </span>
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-white"
                style={{
                  background:
                    "linear-gradient(161.15deg, #c78507 12.73%, #323232 72.95%)",
                }}
              >
                {t.supportedModels.tags.phase2}
              </span>
              <span
                className="tag is-rounded has-text-weight-semibold is-family-code has-text-white"
                style={{
                  background:
                    "linear-gradient(161.15deg, #565656 12.73%, #121212 72.95%)",
                }}
              >
                {t.supportedModels.tags.phase3}
              </span>
            </div>

            <IconMasonry slides={slides} columnsDesktop={4} />

            <div className="mt-6 has-text-centered">
              <h3 className="title is-4 has-text-black-ter mb-4">
                <span>{t.supportedModels.tryAll.title}</span>
              </h3>
              <p className="is-size-6 has-text-black-ter mb-4">
                {t.supportedModels.tryAll.p}
              </p>
              <div className="buttons is-centered">
                <RLink route={R.nodeInstall.href} className="button is-medium is-rounded is-primary ">
                  {t.supportedModels.tryAll.cta}
                </RLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Unisection opacity={[[0, 0.3]]}>
        <Aurora colorStops={["#f9a729", "#ffffff", "#f9a728"]} />
        <section className="hero ">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered is-variable is-6">
                <div className="column is-6 has-text-centered">
                  <div
                    className="image is-fullwidth"
                    style={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}
                  >
                    <Image
                      src="/pages/node/ideology.png"
                      alt="Node Ideology"
                      width={100}
                      height={100}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                </div>
                <div className="column is-6">
                  <UniHeader
                    as="h2"
                    header={t.ideology.header}
                    subheader={t.ideology.subheader}
                    colorText="white"
                    colorLine="primary"
                  />
                  <AccentText as="p" inverted text={t.ideology.p} />
                  <div className="is-flex is-align-items-center">
                    <p className="is-size-6 has-text-primary mr-3">
                      {t.ideology.biggerIdea.hint}
                    </p>
                    <RLink route={R.vision.href} className="button is-white ">
                      {t.ideology.biggerIdea.cta}
                    </RLink>
                  </div>
                </div>
              </div>

              <FeatureBoxes
                items={t.ideology.features}
                layout="grid"
                variant="dark"
                columnsDesktop={2}
                hoverLift
                dense={false}
              />
            </div>
          </div>
        </section>
      </Unisection>

      <section className="hero is-white ">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.designPrinciples.header}
              subheader={t.designPrinciples.subheader}
              colorText="black"
              colorLine="primary"
            />
            <FeaturesGrid features={FEATURES} />
          </div>
        </div>
      </section>

      <section className="hero is-primary ">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h3"
              header={t.dashboard.header}
              subheader={t.dashboard.subheader}
              colorText="black"
              colorLine="white"
            />
            <div className="columns mb-6">
              <div className="column">
                <AccentText
                  as="p"
                  className="is-size-5-desktop"
                  text={t.dashboard.col1}
                />
              </div>
              <div className="column">
                <AccentText
                  as="p"
                  className="is-size-5-desktop"
                  text={t.dashboard.col2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero is-black is-medium">
        <div className="hero-body">
          <div className="container">
            <HeroSideBg
              contentCol={7}
              imageCol={5}
              imageSrc="/pages/node/swarming.png"
              imageRight
              imageAlt=""
              inverted
            >
              <div className="has-text-white">
                <h3 className="title is-3 mb-2">
                  <span className="is-hidden-touch">
                    <TextType
                      text={t.swarm.words}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={false}
                      cursorCharacter="#"
                    />
                    <span className="has-text-primary">{t.swarm.suffix}</span>
                  </span>
                  <span className="is-hidden-desktop is-block">
                    <TextType
                      text={t.swarm.words}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={false}
                      cursorCharacter="#"
                    />
                    <span className="has-text-primary">ing</span>
                  </span>
                  <span className="is-hidden-desktop is-block has-text-primary is-size-3">
                    {t.swarm.suffix}
                  </span>
                </h3>

                <AccentText
                  inverted
                  as="p"
                  className="is-size-5-desktop"
                  text={t.swarm.p1}
                />
                <AccentText
                  as="p"
                  inverted
                  className="is-size-5-desktop"
                  text={t.swarm.p2}
                />
              </div>
            </HeroSideBg>
          </div>
        </div>
      </section>

      <section className="hero is-small is-light">
        <div className="hero-body">
          <div className="containter is-max-desktop has-text-centered">
            <h3 className="title is-4 has-text-black mb-4">
              <span>{t.ready.header}</span>
            </h3>
            <p className="is-size-6 has-text-dark mb-4">{t.ready.p}</p>
            <div className="buttons is-centered">
              <button onClick={openWaitlist} className="button is-primary">{t.ready.cta}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
