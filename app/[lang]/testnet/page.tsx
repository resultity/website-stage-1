// app/[lang]/testnet/page.tsx
"use client";

import Hero from "@/app/[lang]/testnet/Hero";
import UniHeader from "@/components/blocks/Uniheader";
import AccentText from "@/components/text/AccentText";
import TransparentBox from "@/components/blocks/TransparentBox";
import Uniblock from "@/components/Uniblock";
import RCPStreamer from "@/components/unisection/RCPStreamer";
import HeroSideBg from "@/components/blocks/HeroSideBg";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
import { useLang } from "@/components/locale";
import dicts from "./locale";
import Seo from "@/components/seo";
import { useWaitlistModal } from "@/components/Waitlist";

export default function TestnetPage() {
  const { openWaitlist } = useWaitlistModal();
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  return (
    <>
      <Seo {...t.seo} />
      <Hero />

      {/* About / Goals */}
      <section className="hero is-primary is-fullheight" id="about-testnet">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-align-stretch">
              <div className="column is-flex is-flex-direction-column is-7">
                <div className="box is-flex-grow-1 is-fullwidth">
                  <div className="p-6">
                    <UniHeader
                      as="h2"
                      header={t.about.header}
                      subheader={t.about.subheader}
                      colorText="white"
                      colorLine="white"
                    />
                    {t.about.lines.map((line: string, i: number) => (
                      <AccentText key={i} as="p" text={line} inverted />
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="column is-flex is-flex-direction-column is-5">
                <Uniblock>
                  <RCPStreamer />
                  <div className=" is-flex-grow-1 p-6 is-fullwidth">
                    <UniHeader
                      as="h3"
                      header={t.benefits.header}
                      subheader={t.benefits.subheader}
                      colorText="black"
                      colorLine="black"
                      align="left"
                    />
                    <AccentText as="p" text={t.benefits.p1} />
                    <AccentText as="p" text={t.benefits.p2} />
                    <button
                      className="button is-outlined is-black is-large is-rounded"
                      onClick={() => {
                        const target = document.getElementById("rcp");
                        if (!target) return;
                        const navbar = document.querySelector(".navbar") as HTMLElement | null;
                        const offset = navbar ? navbar.offsetHeight : 0;
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: "smooth" });
                      }}
                    >
                      {t.benefits.btnMoreRCP}
                    </button>
                  </div>
                </Uniblock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Node */}
      <section className="hero is-medium is-black" id="node">
        <div className="hero-body">
          <div className="container ">
            <TransparentBox borderColor="yellow" borderVariant={2} radius={25}>
              <HeroSideBg
                contentCol={8}
                imageCol={4}
                imageSrc="/pages/testnet/node.png"
                imageAlt=""
                imageRight
                inverted
              >
                <UniHeader
                  as="h2"
                  header={t.node.header}
                  subheader={t.node.subheader}
                  colorText="white"
                  colorLine="primary"
                />
                <div className="columns">
                  <div className="column">
                    <AccentText as="p" text={t.node.p1} inverted />
                    <AccentText as="p" text={t.node.p2} inverted />
                  </div>
                  <div className="column">
                    <AccentText as="p" text={t.node.p3} inverted />
                    <RLink route={R.nodeInstall.href} className="button is-rounded is-medium is-white is-outlined">
                      {t.node.btnInstall}
                    </RLink>
                  </div>
                </div>
              </HeroSideBg>
            </TransparentBox>
          </div>
        </div>
      </section>

      {/* Cloud */}
      <section className="hero is-medium" id="cloud">
        <div className="hero-body">
          <div className="container ">
            <TransparentBox borderColor="orange" borderVariant={2} radius={25}>
              <HeroSideBg
                contentCol={8}
                imageCol={4}
                imageSrc="/pages/testnet/cloud.png"
                imageAlt=""
                inverted
              >
                <UniHeader
                  as="h2"
                  header={t.cloud.header}
                  subheader={t.cloud.subheader}
                  colorText="white"
                  colorLine="primary"
                />
                <div className="columns">
                  <div className="column">
                    <AccentText as="p" text={t.cloud.p1} inverted />
                  </div>
                  <div className="column">
                    <AccentText as="p" text={t.cloud.p2} inverted />
                    <RLink route={R.cloud.href} className="button is-rounded is-medium is-white is-outlined">
                      {t.cloud.btnAboutCloud}
                    </RLink>
                  </div>
                </div>
              </HeroSideBg>
            </TransparentBox>
          </div>
        </div>
      </section>

      {/* Affiliate / Platform */}
      <section className="hero is-medium is-black" id="affiliate-program">
        <div className="hero-body">
          <div className="container ">
            <TransparentBox borderColor="yellow" borderVariant={2} radius={25}>
              <HeroSideBg
                contentCol={8}
                imageCol={4}
                imageSrc="/pages/testnet/ref.png"
                imageAlt=""
                imageRight
                inverted
              >
                <UniHeader
                  as="h2"
                  header={t.affiliate.header}
                  subheader={t.affiliate.subheader}
                  colorText="white"
                  colorLine="primary"
                />
                <div className="columns">
                  <div className="column">
                    <AccentText as="p" text={t.affiliate.p1} inverted />
                    <AccentText as="p" text={t.affiliate.p2} inverted />
                  </div>
                  <div className="column">
                    <AccentText as="p" text={t.affiliate.p3} inverted />
                  </div>
                </div>
              </HeroSideBg>
            </TransparentBox>
          </div>
        </div>
      </section>

      {/* RCP + Join */}
      <section className="section p-0 overflow-hidden-mobile has-background-primary" id="rcp">
        <div className="columns is-gapless is-flex-desktop is-flex-direction-row-desktop is-vcentered">
          {/* Left: RCP explanation */}
          <div className="column is-8 is-flex">
            <div className="hero is-white is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.rcp.header}
                    subheader={t.rcp.subheader}
                    colorText="black"
                    colorLine="primary"
                  />

                  <div className="columns mt-5 is-variable is-6">
                    <div className="column">
                      <div className="content">
                        {t.rcp.c1.map((p: string, i: number) => (
                          <AccentText key={i} as="p" text={p} />
                        ))}
                      </div>
                    </div>

                    <div className="column">
                      <div className="content">
                        {t.rcp.c2.map((p: string, i: number) => (
                          <AccentText key={i} as="p" text={p} />
                        ))}
                      </div>
                    </div>

                    <div className="column">
                      <div className="content">
                        {t.rcp.c3.map((p: string, i: number) => (
                          <AccentText key={i} as="p" text={p} />
                        ))}
                        <RLink route={R.docsRCP.href} className="button is-rounded is-medium is-black is-outlined">
                          {t.rcp.btnMoreRCP}
                        </RLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Join block */}
          <div className="column is-4 is-flex pt-6 pb-6">
            <div className="hero is-primary is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.join.header}
                    subheader={t.join.subheader}
                    colorText="black"
                    colorLine="white"
                  />
                  <div className="content mt-5">
                    <AccentText as="p" text={t.join.p1} />
                    <div className="buttons mt-4">
                      <button onClick={openWaitlist} className="button is-black is-medium is-fullwidth">
                        {t.join.btnJoinWaitlist}
                      </button>
                    </div>
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
