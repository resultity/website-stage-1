import type { CloudDict } from "./dict";

const id: CloudDict = {
  seo: {
    title: "RTITY Cloud — hemat hingga 80% untuk inferensi AI",
    description:
      "API yang kompatibel dengan OpenAI di atas jaringan GPU terdesentralisasi. Perutean berbasis kebijakan, metering transparan, tanpa penguncian vendor. Migrasi dalam hitungan menit.",
  },

  hero: {
    title: "RTITY CLOUD: Hemat hingga 80% untuk inferensi AI",
    subtitle:
      "API kompatibel OpenAI di jaringan GPU terdistribusi — perutean berbasis kebijakan, metering transparan, tanpa penguncian vendor.",
    ctaSavings: "Penghematan menurut Use Case",
  },

  dropin: {
    header: "Inferensi Terdesentralisasi, Semudah Drop-In",
    subheader: "API kompatibel OpenAI, perutean cerdas di seluruh node GPU komunitas",
    p1:
      "Resultity Cloud adalah *lapisan inferensi drop-in*: API kompatibel OpenAI yang sama, namun dirutekan melalui jaringan terdesentralisasi dari node GPU komunitas. Anda cukup mengganti endpoint dan key — tidak ada yang lain. Infrastruktur selalu mutakhir, model beragam, dan performa menskalakan otomatis tanpa titik kemacetan terpusat.",
    p2:
      "Memilih Resultity berarti *hingga 80% biaya lebih rendah*, akses ke *50+ model siap produksi* (7B–70B, teks, kode, visi, audio), dan *migrasi dalam hitungan menit* tanpa penulisan ulang. Tanpa biaya egress, tanpa penguncian vendor — hanya inferensi yang skalabel dengan fleksibilitas memilih model yang tepat untuk setiap beban kerja.",
  },

  users: {
    features: [
      {
        title: "Untuk Developer",
        alt: "Pengembang dan pembuat no-code",
        description:
          "Tenagai asisten IDE dan alur otomasi menggunakan API yang kompatibel dengan OpenAI. Startup tahap awal bisa merilis MVP tanpa rewrite, menjaga stack tetap portabel, dan mengontrol penggunaan lewat kuota serta telemetri.",
      },
      {
        title: "Untuk Peneliti",
        alt: "Peneliti, mahasiswa, dan tim sektor publik",
        description:
          "Jalankan eksperimen dan proyek kelas dengan konfigurasi reprodusibel dan model terversi. Gunakan kontrol kebijakan dan log siap audit untuk mengelola akses serta menelusuri aktivitas dalam skala besar.",
      },
      {
        title: "Untuk Tim Bisnis",
        alt: "Bisnis dan tim produk",
        description:
          "Tambahkan fitur AI ke alur kerja pelanggan melalui key sadar-tenant, metering, dan pagar pembatas perutean. Startup yang bertumbuh dan UKM beroperasi andal di berbagai lingkungan dengan biaya yang transparan dan terprediksi.",
      },
    ],
    deeperTitle: "Ingin menyelam lebih dalam?",
    deeperText: "Pelajari cara kerja jaringan, insentif node, dan cara memulai.",
    deeperCtas: { nodes: "Node Inferensi", docs: "Baca dokumentasi" },
  },

  tableCompare: {
    header: "Resultity vs Cloud Terpusat",
    subheader: "Perutean drop-in yang kompatibel OpenAI di atas jaringan GPU terdistribusi — perbandingan sekilas.",
    headings: { criterion: "Kriteria", resultity: "Resultity Cloud", centralized: "Cloud Terpusat" },
    rows: {
      cost: {
        criterion: "Biaya per inferensi",
        rt: "Hingga 80% lebih rendah via pasokan komunitas",
        rtTag: "lower",
        cz: "Harga premium, biaya egress dan add-on kuota",
        czTag: "higher",
      },
      migration: {
        criterion: "Migrasi & kompatibilitas",
        rt: "Kompatibel OpenAI; ganti endpoint/key dalam menit",
        rtTag: "seamless",
        cz: "API proprieter, rewrite kode, kontrak",
        czTag: "complex",
      },
      resilience: {
        criterion: "Resiliensi & perutean",
        rt: "Perutean terdesentralisasi, isolasi Subcloud",
        rtTag: "distributed",
        cz: "Ketergantungan region/penyedia",
        czTag: "centralized",
      },
      latency: {
        criterion: "Latensi",
        rt: "Sedikit lebih tinggi di beberapa wilayah karena sebaran node",
        rtTag: "minor",
        cz: "Peering pusat data yang dioptimalkan menjaga latensi sangat rendah",
        czTag: "lower",
      },
      streaming: {
        criterion: "Streaming & batching",
        rt: "Didukung melalui endpoint kompatibel",
        rtTag: "same",
        cz: "Didukung di sebagian besar API besar",
        czTag: "same",
      },
      observability: {
        criterion: "Observabilitas & metering",
        rt: "Penggunaan transparan, key per-tenant",
        rtTag: "same",
        cz: "Dasbor penggunaan, meter penagihan",
        czTag: "same",
      },
    },
    tags: {
      lower: "Lebih rendah",
      higher: "Lebih tinggi",
      seamless: "Mulus",
      complex: "Kompleks",
      distributed: "Terdistribusi",
      centralized: "Tersentralisasi",
      minor: "Trade-off kecil",
      same: "Sama",
    },
  },

  usecases: {
    header: "Use Case Bernilai Tinggi",
    subheader: "Pengalaman optimal dan penghematan besar pada skenario yang diandalkan perusahaan setiap hari",
    cards: [
      {
        title: "IDE & Alat Dev",
        bullets: {
          who: "Siapa: Pengembang, pembuat plugin",
          where: "Di mana: VS Code, JetBrains, terminal, CLI",
          tools: "Alat: Ekstensi, kait LSP, pembantu CLI",
          keyFeatures: "Fitur kunci: API kompatibel OpenAI, model yang dipin",
        },
        paragraph: "Sambungkan kopilot inline dan refactor tanpa rewrite; jaga konfigurasi tetap reprodusibel di seluruh tim.",
        savingTag: "Hemat ~60–75%",
      },
      {
        title: "Knowledge & Retrieval",
        bullets: {
          who: "Siapa: Tim data, insinyur ML",
          where: "Di mana: Penyimpanan dokumen, tiket, wiki, BI",
          tools: "Alat: Embeddings API, pgvector, Pinecone, Weaviate",
          keyFeatures: "Fitur kunci: perutean regional, run reprodusibel",
        },
        paragraph: "Bangun pencarian perusahaan dan Q&A dengan embedding stabil dan biaya yang terprediksi.",
        savingTag: "Hemat ~40–70%",
      },
      {
        title: "Aplikasi Pengguna",
        bullets: {
          who: "Siapa: Tim SaaS, pembuat no-code, startup",
          where: "Di mana: Aplikasi web/mobile, plugin, backend",
          tools: "Alat: n8n, Zapier, fungsi serverless",
          keyFeatures: "Fitur kunci: API drop-in, switch instan",
        },
        paragraph: "Luncurkan fitur chat, assist, dan otomasi dengan cepat menggunakan integrasi portabel.",
        savingTag: "Hemat ~50–70%",
      },
      {
        title: "Sistem Enterprise",
        bullets: {
          who: "Siapa: TI enterprise, penyedia solusi",
          where: "Di mana: ERP, CRM, ITSM, analitik",
          tools: "Alat: API gateway, SDK, middleware",
          keyFeatures: "Fitur kunci: key per-tenant, kontrol kebijakan, audit",
        },
        paragraph: "Tanamkan inferensi sadar-tenant ke sistem inti tanpa mendesain ulang penagihan atau akses.",
        savingTag: "Hemat ~40–60%",
      },
      {
        title: "Agen & Workflow",
        bullets: {
          who: "Siapa: Tim produk, operasional, otomasi",
          where: "Di mana: Antrian kerja, orkestrator, RPA",
          tools: "Alat: LangChain, Airflow, temporal, CI/CD",
          keyFeatures: "Fitur kunci: Subcloud privat, pagar perutean",
        },
        paragraph: "Jalankan agen latar dan pipeline dengan isolasi, kuota, serta eksekusi yang dapat diaudit.",
        savingTag: "Hemat ~50–80%",
      },
      {
        title: "Suara & Visi",
        bullets: {
          who: "Siapa: Tim dukungan, aplikasi media, operasi",
          where: "Di mana: Call center, alat rapat, pipeline media",
          tools: "Alat: ASR (kelas Whisper), TTS, pengenalan/generasi gambar",
          keyFeatures: "Fitur kunci: streaming, mode batch, perutean regional",
        },
        paragraph: "Tenagai transkripsi, bot suara, dan otomasi visual lebih dekat ke pengguna.",
        savingTag: "Hemat ~60–70%",
      },
    ],
    ctaBlock: { prompt: "Sudah menemukan yang cocok? Beri tahu kami", cta: "Gabung waitlist" },
  },

  evolution: {
    header: "Evolusi RTITY Cloud",
    subheader:
      "Resultity Cloud berevolusi dari Testnet gratis menjadi Mainnet bertoken — berkembang dari inferensi chat & kode ke media, embeddings, dan kluster Subcloud. Setiap tahap menambah ekonomi yang lebih kuat, tata kelola komunitas, dan harga yang terprediksi. Jalur ini dirancang agar inferensi tetap terbuka, terjangkau, dan terus ditingkatkan tanpa penguncian vendor.",
    steps: [
      {
        header: "Testnet",
        subheader: "Chat dan kode, alur async/sync",
        bullets:
          "*Cakupan:* Chat Completions dan Pembuatan Kode untuk kebutuhan harian\n" +
          "*Insentif:* Setiap konsumen mendapatkan poin RCP dan ikut airdrop\n" +
          "*Harga:* Gratis dengan batasan, atau via token testnet",
      },
      {
        header: "Setelah Peluncuran Mainnet",
        subheader: "Dukungan media, job batch, stablecoin",
        bullets:
          "*Cakupan:* Dukungan parsial untuk media + embeddings, batch & permintaan kompetitif\n" +
          "*Pembayaran:* Stablecoin sebagai opsi sementara\n" +
          "*Kesesuaian pasar:* Onboarding mitra, harga diseimbangkan oleh suplai dan permintaan nyata",
      },
      {
        header: "Mainnet Bertoken",
        subheader: "Media penuh, embeddings, Subcloud",
        bullets:
          "*Cakupan:* Dukungan penuh untuk media dan embeddings\n" +
          "*Subcloud:* Sewa kluster dengan perutean + isolasi untuk SLA\n" +
          "*Pembayaran:* Token $RTITY dengan kredit prabayar\n" +
          "*Program:* Jalur startup dan sosial\n" +
          "*Harga:* Kompetitif vs penawaran pasar",
      },
    ],
    box: {
      lead: "Tonggak RTITY Cloud — lihat apa selanjutnya",
      cta: "Peta jalan",
    },
  },

  migration: {
    header: "Migrasi Mulus ke RTITY Cloud",
    subheader:
      "Pertahankan antarmuka yang kompatibel OpenAI — cukup ganti endpoint dan key untuk membuka biaya lebih rendah, reliabilitas lebih tinggi, dan tata kelola transparan.",
    p:
      "Beralih ke Resultity Cloud itu tanpa gesekan: dalam banyak kasus berarti *hanya memperbarui endpoint dan key API*. Anda mempertahankan antarmuka yang kompatibel OpenAI, namun mendapatkan *biaya lebih rendah*, *reliabilitas lebih baik*, dan *tata kelola transparan* yang ditenagai node komunitas dan insentif token.",
    ctaLead: "Jelajahi gagasan besarnya ➪",
    ctaButton: "Visi",
  },

  decentralized: {
    items: [
      { title: "Harga Relevan", text: "Biaya mencerminkan kondisi pasar nyata, dibentuk oleh penyedia dan pengguna, tetap adil serta terprediksi tanpa markup tersembunyi." },
      { title: "Fleksibilitas", text: "Beralih antar model, konfigurasi, dan beban kerja seketika, beradaptasi dengan eksperimen atau produksi tanpa overhead." },
      { title: "Resiliensi", text: "Perutean terdesentralisasi memberi redundansi dan failover, memastikan tugas tetap berjalan saat ada gangguan atau masalah regional." },
      { title: "Privasi", text: "Permintaan ditandatangani secara kriptografis dan diproses secara lokal, menjaga data anonim dan kepatuhan." },
      { title: "Tanpa Penguncian Perangkat Keras", text: "Gunakan kapasitas GPU komunitas alih-alih membangun armada sendiri, memangkas biaya awal dan kompleksitas pengelolaan." },
      { title: "Akses Terbuka", text: "Masuk transparan dan permissionless memastikan pengembang serta bisnis dapat bergabung atau keluar tanpa hambatan." },
    ],
  },

  engage: {
    left: {
      header: "Ikut Terlibat",
      subheader: "Tiga cara sederhana untuk berkontribusi hari ini",
      paragraphs: [
        "*Gabung Testnet* — jalankan permintaan nyata, temukan masalah, dan bantu memvalidasi perutean, limit, dan koridor harga.",
        "*Developer & Operator Node* — hadirkan kontributor baru untuk memperluas cakupan dan mempercepat rilis fitur lintas wilayah.",
        "*Referral & Reward* — hubungkan proyek lain, dapatkan pendapatan referral, dan lolos airdrop komunitas yang terkait adopsi.",
        "*Startup & Layanan Aktif* — integrasi lebih awal, bagikan kebutuhan, dan desain bersama jalur produksi yang pas untuk workload Anda.",
        "*Ceritakan kebutuhan dan ide Anda* — gabung waitlist dan jadilah early adopter.",
      ],
    },
    right: {
      header: "Yang Anda Dapatkan",
      subheader: "Nilai praktis bagi peserta awal",
      paragraphs: [
        "*Permintaan Anda diprioritaskan* — kami lacak kebutuhan berulang dan memasukkannya ke konfigurasi GA, menu model, dan default.",
        "*Umpan balik langsung dari maintainer* — siklus cepat pada target perutean, batas laju, dan permukaan API seiring pematangan fitur.",
        "*Perencanaan kapasitas awal* — ajukan bentuk Subcloud dan region lebih awal sehingga jendela peluncuran selaras dengan permintaan Anda.",
      ],
      note: "Akses prioritas. Suara Anda terdengar. Dampak langsung pada roadmap.",
      cta: "Gabung Waitlist",
    },
  },

  terminalLight: {
    labels: { headers: "Headers:", body: "Body:" },
    dialogs: [
      [{ role: "user", content: "Bagaimana cara memasak pasta dengan rice cooker?" }],
      [
        { role: "system", content: "Anda adalah asisten yang ringkas." },
        { role: "user", content: "Berikan 3 tips cepat untuk mempercepat API Node.js." },
      ],
      [
        { role: "user", content: "Ringkas pro dan kontra RAG vs fine-tuning dalam 5 butir." },
        { role: "assistant", content: "Pro RAG: info segar, model dasar lebih kecil... kontra: infrastruktur retrieval..." },
        { role: "user", content: "Sekarang tambahkan satu contoh konkret untuk masing-masing pendekatan." },
      ],
      [
        { role: "system", content: "Jawab hanya dengan poin-poin." },
        { role: "user", content: "Tetap agnostik framework." },
      ],
      [{ role: "user", content: "Jelaskan cara kerja JSON Web Token untuk developer junior." }],
      [
        { role: "system", content: "Sertakan contoh kode singkat bila relevan." },
        { role: "user", content: "Bagaimana cara debounce sebuah fungsi di JavaScript?" },
      ],
      [
        { role: "user", content: "Apa perbedaan Docker image dan container?" },
        { role: "assistant", content: "Image adalah templat; container adalah instance yang berjalan." },
        { role: "user", content: "Daftarkan perintah khas untuk menginspeksi container yang berjalan." },
      ],
      [{ role: "user", content: "Berikan regex untuk memvalidasi tanggal ISO8601 (YYYY-MM-DD) dan jelaskan." }],
      [
        { role: "system", content: "Selalu akurat dan utamakan referensi standar." },
        { role: "user", content: "Status HTTP apa yang tepat untuk kesalahan validasi?" },
      ],
      [{ role: "user", content: "Saya punya array 10M integer. Uraikan pendekatan untuk mendapatkan 100 nilai terbesar dengan cepat." }],
    ],
  },
};

export default id;
