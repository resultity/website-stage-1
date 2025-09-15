// app/[lang]/roadmap/locale/id.ts
import type { RoadmapDict } from "./dict";

const id: RoadmapDict = {
  seo: {
    title: "Peta Jalan Resultity",
    description:
      "Lintasan bertahap dari pra-testnet ke mainnet, TGE, dan seterusnya — apa yang kami bangun dan kapan.",
  },

  term: {
    title: "rtity:~/roadmap.sh",
    footer: "merender roadmap… v-sync aktif",
  },

  hero: {
    levelPrefix: "Level",
  },

  panel: {
    nextStageFallback: "Tahap berikutnya",
    nextLabelPrefix: "Berikutnya:",
    ariaRoadmap: "Garis peta jalan",
  },

stages: [
  {
    header: "Q3 2025 – Q4 2025",
    subheader:
      "Pra-testnet: draf MVP, dokumen konsep, proto-tokenomik, outreach awal",
    accentText:
      "Tim kecil, tugas paralel, update node jarang, infra bisa dipindah 1 hari.",
    stations: [
      { title: "Kerangka MVP", subtitle: "Rencana sprint, commit awal" },
      { title: "Dokumen Konsep", subtitle: "Arsitektur dan pilihan runtime" },
      { title: "Proto-tokenomik", subtitle: "Model RCP, asumsi, KPI" },
      { title: "Outreach Seed", subtitle: "Mitra awal dan angel" },
    ],
  },
  {
    header: "Q1 2026 – Q2 2026",
    subheader:
      "Build dasar: node, dasbor jaringan, Cloud chat, testnet, referral, IDE/kode",
    accentText:
      "Cepat tunjukkan nilai di web app dan node; update jarang dan stabil.",
    stations: [
      { title: "Node Modular v1", subtitle: "Agen/kontainer runtime" },
      { title: "Dasbor Jaringan", subtitle: "Kontrol node dan metrik" },
      { title: "Cloud Chat API", subtitle: "Completions dengan API key" },
      { title: "Testnet Publik", subtitle: "Program referral" },
      { title: "IDE/Embeddings Cloud", subtitle: "Gen kode dan embedding" },
    ],
  },
  {
    header: "Q3 2026 – Q4 2026",
    subheader:
      "Go-to-market: backend billing, mainnet, mitra, multimodal, batch",
    accentText:
      "Hasil jelas bagi investor: penggunaan prod, revenue dan studi kasus.",
    stations: [
      { title: "Backend Pembayaran", subtitle: "Kontrak, billing, biaya" },
      { title: "Peluncuran Mainnet", subtitle: "Migrasi beban dan SLA" },
      { title: "Model Multimodal", subtitle: "Gambar/audio dengan metrik" },
      { title: "Batch & Streaming", subtitle: "Skala dan streaming" },
      { title: "Kemitraan Awal", subtitle: "Pilot dan studi kasus" },
    ],
  },
  {
    header: "Q4 2026 – Q3 2027",
    subheader:
      "Stack TGE: governance/staking, TGE, mining; subcloud, Space, komputasi paralel",
    accentText:
      "Kurangi risiko TGE: audit kontrak, konversi RCP→token jelas, governance jalan.",
    stations: [
      { title: "Governance & Staking", subtitle: "Voting dan delegasi" },
      { title: "Stack TGE", subtitle: "Vesting, snapshot/claim, lock" },
      { title: "Mining & Rewards", subtitle: "Konversi & distribusi RCP" },
      { title: "Subcloud & Space", subtitle: "Personalisasi layanan" },
      { title: "Komputasi Paralel", subtitle: "Model terdistribusi besar" },
    ],
  },
  {
    header: "Q3 2027+",
    subheader:
      "Pasca-TGE: launchpad, program sosial, skala, kontrak gov, hibah, DAO",
    accentText:
      "Desentralisasi bertahap dan kas disiplin dengan guna token nyata.",
    stations: [
      { title: "Launchpad & Hibah", subtitle: "Ekosistem dan co-marketing" },
      { title: "Gov & Enterprise", subtitle: "Kontrak pemerintah" },
      { title: "Skala & Reliabilitas", subtitle: "Kapasitas, SLO, optimasi" },
      { title: "Operasi DAO", subtitle: "Kebijakan, transparansi, buyback" },
      { title: "Program Komunitas", subtitle: "Inisiatif sosial" },
    ],
  },
]

};

export default id;
