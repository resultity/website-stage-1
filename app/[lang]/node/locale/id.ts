// app/[lang]/node/locale/id.ts
import type { NodeDict } from "./dict";

const id: NodeDict = {
  seo: {
    title: "Resultity Node — jalankan model, dapatkan imbalan, dan menyalakan jaringan",
    description:
      "Instal Resultity Node untuk menjalankan model secara lokal, menerima job inferensi nyata, dan memperoleh imbalan berdasarkan kontribusi. Modular, terkontainerisasi, dan siap untuk swarm.",
  },

  hero: {
    title: "Resultity Node: GPU Anda, menyalakan AI global",
    subtitle:
      "Jalankan container ringan, terima job inferensi nyata, dan dapatkan imbalan.",
    blurb:
      "Setiap permintaan yang dilayani oleh *node Anda* membantu menyalakan agen, aplikasi, dan riset yang berjalan di Resultity.\nAnda bukan sekadar menjalankan kode — Anda *menggerakkan* generasi berikutnya dari infrastruktur AI terdesentralisasi.",
    ctas: { install: "Instalasi", waitlist: "Gabung Waitlist" },
  },

  nodeIntro: {
    header: "Resultity Node",
    subheader: "Mesin inferensi Anda di cloud terdesentralisasi",
    p1: "Resultity Node adalah *aplikasi desktop ringan* yang menghubungkan mesin Anda ke cloud terdesentralisasi. Ia memanfaatkan *GPU, CPU, memori,* dan penyimpanan untuk menjalankan model secara lokal serta berkomunikasi dengan jaringan Resultity.",
    p2: "Setelah online, node Anda *mengunduh model, menerima job inferensi,* dan menjaga sinkronisasi status. Ia membantu *menjaga stabilitas jaringan* dan *mengeksekusi tugas* — memperoleh imbalan berdasarkan kontribusi nyata.",
  },

  howItWorks: {
    header: "Cara kerjanya",
    subheader:
      "Dari permintaan hingga imbalan, setiap langkah berjalan transparan.",
    consumer: {
      header: "Konsumen Inferensi",
      subheader: "Meluncurkan permintaan",
      p: "Memilih model, *mengirim job* ke jaringan, dan membayar biaya inferensi.",
    },
    cloud: {
      header: "RTITY Cloud",
      subheader: "Merutekan dan menyeimbangkan",
      p: "Menerima job, menerapkan komisi, lalu *mendistribusikannya* ke node yang tersedia.",
    },
    node: {
      header: "RTITY Node",
      subheader: "Eksekusi dan imbalan",
      p: "Menjaga jaringan tetap berjalan, *menjalankan job* di GPU, dan mendapatkan imbalan.",
    },
    narrative1:
      "Node menghubungkan GPU Anda ke jaringan Resultity (RTITY). Ia menerima job dari orkestrator, menjalankannya menggunakan model lokal, lalu mengembalikan hasil. Model diinstal dan diperbarui otomatis. Node menandatangani tiap tugas dan menjaga statusnya tetap sinkron.",
    narrative2:
      "Job masuk melalui API kami. RTITY Cloud merutekannya ke node serta menangani pembayaran. Sebagian pembayaran diberikan ke operator node, sisanya mendukung ekosistem. Node yang aktif dengan model terpasang dihitung sebagai dukungan — bahkan tanpa job — dan berkontribusi pada stabilitas jaringan.",
    deeper: {
      title: "Ingin menyelam lebih dalam?",
      p: "Pelajari cara kerja jaringan, insentif node, dan bagaimana memulai.",
      ctas: { cloud: "Jelajahi cloud", docs: "Baca dokumen" },
    },
  },

  supportedModels: {
    header: "Keluarga Model yang Didukung",
    subheader:
      "Resultity Node mencakup beragam beban kerja transformer — dari chat dan retrieval hingga visi, audio, kode, dan generatif kreatif.",
    tags: {
      phase1: "Testnet",
      phase2: "Peluncuran Mainnet",
      phase3: "Mainnet Tokenized",
    },
    slides: [
      {
        header: "Chat & Retrieval",
        text:
          "*LLM untuk dialog, tanya jawab, dan asisten.*\n\n" +
          "Model seperti *LLaMA-2 (7B–70B)*, *Mistral*, dan *OpenChat* mendukung sesi interaktif, peringkasan, serta pencarian.\n\n" +
          "*VRAM:* 8 GB+ untuk 7B–13B, 24 GB+ untuk varian lebih besar.",
        phase: "phase1",
      },
      {
        header: "Suara & Transkripsi",
        text:
          "*Speech-to-text dan agen audio.*\n\n" +
          "Jalankan *Whisper*, *OpenVoice*, dan model serupa untuk caption live, transkripsi, atau voice cloning.\n\n" +
          "*VRAM:* 4 GB+ (tersedia fallback CPU).",
        phase: "phase2",
      },
      {
        header: "Visi & Multimodal",
        text:
          "*AI yang melihat dan memahami gambar.*\n\n" +
          "*Llava*, *MiniGPT-4*, *CogVLM* mendukung OCR, captioning, diagram, dan penalaran multimodal.\n\n" +
          "*VRAM:* 12 GB+ untuk hasil andal.",
        phase: "phase3",
      },
      {
        header: "Generasi Gambar",
        text:
          "*Alat kreatif bertenaga difusi.*\n\n" +
          "Model seperti *Stable Diffusion XL*, *Kandinsky*, dan *Playground v2* untuk seni, prototipe, dan render batch.\n\n" +
          "*VRAM:* 8 GB+ (16 GB+ untuk resolusi tinggi).",
        phase: "phase2",
      },
      {
        header: "Embedding & Pencarian",
        text:
          "*Pencarian semantik dengan embedding transformer.*\n\n" +
          "*BGE*, *InstructorXL*, dan *E5* melakukan embedding teks untuk RAG, clustering, dan kemiripan vektor.\n\n" +
          "*VRAM:* 4 GB+ untuk model dasar, 8–12 GB untuk skala.",
        phase: "phase2",
      },
      {
        header: "Function Calling & Tools",
        text:
          "*LLM dengan kemampuan layaknya plugin.*\n\n" +
          "*OpenChat Tool*, *GPT4-Function*, dan *ChatML* mendukung tools canggih, penggunaan alat, dan memori konteks.\n\n" +
          "*VRAM:* 16 GB+ direkomendasikan.",
        phase: "phase3",
      },
      {
        header: "Generasi Kode",
        text:
          "*Asisten coding otonom.*\n\n" +
          "Jalankan *StarCoder*, *CodeLLaMA*, *DeepseekCoder* untuk melayani pelengkapan, translasi, atau copilot realtime.\n\n" +
          "*VRAM:* 8–16 GB+ tergantung ukuran model.",
        phase: "phase1",
      },
      {
        header: "RAG & Agen",
        text:
          "*Rangkaian modular dengan memori dan perencanaan.*\n\n" +
          "*LangChain*, *Autogen*, *DSPy* mendukung agen cerdas yang menggabungkan model lokal dengan retrieval.\n\n" +
          "*VRAM:* 8–24 GB+ tergantung ukuran konteks.",
        phase: "phase2",
      },
    ],
    tryAll: {
      title: "Coba semuanya",
      p: "Instal node dan sesuaikan koleksi model Anda",
      cta: "Instal Node",
    },
  },

  ideology: {
    header: "Ideologi Node",
    subheader:
      "Resultity bukan sekadar infrastruktur. Ini gerakan komputasi terbuka, di mana kepemilikan, imbalan, dan kendali tetap pada Anda — operator node.",
    p: "Resultity lebih dari sekadar infrastruktur — ini *gerakan komputasi terbuka*. \nDengan menjalankan node Anda *memiliki kontribusi Anda*, menentukan ketentuan sendiri, dan turut membangun masa depan terdesentralisasi di mana komputasi dibagi, diberi imbalan, dan diatur komunitas.",
    biggerIdea: { hint: "Jelajahi gagasan besarnya ➪", cta: "Visi" },
    features: [
      {
        title: "Terdesentralisasi sejak Desain",
        text: "Setiap node Resultity bersifat otonom — tidak ada scheduler terpusat yang menentukan siklus hidupnya. Anda yang memutuskan kapan mulai, memperbarui, atau jeda.",
      },
      {
        title: "Pendapatan Transparan",
        text: "Kontribusi diukur. Kerja dihargai. Dari waktu GPU hingga penyimpanan dan bandwidth — setiap sumber daya mendapatkan bagiannya.",
      },
      {
        title: "Tetap Independen",
        text: "Tanpa lock-in. Tanpa dompet kustodian. Kunci Anda, mesin Anda, aturan Anda. Segalanya dapat diverifikasi di chain dan log.",
      },
      {
        title: "Bentuk Masa Depan",
        text: "Lebih dari sekadar pekerja. Beri suara pada proposal, usulkan fitur baru, dan bantu mengarahkan evolusi Resultity sebagai koperasi komputasi sejati.",
      },
    ],
  },

  designPrinciples: {
    header: "Prinsip Desain RTITY Node",
    subheader:
      "Dari setelan tunggal hingga swarm multi-node — dibangun untuk kesederhanaan, performa, dan imbalan yang transparan.",
  },

  dashboard: {
    header: "Dasbor Node",
    subheader:
      "Panel kendali terpadu untuk statistik live, versi model, pelacakan node, dan imbalan.",
    col1:
      "Dasbor Node adalah panel kendali berbasis web yang dapat Anda akses untuk mengelola seluruh swarm node, job, dan model yang dideploy. Ia menyinkronkan konfigurasi, memantau tugas inferensi, dan menyeimbangkan beban jaringan secara real time.",
    col2:
      "Anda bisa melihat riwayat job, memeriksa log, melacak metrik performa, dan mengatur alokasi trafik dari peramban mana pun — baik untuk satu perangkat maupun kluster GPU penuh. Semua pembaruan dan perubahan model diterapkan otomatis via Docker tanpa mengganggu tugas yang berjalan.",
  },

  swarm: {
    words: ["swarm", "farm", "multi-node"],
    suffix: "ING FIRST",
    p1: "Resultity Node dibangun untuk *operator armada* dan *pecinta farming*. Tanpa command line — cukup *luncurkan, pantau, dan skala* lewat satu dasbor.",
    p2: "Model dan logika *memperbarui otomatis*. Bergabunglah ke *testnet* dan kumpulkan RCP di seluruh *armada perangkat* Anda.",
  },

  ready: {
    header: "Siap berpartisipasi?",
    p: "Beri tahu kami bahwa Anda siap menjalankan setidaknya satu node",
    cta: "Gabung waitlist",
  },

  features: [
    {
      title: "Arsitektur Modular",
      alt: "Arsitektur Node Modular",
      description:
        "Setiap node mencakup inti biner, container inferensi, dan penyimpanan model terisolasi — siap pakai.",
    },
    {
      title: "Runtime Terkontainerisasi",
      alt: "Lingkungan Runtime Terkontainerisasi",
      description:
        "Lingkungan komputasi dibangun di atas Docker, memungkinkan deployment cepat, isolasi, dan upgrade mudah.",
    },
    {
      title: "Model Dikelola Mandiri",
      alt: "Manajemen Model Lokal",
      description:
        "Model diunduh, disimpan, dan dimuat secara lokal — memungkinkan waktu mulai cepat dan kemampuan offline penuh.",
    },
  ],
};

export default id;
