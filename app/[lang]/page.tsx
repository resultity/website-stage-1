// app/[lang]/page.tsx

"use client";

import React from "react";
import Seo from "@/components/seo";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import Unisection from "@/components/Unisection";
import Particles from "@/components/unisection/Particles";
import MicroTerminal from "./MicroTerminal";
import Wallpaper from "@/components/unisection/Wallpaper";
import Uniblock from "@/components/Uniblock";
import { LibGradient } from "@/components/unisection/LibGradient";
import UniHeader from "@/components/blocks/Uniheader";
import AccentText from "@/components/text/AccentText";
import PixelBlast from "@/components/unisection/PixelBlast";
import CountUp from "@/components/text/CountUp";
import Prism from "@/components/unisection/Prism";
import Squares from "@/components/unisection/Squares";
import IconCard from "@/components/blocks/IconCard";
import Dictionary from "./Dictionary";
import {
  Play,
  Activity,
  AppWindow,
  BookOpenText,
  Network,
  Cloud,
  ArrowDownRight,
  Cpu,
  ArrowUpRight,
  Coins,
} from "lucide-react";
import HeroSideBg from "@/components/blocks/HeroSideBg";
import TextType from "@/components/text/TextType";
import GlitchText from "@/components/text/GlitchText";
import Gradient from "@/components/unisection/Gradient";
import { IconBrandTelegram, IconBrandX } from "@tabler/icons-react";
import { useWaitlistModal } from "@/components/Waitlist";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
import { useLang } from "@/components/locale";
import dicts from "./locale";
import LightRays from "@/components/unisection/LightRays";

