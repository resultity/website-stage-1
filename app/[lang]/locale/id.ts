// app/[lang]/locale/id.ts
// Bahasa Indonesia untuk beranda Resultity

import { Dict } from "./dict"

const id: Dict = {
  seo: {
    title: "Resultity — inferensi AI terdesentralisasi",
    description:
      "Resultity adalah jaringan inferensi terdesentralisasi: terbuka, dapat diverifikasi, dan dirancang untuk developer serta operator. Bergabunglah di tahap awal dan bantu membentuk rilis perdana.",
  },
  hero: {
    h1: "Resultity: AI global, digerakkan oleh komunitas",
    sub: "Era baru inferensi AI: terbuka, dapat diverifikasi, dan mudah diakses",
    smallLine1: "Developer mendapat akses terbuka ke inferensi.",
    smallLine2: "Operator menyalakan jaringan dan berbagi pertumbuhannya.",
    ctaWaitlist: "Gabung waitlist",
    ctaDocs: "Baca dokumen",
    rotator: ["hemat biaya", "keamanan", "keandalan", "anonimitas", "skalabilitas"],
  },
  kpis: {
    cheaperLabel: "Lebih hemat hingga",
    cheaperSuffix: "dibanding penyedia AI terpusat",
    withResultity: "Dengan Resultity Anda mendapat",
    forEveryInference: "untuk setiap inferensi",
    modelPortfolio: "Portofolio model",
    openSourceFamilies: "keluarga open-source",
  },
  whatIs: {
    header: "Apa itu Resultity",
    subheader: "Respons AI tanpa kepercayaan (trustless) melalui arsitektur DePIN",
  },
  buildCloud: {
    header: "Bangun dengan RTITY CLOUD",
    subheader: "Endpoint kompatibel OpenAI yang siap drop-in",
    bullets: {
      swap: "*Ganti* endpoint, *pertahankan* kode Anda",
      openaiCompat: "• Endpoint yang kompatibel dengan OpenAI.",
      syncAsync: "• Permintaan sinkron dan asinkron.",
      overModels: "• Lebih dari *50 model* (teks & media).",
      payg: "• Kredit pay-as-you-go. Hemat hingga *80%*.",
      noLockin: "• Tanpa penguncian vendor.",
      exploreCloudBtn: "Jelajahi cloud",
      microNote:
        "Pelajari cara kerja jaringan, insentif node, dan cara memulai.",
      readDocsBtn: "Baca dokumen",
    },
  },
  flow: {
    title: "Alur",
    cards: {
      userApp: {
        title: "Aplikasi Pengguna → API",
        p1: "Terhubung via API. Aplikasi mengirim permintaan melalui Resultity Cloud yang kompatibel OpenAI.",
        p2: "Tanpa rewrite. Cukup ganti endpoint dan key.",
        p3: "Cakupan luas. Teks, kode, embeddings, dan endpoint media didukung.",
        p4: "Dapat diaudit. Semua permintaan ditandatangani dan dicatat.",
      },
      coordination: {
        title: "Koordinasi",
        p1: "Validasi. Scheduler memeriksa setiap job sebelum didistribusikan.",
        p2: "Perutean cerdas. Seleksi menurut tipe model, region, dan SLA.",
        p3: "Kanal aman. Job berjalan melalui WebSocket terenkripsi.",
        p4: "Transparansi. Monitoring memastikan hasil yang terprediksi.",
      },
      nodeExec: {
        title: "Eksekusi Node",
        p1: "Pengiriman agen. Node Agent menerima job dan meluncurkan container runtime.",
        p2: "Penyimpanan lokal. Model di-cache lokal untuk muat cepat dan siap offline.",
        p3: "Daya GPU. Inferensi berjalan di GPU dengan output bertanda tangan.",
        p4: "Skalabel. Farming multi-node dan update Docker otomatis.",
      },
      response: {
        title: "Respons",
        p1: "Pengiriman cepat. Hasil kembali ke pengguna secara real-time.",
        p2: "Penagihan. Kredit dipotong otomatis dari saldo.",
        p3: "Imbalan adil. Operator mendapatkan Resultity Contribution Points (RCP).",
        p4: "Konversi TGE. RCP dikonversi ke token $RTITY setelah TGE.",
      },
    },
  },
  roadmap: {
    header: "Peta Jalan",
    subheader: "Dari pemanggangan testnet ke jaringan multimodal yang terbuka.",
    bullets: {
      now: "• Sekarang: *Mematangkan Cloud & Node* untuk testnet (API surface, runner, operasi).",
      next: "• Berikutnya: model *multimodal* dan *IDE AI*; kemitraan awal.",
      later: "• Nanti: *TGE*, *DAO*, dan layanan pendukung.",
    },
    viewBtn: "Lihat Peta Jalan",
  },
  contribute: {
    header: "Cara berkontribusi",
    subheader: "Jadi early adopter dan dapatkan semua manfaatnya",
    follow: {
      header: "Ikuti Kami",
      sub: "Subscription sederhana pun menambah metrik dan keterlibatan.",
      newsBtn: "Berita",
      communityBtn: "Komunitas",
    },
    promote: {
      header: "Promosikan Kami",
      sub1: "Resultity memulai maraton dengan fase testnet.",
      sub2:
        "Dapatkan notifikasi saat peluncuran, undang yang lain, dan kumpulkan poin RCP untuk pengujian cloud serta pertumbuhan jaringan.",
      aboutTestnetBtn: "Tentang Testnet",
    },
    power: {
      header: "Tenagai Kami",
      sub: "Instal RTITY Node dan nyalakan jaringan",
      waitlistBtn: "Gabung waitlist",
      text: "Jalankan job inferensi latar dari pengguna cloud, *jaga jaringan tetap online* dengan model terpasang, dan *kumpulkan RCP* selama testnet — kelak dikonversi menjadi token *$RTITY* setelah TGE.",
      nodeBtn: "RTITY Node",
    },
  },
  dictionary: {
    headword: "Resultity",
    ipa: "/ri-ˈzəl-tə-tee/",
    noun: "nomina",
    def1Long:
      "*1.* Istilah kolektif untuk keadaan menghasilkan sebuah keluaran; esensi dari suatu hasil.",
    def2Long:
      "*2.* Komputasi, DePIN. Platform inferensi terdesentralisasi: jaringan GPU terdistribusi yang memberikan output AI yang dapat diverifikasi melalui API kompatibel OpenAI, dengan reward dan akuntansi melalui RCP/$RTITY.",
    def1Short: "*1.* Hasil; substansi dari sebuah keluaran.",
    def2Short: "*2.* DePIN. Jaringan GPU terdesentralisasi yang menyajikan AI via API.",
    usage: "Penggunaan:",
    usageText: "sering dikapitalisasi saat merujuk ke platformnya.",
    domains: "Label domain:",
    domainsText: "komputasi; DePIN; inferensi AI.",
    etymology: "Etimologi:",
    etymologyText: "dari result + -ity.",
    seeAlso: "Lihat juga:",
    inferenceApi: "Inference API",
    nodes: "Node",
    tokenomics: "Tokenomik",
    vision: "Visi Resultity",
    internalRefs: "Referensi internal:",
    internalRefsText: "RCP (Resultity Contribution Points); $RTITY.",
  },
}

export default id
