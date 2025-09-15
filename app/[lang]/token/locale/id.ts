// app/[lang]/token/locale/id.ts
import type { TokenDict } from "./dict";

const id: TokenDict = {
  seo: {
    title: "Token RTITY — utilitas & insentif untuk inference terdesentralisasi",
    description:
      "Token $RTITY menggerakkan Resultity: kredit untuk inference, staking & tata kelola, pertumbuhan ekosistem, serta ekonomi jaringan yang berkelanjutan.",
  },

  hero: {
    tokenLabel: "Token",
    ticker: "$RTITY",
    ctaDetails: "LIHAT DETAIL",
  },

  profile: {
    header: "Profil Token",
    subheader: "Ketentuan & Parameter Sementara",
    paragraph:
      "*$RTITY* adalah token utilitas *ERC-20* di rantai *kompatibel EVM*. Suplai maksimum *1.327.200.000 token* (batas tetap). Linimasa *TGE*, *Airdrop*, dan *Public Sale* akan diumumkan bersamaan dengan detail program lengkap. Untuk menyelaraskan insentif, sebagian besar alokasi akan mengikuti *vesting* dan *lockup* terstruktur. Ketersediaan multi-rantai direncanakan melalui *jembatan* ke jaringan EVM yang kompatibel.",
    ctas: { roadmap: "Jelajahi Roadmap", tokenomics: "Lihat Tokenomics" },
  },

  featuresSection: {
    header: "Fitur Token",
    subheader: "Jelajahi kekuatan RTITY",
  },

  features: [
    {
      title: "Pembelian Inference",
      alt: "Token digunakan untuk pembelian inference",
      description:
        "Bayar penggunaan model dan beban kerja dengan kredit atau langsung memakai token di seluruh katalog Resultity.",
    },
    {
      title: "Pengembangan Ekosistem",
      alt: "Pengembangan ekosistem dan hibah",
      description:
        "Hibah, program likuiditas, dan kredit komputasi untuk mengakselerasi builder, integrasi, dan riset.",
    },
    {
      title: "Tata Kelola & Staking",
      alt: "Utilitas tata kelola dan staking",
      description:
        "Stake untuk berpartisipasi dalam tata kelola. Penyelarasan jangka panjang diberi imbalan $RTITY tambahan di atas biaya jaringan.",
    },
  ],

  acquire: {
    header: "Cara Memperoleh Token",
    subheader: "Jelajahi kekuatan RTITY",
    slides: [
      {
        header: "Airdrop",
        text:
          "Ikut serta dalam testnet, selesaikan tugas, dan kumpulkan RCP (Resultity Contribution Points).\n\nSetelah TGE, *poin RCP yang didapat akan dikonversi menjadi $RTITY* dan didistribusikan kepada kontributor testnet yang sah.\n\nBeragam bentuk aktivitas dapat diberi imbalan.",
      },
      {
        header: "Mining",
        text:
          "Saat TGE aktif, token baru akan mengalir ke anggota ekosistem yang paling aktif.\n\n*DAO mengevaluasi setiap kontribusi dalam RCP*, lalu rutin mengonversi poin tersebut menjadi payout $RTITY.",
      },
      {
        header: "Public Sale",
        text:
          "Penjualan token berfokus komunitas yang membuka akses untuk semua orang.\n\n*Proyeksi ROI dan ketentuan vesting* akan dirilis dalam dokumen tokenomics final.",
      },
      {
        header: "Pembelian di Pasar",
        text:
          "Kami berencana listing di bursa CEX dan DEX utama, diikuti likuiditas yang dalam.\n\nDukungan lintas-rantai melalui *jembatan ke jaringan EVM kunci* sudah ada di roadmap.",
      },
      {
        header: "Mengoperasikan Node",
        text:
          "Lebih banyak komputasi, lebih banyak model, lebih banyak uptime — *pendapatan dasar* meningkat.\n\nPekerjaan inference dibayar terpisah, dan tarif subcloud sering kali melampaui pasar publik.",
      },
      {
        header: "Imbalan Staking",
        text:
          "*Hanya token yang di-stake yang dapat memberi suara* saat tata kelola diaktifkan.\n\nSebagai apresiasi penyelarasan jangka panjang, staker memperoleh $RTITY ekstra di atas biaya jaringan.",
      },
      {
        header: "Program Afiliasi",
        text:
          "Setiap pengguna bisa menjadi konsumen sekaligus pemasok inference.\n\nAjak builder baru dan dapatkan *bagian token dari yang mereka hasilkan atau belanjakan*.",
      },
      {
        header: "Penghargaan Hackathon",
        text:
          "AI bergerak cepat — kami juga.\n\nIkuti hackathon Resultity, pecahkan tantangan mutakhir, dan menangkan *hadiah $RTITY*.",
      },
      {
        header: "Grants",
        text:
          "Luncurkan produk yang memanfaatkan inference Resultity dan terima dukungan loyalitas ganda:\n\n*kredit komputasi gratis plus modal untuk pertumbuhan*.",
      },
    ],
  },

  spendAndHealth: {
    spend: {
      header: "Di Mana $RTITY Dapat Digunakan",
      subheader: "Utilitas yang menggerakkan jaringan",
      bullets: [
        "*Inference Credits* – konversi token menjadi kredit dan bayar penggunaan model apa pun di seluruh katalog Resultity.",
        "*Subclouds* – pesan waktu GPU prioritas di dalam klaster khusus kartu terpilih, berjalan dalam mode *prioritas tinggi*.",
        "*Space Hosting* – deploy agen, pipeline RAG, atau pengalaman penuh dan jaga tetap online 24/7.",
      ],
    },
    health: {
      header: "Kesehatan Token",
      subheader: "Mekanisme untuk menjaga nilai jangka panjang",
      bullets: [
        "Pembayaran dalam stablecoin memicu *buy-back otomatis* $RTITY dari pasar terbuka.",
        "*Aksi tata kelola* memerlukan staking, menjaga kendali pada pemegang yang berkomitmen.",
        "Skema *vesting linear* bagi kontributor inti mengurangi tekanan jual dan menstabilkan harga.",
      ],
    },
  },

  tokenomics: {
    header: "Alokasi Token",
    subheader: "Jelajahi kekuatan RTITY",
    legendTop: "Pembagian alokasi bersifat awal dan dapat berubah sebelum TGE.",
    legendBottom:
      "Distribusi bertujuan menyeimbangkan insentif komunitas, imbalan kontributor, dan keberlanjutan jangka panjang.",
    chart: {
      labels: ["Komunitas & Likuiditas", "Investor & Perbendaharaan", "Tim"],
    },
    sections: {
      community: {
        header: "Komunitas & Likuiditas",
        subheader: "40% dari Emisi",
        cards: [
          { title: "Ekosistem", text: "Program dan kredit yang mengakselerasi ribuan pengguna dan builder." },
          { title: "Penghargaan", text: "Testnet, hackathon, dan misi yang memberi imbalan kontribusi bermakna." },
          { title: "DEX & CEX", text: "Likuiditas dan market-making untuk memastikan ketersediaan token yang sehat." },
        ],
      },
      team: {
        header: "Tim",
        subheader: "15% dari Emisi",
        cards: [{ title: "Pendiri", text: "Dialokasikan dengan vesting jangka panjang dan akuntabilitas pada jaringan." }],
      },
      investors: {
        header: "Investor & Perbendaharaan",
        subheader: "45% dari Emisi",
        cards: [
          { title: "Investor", text: "Dukungan strategis untuk pertumbuhan, infrastruktur, dan ekspansi pasar." },
          { title: "Perbendaharaan", text: "Dikelola dengan transparan untuk mendanai pengembangan dan ketahanan." },
        ],
      },
    },
  },
};

export default id;