export default function NodePage() {
  const { openWaitlist } = useWaitlistModal();
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  return (
    <>
      {/* SEO driven by locale, same pattern as Vision */}
      <Seo {...t.seo} />

      <Unisection
        opacity={[
          [0, 0.8],
          [1, 0.15],
          [2, 0.25],
          [3, 0.5],
        ]}
      >
        <Prism hueShift={-0.25} />
        <LibGradient color="black" variant={3} />
        <Squares squareSize={256} direction="down" speed={0.1} />
        <LightRays raysColor="#f9a729" />
        <section
          className="hero is-fullheight-with-navbar is-primary"
          style={{ background: "transparent" }}
        >
          <div className="hero-body is-align-items-center is-justify-content-center has-text-centered">
            <div className="container is-max-tablet">
              <UniHeader
                align="center"
                as="h1"
                header={t.hero.h1}
                subheader={t.hero.sub}
                colorText="white"
                colorLine="primary"
              />

              <div className="content">
                <p className="is-size-6 is-family-monospace has-text-light">
                  {t.hero.smallLine1}
                  <br />
                  {t.hero.smallLine2}
                </p>
              </div>

              <div className="buttons is-centered">
                <a onClick={openWaitlist} className="button is-primary">
                  <Play className="mr-1" /> {t.hero.ctaWaitlist}
                </a>
                <RLink route={R.docs.href} className="button is-white">
                  <BookOpenText className="mr-1" /> {t.hero.ctaDocs}
                </RLink>
              </div>
            </div>
          </div>
        </section>
      </Unisection>

      <section className="hero is-small is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered has-text-centered pt-3 pb-3 my-3">
              {/* Discount */}
              <div className="column is-3 is-hidden-touch">
                <span className="is-size-5 is-family-secondary has-text-uppercase">
                  {t.kpis.cheaperLabel}
                </span>
                <p className="is-size-1 has-font-weight-extrabold has-text-black">
                  ~
                  <CountUp
                    from={0}
                    to={80}
                    separator=","
                    direction="up"
                    duration={1.2}
                    className="count-up-text"
                  />
                  %
                </p>
                <span className="is-size-6 is-family-monospace">
                  {t.kpis.cheaperSuffix}
                </span>
              </div>

              <div className="column is-6 has-text-centered">
                <span className="is-size-5 is-family-secondary has-text-uppercase">
                  {t.kpis.withResultity}
                </span>

                <div
                  className="is-size-1 has-font-weight-extrabold has-text-black "
                  style={{ display: "block" }}
                >
                  &nbsp;
                  <TextType
                    text={t.hero.rotator}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    color="#000000"
                  />
                  &nbsp;
                </div>

                <span className="is-size-6 is-family-monospace">
                  {t.kpis.forEveryInference}
                </span>
              </div>

              {/* Discount (mobile) */}
              <div className="column is-3 is-hidden-desktop">
                <span className="is-size-5 is-family-secondary has-text-uppercase">
                  {t.kpis.cheaperLabel}
                </span>
                <p className="is-size-1 has-font-weight-extrabold has-text-black">
                  ~
                  <CountUp
                    from={0}
                    to={80}
                    separator=","
                    direction="up"
                    duration={1.2}
                    className="count-up-text"
                  />
                  %
                </p>
                <span className="is-size-6 is-family-monospace">
                  {t.kpis.cheaperSuffix}
                </span>
              </div>

              {/* Open-source models */}
              <div className="column is-3">
                <span className="is-size-5 is-family-secondary">
                  {t.kpis.modelPortfolio}
                </span>
                <p className="is-size-1 has-font-weight-extrabold has-text-black">
                  ≥
                  <CountUp
                    from={0}
                    to={50}
                    separator=","
                    direction="up"
                    duration={1.2}
                    className="count-up-text"
                  />
                </p>
                <span className="is-size-6 is-family-monospace">
                  {t.kpis.openSourceFamilies}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Unisection
        opacity={[
          [0, 0.55],
          [1, 0.25],
        ]}
      >
        <LibGradient color="black" variant={3} />
        <Squares squareSize={256} direction="down" speed={0.1} />
        <section className="hero is-medium" style={{ overflow: "hidden" }}>
          <div className="hero-body ">
            <div className="columns ">
              <div className="column is-4">
                <UniHeader
                  as="h2"
                  header={t.whatIs.header}
                  subheader={t.whatIs.subheader}
                  colorText="white"
                  colorLine="primary"
                />
              </div>
              <div className="column is-7 is-offset-1">
                <Dictionary />
              </div>
            </div>
          </div>
        </section>
      </Unisection>

      <div className="has-background-light">
        <Unisection
          opacity={[
            [0, 0.05],
            [1, 0.1],
            [2, 0.25],
          ]}
        >
          <Wallpaper
            background="rgba(0,0,0,0)"
            zoom={105}
            posY={1}
            parallax
            parallaxStrength={10}
            fit="cover"
            mobileBreakpoint={1024}
            blur={1}
            mobileFit="cover"
            src="/pages/main/build-2.png"
          />
          <Wallpaper
            background="rgba(0,0,0,0)"
            zoom={105}
            posY={1}
            fit="cover"
            mobileBreakpoint={1024}
            mobileFit="cover"
            blendMode="hue"
            blur={1}
            brightness={1}
            src="/pages/main/build-1.png"
          />
          <Squares squareSize={256} direction="down" speed={0.1} />
          <section className="hero is-medium">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-vcentered">
                  <div className="column">
                    <UniHeader
                      as="h2"
                      header={t.buildCloud.header}
                      subheader={t.buildCloud.subheader}
                      colorText="black"
                      colorLine="primary"
                    />

                    <div className="content mt-5">
                      <AccentText as="p" text={t.buildCloud.bullets.swap} />
                      <AccentText
                        as="p"
                        text={t.buildCloud.bullets.openaiCompat}
                      />
                      <AccentText
                        as="p"
                        text={t.buildCloud.bullets.syncAsync}
                      />
                      <AccentText
                        as="p"
                        text={t.buildCloud.bullets.overModels}
                      />
                      <AccentText as="p" text={t.buildCloud.bullets.payg} />
                      <AccentText as="p" text={t.buildCloud.bullets.noLockin} />

                      <RLink
                        route={R.cloud.href}
                        className="button is-black is-outlined is-medium"
                      >
                        {t.buildCloud.bullets.exploreCloudBtn}
                      </RLink>
                    </div>
                  </div>
                  <div className="column is-5-desktop is-offset-1-desktop">
                    <MicroTerminal />

                    <p className="is-size-7 has-text-black px-6 mt-4 mb-4 has-text-centered">
                      {t.buildCloud.bullets.microNote}
                    </p>
                    <div className="buttons is-centered">
                      <RLink
                        route={R.docsAPI.href}
                        className="button is-underlined  is-primary is-small "
                      >
                        {t.buildCloud.bullets.readDocsBtn}
                      </RLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Unisection>
      </div>

      <Unisection>
        <PixelBlast
          variant="circle"
          pixelSize={16}
          color="#f9a729"
          patternScale={223}
        />
        <section className="hero is-small pt-6 ">
          <div className="hero-body">
            <GlitchText
              speed={1}
              enableShadows={true}
              enableOnHover={true}
              className="custom-class"
            >
              {t.flow.title}
            </GlitchText>

            <div className="columns is-multiline is-variable ">
              <div className="column is-6-tablet is-3-desktop ">
                <IconCard
                  icon={<Cloud />}
                  title={t.flow.cards.userApp.title}
                  className="has-background-grey-darker"
                >
                  <p>
                    <strong>{t.flow.cards.userApp.p1.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.userApp.p1.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.userApp.p2.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.userApp.p2.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.userApp.p3.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.userApp.p3.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.userApp.p4.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.userApp.p4.split(". ").slice(1).join(". ")}
                  </p>
                </IconCard>
                <div className="has-text-right is-hidden-touch is-hidden-table">
                  <ArrowDownRight size={96} />
                </div>
              </div>

              <div className="column is-6-tablet is-3-desktop">
                <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                <div className="has-text-right is-hidden-touch is-hidden-table">
                  <ArrowUpRight size={96} />
                </div>
                <IconCard
                  icon={<Network />}
                  title={t.flow.cards.coordination.title}
                  className="has-background-grey-darker"
                >
                  <p>
                    <strong>
                      {t.flow.cards.coordination.p1.split(".")[0]}.
                    </strong>{" "}
                    {t.flow.cards.coordination.p1
                      .split(". ")
                      .slice(1)
                      .join(". ")}
                  </p>
                  <p>
                    <strong>
                      {t.flow.cards.coordination.p2.split(".")[0]}.
                    </strong>{" "}
                    {t.flow.cards.coordination.p2
                      .split(". ")
                      .slice(1)
                      .join(". ")}
                  </p>
                  <p>
                    <strong>
                      {t.flow.cards.coordination.p3.split(".")[0]}.
                    </strong>{" "}
                    {t.flow.cards.coordination.p3
                      .split(". ")
                      .slice(1)
                      .join(". ")}
                  </p>
                  <p>
                    <strong>
                      {t.flow.cards.coordination.p4.split(".")[0]}.
                    </strong>{" "}
                    {t.flow.cards.coordination.p4
                      .split(". ")
                      .slice(1)
                      .join(". ")}
                  </p>
                </IconCard>
              </div>

              <div className="column is-6-tablet is-3-desktop">
                <IconCard
                  icon={<Cpu />}
                  title={t.flow.cards.nodeExec.title}
                  className="has-background-grey-darker"
                >
                  <p>
                    <strong>{t.flow.cards.nodeExec.p1.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.nodeExec.p1.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.nodeExec.p2.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.nodeExec.p2.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.nodeExec.p3.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.nodeExec.p3.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.nodeExec.p4.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.nodeExec.p4.split(". ").slice(1).join(". ")}
                  </p>
                </IconCard>
                <div className="has-text-right is-hidden-touch is-hidden-table">
                  <ArrowDownRight size={96} />
                </div>
              </div>

              <div className="column is-6-tablet is-3-desktop">
                <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                <IconCard
                  icon={<Coins />}
                  title={t.flow.cards.response.title}
                  className="has-background-grey-darker"
                >
                  <p>
                    <strong>{t.flow.cards.response.p1.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.response.p1.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.response.p2.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.response.p2.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.response.p3.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.response.p3.split(". ").slice(1).join(". ")}
                  </p>
                  <p>
                    <strong>{t.flow.cards.response.p4.split(".")[0]}.</strong>{" "}
                    {t.flow.cards.response.p4.split(". ").slice(1).join(". ")}
                  </p>
                </IconCard>
              </div>
            </div>
          </div>
        </section>
      </Unisection>

      <Unisection opacity={[[0, 0.1]]}>
        <PixelBlast
          variant="triangle"
          pixelSize={24}
          color="#719fe6ff"
          patternScale={223}
        />
        <section>
          <HeroSideBg
            imageSrc="/pages/main/roadmap.png"
            imageAlt="Roadmap"
            contentCol={6}
            imageCol={6}
            inverted
          >
            <ThreeDFrame variant={4}>
              <Uniblock opacity={[[1, 0.05]]}>
                <LibGradient color="black" variant={3} />
                <LibGradient color="yellow" variant={1} />
                <div className="p-6">
                  <UniHeader
                    as="h2"
                    header={t.roadmap.header}
                    subheader={t.roadmap.subheader}
                    colorText="white"
                    colorLine="primary"
                  />

                  <div className=" mt-5">
                    <AccentText inverted as="p" text={t.roadmap.bullets.now} />
                    <AccentText inverted as="p" text={t.roadmap.bullets.next} />
                    <AccentText
                      inverted
                      as="p"
                      text={t.roadmap.bullets.later}
                    />
                  </div>

                  <div className="buttons mt-5">
                    <RLink
                      route={R.roadmap.href}
                      className="button  is-rounded is-white"
                    >
                      {t.roadmap.viewBtn}
                    </RLink>
                  </div>
                </div>
              </Uniblock>
            </ThreeDFrame>
          </HeroSideBg>
        </section>
      </Unisection>

      <Unisection opacity={[[0, 0.4]]}>
        <Gradient variant="dark"></Gradient>
        <Particles />
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="">
              <UniHeader
                as="h2"
                header={t.contribute.header}
                subheader={t.contribute.subheader}
                colorText="white"
                colorLine="primary"
              />
              <div className="columns has-text-centered is-gap-6 is-multiline">
                <div className="column is-12-tablet is-3-desktop">
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="box p-6">
                    <UniHeader
                      as="h3"
                      header={t.contribute.follow.header}
                      subheader={t.contribute.follow.sub}
                      colorText="white"
                      colorLine="white"
                      align="center"
                    />
                    <div className="buttons is-centered">
                      <RLink
                        className="button is-white is-outlined"
                        route={R.x.href}
                      >
                        <span className="icon is-small mr-4">
                          <IconBrandX />
                        </span>
                        {t.contribute.follow.newsBtn}
                      </RLink>
                      <RLink
                        className="button is-white is-outlined"
                        route={R.tg.href}
                      >
                        <span className="icon is-small mr-4">
                          <IconBrandTelegram />
                        </span>
                        {t.contribute.follow.communityBtn}
                      </RLink>
                    </div>
                  </div>
                </div>

                <div className="column is-12-tablet is-3-desktop">
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="is-hidden-touch is-hidden-table pt-6 pb-6 mt-6 mb-6" />
                  <div className="box p-6">
                    <UniHeader
                      as="h3"
                      header={t.contribute.promote.header}
                      subheader={t.contribute.promote.sub1}
                      colorText="white"
                      colorLine="primary"
                      align="center"
                    />
                    <p className="is-size-6 has-text-white mb-3">
                      {t.contribute.promote.sub1}
                    </p>
                    <p className="is-size-6 has-text-white mb-6">
                      {t.contribute.promote.sub2}
                    </p>

                    <div className="buttons is-centered">
                      <RLink
                        route={R.testnet.href}
                        className="button is-primary is-outlined"
                      >
                        <span className="icon is-small mr-4">
                          <Activity />
                        </span>
                        {t.contribute.promote.aboutTestnetBtn}
                      </RLink>
                    </div>
                  </div>
                </div>
                <div className="column is-12-tablet is-4-desktop">
                  <div className="box p-6">
                    <UniHeader
                      as="h3"
                      header={t.contribute.power.header}
                      subheader={t.contribute.power.sub}
                      colorText="primary"
                      colorLine="primary"
                      align="center"
                    />
                    <AccentText
                      inverted
                      as="p"
                      text={t.contribute.power.text}
                    />
                    <div className="buttons is-centered">
                      <button
                        onClick={openWaitlist}
                        className="button is-primary "
                      >
                        <span className="icon is-small mr-4">
                          <Play />
                        </span>
                        {t.contribute.power.waitlistBtn}
                      </button>
                      <RLink route={R.node.href} className="button is-white ">
                        <span className="icon is-small mr-4">
                          <AppWindow />
                        </span>
                        {t.contribute.power.nodeBtn}
                      </RLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Unisection>
    </>
  );
}
