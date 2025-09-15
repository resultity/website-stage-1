"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pie from "./Pie";
import UniHeader from "@/components/blocks/Uniheader";
import IconCard from "@/components/blocks/IconCard";
import {
  Sprout,
  Landmark,
  UserCog,
  BriefcaseBusiness,
  Award,
  ChartCandlestick,
} from "lucide-react";
import { useLang, type Lang } from "@/components/locale";
import dicts from "./locale";             
import type { TokenomicsDict } from "./locale/dict";  


const DICTS: Record<Lang, TokenomicsDict> = dicts;

type PieSlice = {
  value: number;
  label: string;
  color: string;
  explode: boolean;
  height: number;
  offset: number;
};

export default function Tokenomics() {
  const lang = useLang();
  const t = DICTS[lang] ?? DICTS.en;

  const chartData: PieSlice[] = [
    {
      value: 40,
      label: t.tokenomics.chart.labels[0],
      color: "#f9a729",
      explode: false,
      height: 0.2,
      offset: 0.0,
    },
    {
      value: 45,
      label: t.tokenomics.chart.labels[1],
      color: "#ffffff",
      explode: false,
      height: 0.1,
      offset: 0.0,
    },
    {
      value: 15,
      label: t.tokenomics.chart.labels[2],
      color: "#9a9a9a",
      explode: false,
      height: 0.1,
      offset: 0.0,
    },
  ];

  return (
    <div className="hero is-black">
      <div className="hero-body">
        <div className="container">
          <UniHeader
            as="h2"
            header={t.tokenomics.header}
            subheader={t.tokenomics.subheader}
            colorText="white"
            colorLine="primary"
          />

          <div className="columns mb-5">
            <div className="column is-two-thirds">
              <div style={{ height: "50vh", borderRadius: "12px", overflow: "hidden" }}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [1, 4, 5], fov: 30 }}>
                  <ambientLight intensity={1} />
                  <spotLight intensity={1} angle={0.1} penumbra={0.5} position={[120, 15, 10]} castShadow />
                  <Suspense fallback={null}>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={150}
                      cornerRadius={5}
                      padAngle={0.05}
                      roughness={0.15}
                      metalness={0.0}
                      valueLabelPosition={0.55}
                      showValues
                      valuesAsPercent
                      onClickSlice={() => {}}
                    />
                  </Suspense>
                  <OrbitControls maxPolarAngle={Math.PI / 2} enablePan={false} enableRotate enableZoom />
                </Canvas>
              </div>
            </div>

            <div className="column">
              <div className="mb-5">
                <p className="has-text-white has-text-weight-light is-size-8 mt-2">
                  {t.tokenomics.legendTop}
                </p>
              </div>

              <ul className="legend-list">
                {chartData.map((d, i) => (
                  <li
                    key={i}
                    className="mb-3 legend-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "0.25px dashed rgba(255,255,255,0.5)",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                    }}
                  >
                    <span
                      style={{
                        width: "1rem",
                        height: "1rem",
                        backgroundColor: d.color,
                        borderRadius: "50%",
                        marginRight: "0.75rem",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <span className="has-text-white has-text-weight-light is-size-6">{d.label}</span>
                      <span className="has-text-white has-text-weight-bold is-size-6 ml-2">{d.value}%</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <p className="has-text-white has-text-weight-light is-size-7">{t.tokenomics.legendBottom}</p>
              </div>
            </div>
          </div>

          <div className="box has-background-primary mt-5 py-5">
            <UniHeader
              as="h3"
              header={t.tokenomics.sections.community.header}
              subheader={t.tokenomics.sections.community.subheader}
              colorText="black"
              colorLine="white"
              className="mb-3"
            />

            <div className="columns is-variable is-5">
              <div className="column is-flex">
                <IconCard icon={<Sprout size={32} />} title={t.tokenomics.sections.community.cards[0].title}>
                  <p className="has-text-grey-light">{t.tokenomics.sections.community.cards[0].text}</p>
                </IconCard>
              </div>
              <div className="column is-flex">
                <IconCard icon={<Award size={32} />} title={t.tokenomics.sections.community.cards[1].title}>
                  <p className="has-text-grey-light">{t.tokenomics.sections.community.cards[1].text}</p>
                </IconCard>
              </div>
              <div className="column is-flex">
                <IconCard
                  icon={<ChartCandlestick size={32} />}
                  title={t.tokenomics.sections.community.cards[2].title}
                >
                  <p className="has-text-grey-light">{t.tokenomics.sections.community.cards[2].text}</p>
                </IconCard>
              </div>
            </div>
          </div>

          <div className="columns is-variable is-5 mt-5">
            <div className="column is-one-third">
              <div className="box has-background-grey">
                <UniHeader
                  as="h3"
                  header={t.tokenomics.sections.team.header}
                  subheader={t.tokenomics.sections.team.subheader}
                  colorText="black"
                  colorLine="black"
                  className="mb-3"
                />
                <div>
                  <IconCard icon={<UserCog size={32} />} title={t.tokenomics.sections.team.cards[0].title}>
                    <p className="has-text-grey-light">{t.tokenomics.sections.team.cards[0].text}</p>
                  </IconCard>
                </div>
              </div>
            </div>

            <div className="column  is-two-thirds">
              <div className="box has-background-light">
                <UniHeader
                  as="h3"
                  header={t.tokenomics.sections.investors.header}
                  subheader={t.tokenomics.sections.investors.subheader}
                  colorText="black"
                  colorLine="primary"
                  className="mb-3"
                />
                <div className="columns is-variable is-5">
                  <div className="column is-flex">
                    <IconCard
                      icon={<BriefcaseBusiness size={32} />}
                      title={t.tokenomics.sections.investors.cards[0].title}
                    >
                      <p className="has-text-grey-light">{t.tokenomics.sections.investors.cards[0].text}</p>
                    </IconCard>
                  </div>
                  <div className="column is-flex">
                    <IconCard icon={<Landmark size={32} />} title={t.tokenomics.sections.investors.cards[1].title}>
                      <p className="has-text-grey-light">{t.tokenomics.sections.investors.cards[1].text}</p>
                    </IconCard>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
