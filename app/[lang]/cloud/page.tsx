"use client";
import { useLang } from "@/components/locale";
import Seo from "@/components/seo";
import React from "react";
import Unisection from "@/components/Unisection";
import UniHeader from "@/components/blocks/Uniheader";
import AccentText from "@/components/text/AccentText";
import FeaturesGrid from "@/components/blocks/FeaturesGrid";
import FeatureBoxes from "@/components/blocks/FeatureBoxes";
import ThreeDFrame from "@/components/blocks/ThreeDFrame";
import { Code2, Database, AppWindow, Building2, Workflow, Mic } from "lucide-react";
import { LibGradient } from "@/components/unisection/LibGradient";
import LightRays from "@/components/unisection/LightRays";
import Aurora from "@/components/unisection/Aurora";
import MultiTerminalLight from "./MultiTerminalLight";
import dicts from "./locale";
import { useWaitlistModal } from "@/components/Waitlist";
import RLink from "@/components/rlink";
import { ROUTES as R } from "@/app/routes";
import Image from "next/image";
export default function Page() {
  const { openWaitlist } = useWaitlistModal();
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;


  const USER_IMAGES = [
    "/pages/cloud/users-1.png",
    "/pages/cloud/users-2.png",
    "/pages/cloud/users-3.png",
  ];
  const CLOUD_USER_CATEGORIES = t.users.features.map((f: any, i: number) => ({
    ...f,
    imageSrc: USER_IMAGES[i] || USER_IMAGES[0],
  }));

  const decentralizedFeatures = t.decentralized.items;

const useCaseIcons = [
  <Code2 key="code" color="#f9a729" />,
  <Database key="db" color="#f9a729" />,
  <AppWindow key="app" color="#f9a729" />,
  <Building2 key="building" color="#f9a729" />,
  <Workflow key="workflow" color="#f9a729" />,
  <Mic key="mic" color="#f9a729" />,
];


  return (
    <>
      <Seo {...t.seo} />

      <Unisection opacity={[[0, 0.7]]}>
        <LightRays raysColor="f9a729" />
        <div className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="">
              <div className="columns">
                <div className="column is-5 ">
                  <div className="py-6 px-1">
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
                        const target = document.getElementById("usecases");
                        if (!target) return;
                        const navbar = document.querySelector(".navbar") as HTMLElement | null;
                        const offset = navbar ? navbar.offsetHeight : 0;
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: "smooth" });
                      }}
                    >
                      {t.hero.ctaSavings}
                    </button>
                  </div>
                </div>

                <div className="column is-5 is-offset-1 cutx">
                  <ThreeDFrame variant={5}>
                    <MultiTerminalLight />
                  </ThreeDFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Unisection>

      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="pb-6 pt-6">
              <UniHeader
                as="h2"
                header={t.dropin.header}
                subheader={t.dropin.subheader}
                colorText="black"
                colorLine="white"
              />

              <div className="columns">
                <div className="column">
                  <AccentText as="p" text={t.dropin.p1} />
                </div>
                <div className="column">
                  <AccentText as="p" text={t.dropin.p2} />
                </div>
              </div>

              <div className="pt-6 ">
                <FeaturesGrid features={CLOUD_USER_CATEGORIES} />
              </div>
            </div>

            <div className="mt-3 has-text-centered">
              <h3 className="title is-4 has-text-black mb-4">
                <span>{t.users.deeperTitle}</span>
              </h3>
              <p className="is-size-6 has-text-black mb-4">{t.users.deeperText}</p>
              <div className="buttons is-centered">
                <RLink route={R.node.href} className="button is-black is-outlined">{t.users.deeperCtas.nodes}</RLink>
                <RLink route={R.docs.href} className="button is-black is-outlined ">{t.users.deeperCtas.docs}</RLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero  is-light cutx">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.tableCompare.header}
              subheader={t.tableCompare.subheader}
              colorText="black"
              colorLine="primary"
            />

            <div className="table-container">
              <table className="table comparison-table is-narrow is-fullwidth">
                <thead>
                  <tr>
                    <th className="is-size-6 is-size-7-mobile">{t.tableCompare.headings.criterion}</th>
                    <th className="is-size-6 is-size-7-mobile">{t.tableCompare.headings.resultity}</th>
                    <th className="is-size-6 is-size-7-mobile">{t.tableCompare.headings.centralized}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["cost", "success", "danger"],
                    ["migration", "success", "danger"],
                    ["resilience", "success", "warning"],
                    ["latency", "warning", "link"],
                    ["streaming", "warning", "warning"],
                    ["observability", "warning", "warning"],
                  ].map(([key, rtTagClass, czTagClass]) => {
                    const row = (t.tableCompare.rows as any)[key];
                    const tags = t.tableCompare.tags as any;
                    const rtText = tags[row.rtTag];
                    const czText = tags[row.czTag];
                    return (
                      <tr key={key as string}>
                        <td className="has-text-weight-semibold">{row.criterion}</td>
                        <td>
                          {row.rt}
                          <span className={`tag is-${rtTagClass} is-light ml-2`}>{rtText}</span>
                        </td>
                        <td>
                          {row.cz}
                          <span className={`tag is-${czTagClass} is-light ml-2`}>{czText}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      <section className="hero is-medium" id="usecases">
        <div className="hero-body">
          <div className="container">
            <UniHeader
              as="h2"
              header={t.usecases.header}
              subheader={t.usecases.subheader}
              colorText="white"
              colorLine="primary"
            />

            <div className="columns is-variable is-multiline mt-5">
              {t.usecases.cards.map((card: any, i: number) => (
                <div className="column is-6-tablet is-4-desktop is-flex" key={i}>
                  <div className="card is-flex is-flex-direction-column is-flex-grow-1">
                    <div className="card-content">
                      <div className="is-flex is-align-items-center mb-3">
                        <span className="mr-3">{useCaseIcons[i]}</span>
                        <h4 className="title is-5">{card.title}</h4>
                      </div>
                      <ul className="has-text-grey-light">
                        <li><strong>{card.bullets.who.split(":")[0]}:</strong> {card.bullets.who.split(":").slice(1).join(":").trim()}</li>
                        <li><strong>{card.bullets.where.split(":")[0]}:</strong> {card.bullets.where.split(":").slice(1).join(":").trim()}</li>
                        <li><strong>{card.bullets.tools.split(":")[0]}:</strong> {card.bullets.tools.split(":").slice(1).join(":").trim()}</li>
                        <li><strong>{card.bullets.keyFeatures.split(":")[0]}:</strong> {card.bullets.keyFeatures.split(":").slice(1).join(":").trim()}</li>
                      </ul>
                      <p className="has-text-grey-light mt-2">{card.paragraph}</p>
                      <p className="has-text-weight-bold is-size-5 mt-3">{card.savingTag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" has-text-centered  mt-6">
              <p className="is-size-6 has-text-white is-family-secondary mb-4">
                {t.usecases.ctaBlock.prompt}
              </p>
              <div className="buttons is-centered">
                <button onClick={openWaitlist} className="button is-primary is-medium">{t.usecases.ctaBlock.cta}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Unisection>
        <LibGradient color="gray" variant={3}></LibGradient>
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="container is-max-tablet">
              <UniHeader
                as="h2"
                header={t.evolution.header}
                subheader={t.evolution.subheader}
                colorText="black"
                colorLine="white"
              />

              <div className="timeline mt-6">
                {t.evolution.steps.map((s: any, i: number) => (
                  <div className="media mb-6" key={i}>
                    <div className="media-left">
                      <span className={`tag ${i === 0 ? "is-black" : i === 1 ? "is-dark" : "is-primary"} is-medium`}>
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="media-content">
                      <UniHeader
                        as="h3"
                        header={s.header}
                        subheader={s.subheader}
                        colorText="black"
                        colorLine={i === 2 ? "primary" : i === 1 ? "white" : "black"}
                      />
                      <AccentText as="p" text={s.bullets} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="box has-text-centered has-background-black-ter mt-6">
                <p className="is-size-6 has-text-white is-family-secondary mb-4">
                  {t.evolution.box.lead}
                </p>
                <div className="buttons is-centered">
                  <RLink route={R.roadmap.href} className="button is-white is-outlined">{t.evolution.box.cta}</RLink>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Unisection>

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
                        src="/pages/cloud/decentralization.png"
                        alt="Supported Model Families"
                        
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={false}
                        width={100}
                        height={100}
                      />
                    </div>
                </div>
                <div className="column is-6">
                  <UniHeader
                    as="h2"
                    header={t.migration.header}
                    subheader={t.migration.subheader}
                    colorText="white"
                    colorLine="primary"
                  />
                  <AccentText as="p" inverted text={t.migration.p} />

                  <div className="is-flex is-align-items-center">
                    <p className="is-size-6 has-text-primary mr-3">
                      {t.migration.ctaLead}
                    </p>
                    <RLink route={R.vision.href} className="button is-white ">{t.migration.ctaButton}</RLink>
                  </div>
                </div>
              </div>

              <FeatureBoxes
                items={decentralizedFeatures}
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

      <section className="section p-0 overflow-hidden-mobile">
        <div className="columns is-gapless is-flex-desktop is-flex-direction-row-desktop">
          <div className="column is-flex">
            <div className="hero is-white is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.engage.left.header}
                    subheader={t.engage.left.subheader}
                    colorText="black"
                    colorLine="primary"
                  />
                  <div className="content mt-5">
                    {t.engage.left.paragraphs.map((p: string, i: number) => (
                      <AccentText key={i} as="p" text={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-flex">
            <div className="hero is-primary is-medium">
              <div className="hero-body">
                <div className="container">
                  <UniHeader
                    as="h2"
                    header={t.engage.right.header}
                    subheader={t.engage.right.subheader}
                    colorText="black"
                    colorLine="white"
                  />

                  <div className="content mt-5">
                    {t.engage.right.paragraphs.map((p: string, i: number) => (
                      <AccentText key={i} as="p" text={p} />
                    ))}
                  </div>
                  <p className="is-size-6 has-text-grey-dark mb-4">{t.engage.right.note}</p>

                  <div className="buttons mt-5">
                    <button onClick={openWaitlist} className="button is-black is-outlined is-medium">{t.engage.right.cta}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .cutx { overflow-x: hidden; }
        }
      `}</style>
    </>
  );
}
