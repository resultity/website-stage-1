// app/[lang]/roadmap/locale/en.ts
import type { RoadmapDict } from "./dict";

const en: RoadmapDict = {
  seo: {
    title: "Resultity Roadmap",
    description:
      "Phased path from pre-testnet to mainnet, TGE, and beyond — what we build and when.",
  },

  term: {
    title: "rtity:~/roadmap.sh",
    footer: "rendering road… v-sync on",
  },

  hero: {
    levelPrefix: "Level",
  },

  panel: {
    nextStageFallback: "Next stage",
    nextLabelPrefix: "Next:",
    ariaRoadmap: "Roadmap line",
  },

  stages: [
  {
    header: "Q3 2025 – Q4 2025",
    subheader:
      "Pre-testnet: MVP draft, concept docs, proto-tokenomics, seed outreach",
    accentText:
      "Small team, parallel tasks, rare node updates, infra rehostable in a day.",
    stations: [
      { title: "MVP Scaffold", subtitle: "Sprint plan, first commits" },
      { title: "Concept Docs", subtitle: "Architecture and runtime choice" },
      { title: "Proto-tokenomics", subtitle: "RCP model, assumptions, KPI" },
      { title: "Seed Outreach", subtitle: "Early partners and angels" },
    ],
  },
  {
    header: "Q1 2026 – Q2 2026",
    subheader:
      "Base build: node, network dashboard, Cloud chat, testnet, referrals, IDE/code",
    accentText:
      "Quickly show value in web apps and node; updates are rare and stable.",
    stations: [
      { title: "Modular Node v1", subtitle: "Agent/runtime containers" },
      { title: "Network Dashboard", subtitle: "Node control and metrics" },
      { title: "Cloud Chat API", subtitle: "Completions with API keys" },
      { title: "Public Testnet", subtitle: "Referral program" },
      { title: "IDE/Embeddings Cloud", subtitle: "Code gen and embeddings" },
    ],
  },
  {
    header: "Q3 2026 – Q4 2026",
    subheader:
      "Go-to-market: billing backend, mainnet, partners, multimodal, batch",
    accentText:
      "Results clear for investors: prod usage, revenue and partner cases.",
    stations: [
      { title: "Payments Backend", subtitle: "Contracts, billing, fees" },
      { title: "Mainnet Launch", subtitle: "Workload migration and SLA" },
      { title: "Multimodal Models", subtitle: "Images/audio with metrics" },
      { title: "Batch & Streaming", subtitle: "Scale and streaming" },
      { title: "First Partnerships", subtitle: "Pilots and case studies" },
    ],
  },
  {
    header: "Q4 2026 – Q3 2027",
    subheader:
      "TGE stack: governance/staking, TGE, mining; subclouds, Space, parallel compute",
    accentText:
      "De-risk TGE: contract audit, clear RCP→token, working governance.",
    stations: [
      { title: "Governance & Staking", subtitle: "Voting and delegation" },
      { title: "TGE Stack", subtitle: "Vesting, snapshot/claim, locks" },
      { title: "Mining & Rewards", subtitle: "RCP conversion & distro" },
      { title: "Subclouds & Space", subtitle: "Service personalization" },
      { title: "Parallel Compute", subtitle: "Large distributed models" },
    ],
  },
  {
    header: "Q3 2027+",
    subheader:
      "Post-TGE: launchpad, social programs, scale, gov contracts, grants, DAO",
    accentText:
      "Gradual decentralization and disciplined treasury with real token use.",
    stations: [
      { title: "Launchpad & Grants", subtitle: "Ecosystem and co-marketing" },
      { title: "Gov & Enterprise", subtitle: "Government contracts" },
      { title: "Scale & Reliability", subtitle: "Capacity, SLO, optimization" },
      { title: "DAO Operations", subtitle: "Policies, transparency, buybacks" },
      { title: "Community Programs", subtitle: "Social initiatives" },
    ],
  },
]

};

export default en;
