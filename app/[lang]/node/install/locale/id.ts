// app/[lang]/node/install/locale/id.ts
import type { NodeInstallDict } from "./dict";

const id: NodeInstallDict = {
  seo: {
    title: "Instalasi RTITY Node — gabung testnet dan mulai memperoleh imbalan",
    description:
      "Instal Resultity (RTITY) Node, hubungkan dompet Anda, dan bergabung dengan testnet publik. Jalankan model terbuka secara lokal dan dapatkan RCP untuk uptime dan job.",
  },

  hero: {
    title: "Instalasi RTITY Node",
    subtitle:
      "Operator dari waitlist mendapat akses awal ke testnet seiring rilis biner.",
    blurb:
      "Resultity menghubungkan *GPU menganggur* ke ekonomi inferensi global. Jalankan model terbuka secara lokal, dapatkan *imbal hasil yang adil*, dan tetap *berdaulat penuh* — tanpa lock-in, tanpa gatekeeper.",
    ctas: { install: "Instalasi", waitlist: "Gabung Waitlist" },
  },

  halves: {
    testnet: {
      header: "Dapatkan RCP di Testnet",
      subheader:
        "Instal Node, deploy model terbuka, dan dapatkan imbalan untuk ketersediaan serta penyelesaian job — waktu idle pun dihitung.",
      p1: "*Testnet publik* mendistribusikan *Resultity Contribution Points* (RCP) kepada node aktif. Poin ini akan dikonversi menjadi token setelah TGE.",
      p2: "Instalasi itu sederhana: jalankan biner, tautkan dompet, lalu sambungkan. Anda akan menerima job inferensi atau kredit idle tanpa setelan manual.",
      cta: "Gabung Testnet",
    },
    mainnet: {
      header: "Layani Job di Mainnet",
      subheader:
        "Node memperoleh token dengan mengeksekusi beban kerja AI dari klien cloud. Pendapatan meningkat seiring penggunaan, latensi, dan kelas hardware.",
      p1: "Permintaan inferensi dibayar dengan token. *Setiap job* dicocokkan dengan node yang memenuhi syarat secara real-time — respons cepat, komputasi aman.",
      p2: "Kendali tetap di tangan Anda: terima job, jeda, perbarui model — semuanya dari dasbor atau CLI. *Node Anda, aturan Anda*.",
      cta: "Pelajari Tokenomics",
    },
  },

  installSection: {
    header: "Instalasi Mulus",
    subheader:
      "Node dirancang sebagai biner portabel dengan performa native dan tanpa overhead setup. Linux, macOS, dan Windows akan didukung penuh.",
    narrative:
      "Semua sistem operasi utama didukung. Aplikasi lokal dikirim sebagai biner dengan izin untuk meluncurkan proses turunan dan mengakses sistem berkas pada komputer personal atau server khusus.",
  },

  capabilities: {
    header: "Kapabilitas",
    subheader:
      "Operator memperoleh kendali penuh atas model, deployment, dan mining — dengan RTITY sebagai imbalannya",
    features: [
      {
        title: "Farming Multi-node",
        alt: "Farming Multi-node",
        description:
          "Jalankan sebanyak mungkin node yang Anda inginkan. Setiap node bersifat independen, redundan, dan meningkatkan pendapatan Anda.",
      },
      {
        title: "Strategi Model",
        alt: "Strategi Model",
        description:
          "Pilih loadout beragam atau fokus pada model dengan permintaan tinggi. Anda yang memilih — jaringan menyesuaikan.",
      },
      {
        title: "Proof of Availability",
        alt: "Proof of Availability",
        description:
          "Tetap online untuk memperoleh imbalan. Node idle pun membantu jaringan — dan diberi imbalan atas uptime.",
      },
    ],
    col1:
      "Fase pertama peluncuran jaringan adalah testnet terbuka. Siapa pun bisa berpartisipasi dan memperoleh RCP (Resultity Contribution Points) untuk berbagai aksi. Poin ini akan memengaruhi besaran airdrop $RTITY tiap peserta.",
    col2:
      "Untuk mendukung jaringan dan menjalankan job inferensi, node harus memiliki setidaknya satu model terpasang. Laptop kelas menengah atau server GPU hemat sudah cukup untuk mulai berkontribusi.",
  },

  deeper: {
    title: "Ingin menyelam lebih dalam?",
    p: "Pelajari cara kerja jaringan, insentif node, dan bagaimana memulai.",
    ctas: { cloud: "Jelajahi cloud", docs: "Baca dokumen" },
  },

  dashboard: {
    header: "Satu dasbor. Kontrol tanpa batas.",
    subheader:
      "Jalankan node Anda dengan satu biner. Sambungkan ke akun Anda, dan buka kendali penuh — dari jarak jauh.",
    listHeading: "Apa yang Anda dapatkan dari dasbor:",
    bullets: [
      "Kendali jarak jauh semua node dari satu antarmuka",
      "Manajemen dan versing model secara live",
      "Monitoring job, statistik, dan wawasan performa",
      "Pelacakan imbalan dan riwayat pembayaran",
      "Pembaruan & instalasi berbasis Docker tanpa hambatan",
    ],
    narrative:
      "Setelah tersambung, node Anda berjalan senyap di latar. Berkat struktur modular dan inti Docker, pembaruan, instalasi, dan runtime tidak mengganggu alur kerja Anda. Tetap online, tetap mendapat imbalan — hanya dengan uptime dan internet.",
  },

  final: {
    header: "Tenagai revolusi AI\nDari perangkat Anda sendiri",
    subheader:
      "Komputasi cloud terdesentralisasi sudah hadir — dan Anda bisa menjadi bagiannya. Yang Anda butuhkan hanya sebuah GPU.",
    lead: "RTITY Node memungkinkan siapa pun berkontribusi pada beban kerja AI dari rumah:",
    bullets: [
      "Jalankan tugas inferensi dan layani respons real-time",
      "Bantu melatih dan fine-tune model open-source",
      "Dapatkan imbalan dari siklus komputasi GPU Anda",
      "Berpartisipasi dalam jaringan adil yang digerakkan komunitas",
    ],
    buttons: { primary: "Testnet", secondary: "Gabung Waitlist" },
    p: "GPU yang sama untuk gaming atau rendering kini menjadi sumber bahan bakar AI berskala global. Ini bukan hanya soal komputasi — ini tentang memiliki bagian dari gelombang infrastruktur berikutnya.",
  },

  terminal: {
    steps: [
      {
        name: "requirements",
        text: `
[ LLM ringan (~7B, terkuantisasi) ]
  • GPU: 6–10 GB VRAM (mis. RTX 3060)
  • RAM: 16–32 GB memori sistem

[ LLM menengah (~13B) ]
  • GPU: 16–24 GB VRAM (FP16 atau terkuantisasi)
  • RAM: 32–64 GB memori sistem

[ Multimodal / LLM besar (30B+) ]
  • GPU: ≥48 GB VRAM atau multi-GPU
  • RAM: 64–128 GB memori sistem dengan SSD cepat
`.trim(),
      },
      {
        name: "dependencies",
        text: `
Sistem operasi yang didukung:
  - Windows 10+ (x64)
  - Linux (Ubuntu 20.04+)
  - macOS 12+

Dependensi:
  - Driver GPU terpasang (NVIDIA/AMD)
  - Docker (wajib)
  - Akses internet
  - Port terbuka untuk sinkronisasi node
`.trim(),
      },
      {
        name: "install",
        text: `
╔═════════════════╗
║ RELEASE PENDING ║
╚═════════════════╝

Sambil aplikasi dipanggang:
▸ Cek roadmap
▸ Ikuti pembaruan kami
▸ GABUNG WAITLIST

Jadilah yang pertama deploy
dan membentuk jaringan terdesentralisasi.
`.trim(),
      },
      {
        name: "earn",
        text: `
╔═════════════════╗
║ TESTNET REWARDS ║
╚═════════════════╝

▸ Jalankan node dan atur lewat dasbor
▸ Jaga uptime dan layani job inferensi
▸ Ikut misi dan aktivitas komunitas
▸ Ajak pengguna API dan operator node baru

Kumpulkan poin RCP → dikonversi ke $RTITY saat TGE.
Tanpa staking. Tanpa buy-in. Hanya kontribusi.
`.trim(),
      },
    ],
  },
};

export default id;
