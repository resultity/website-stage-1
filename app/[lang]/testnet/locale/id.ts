// app/[lang]/testnet/locale/id.ts
// Bahasa Indonesia untuk halaman Testnet dan HeroContent

import type { Dict } from "./dict";

const id: Dict = {
  seo: {
    title: "Resultity Testnet — fase 01",
    description:
      "Bergabunglah dengan testnet Resultity: jalankan node, uji tekanan API yang kompatibel dengan OpenAI, undang para builder, dan dapatkan RCP atas kontribusi yang terverifikasi.",
  },

  heroTitle: "TESTNET",
  phase: "fase 01",
  tiles: {
    node: { title: "node & dasbor", subtitle: "instal, kontrol, imbalan" },
    cloud: { title: "cloud & model", subtitle: "api kompatibel openai" },
    referral: { title: "tautan referral", subtitle: "ajak dan dapatkan rcp" },
  },
  aria: {
    node: "Node dan Dasbor",
    cloud: "Cloud dan Model",
    referral: "Tautan Referral",
  },
  info: {
    contribute: "berkontribusi & dapatkan RCP",
    duration: "durasi testnet: 3+ bulan",
    learnMore: "ᐅ Pelajari lebih lanjut",
  },

  about: {
    header: "Tujuan Testnet",
    subheader: "fase 01",
    lines: [
      "*Komunitas* tumbuh secara organik dan memberikan masukan",
      "*Node* terinstal mulus dan memperbarui otomatis",
      "*Model* terunduh dan berjalan sesuai spesifikasi perangkat",
      "Node *Dashboard* dan *Panel* Cloud berfungsi",
      "Poin *RCP* dikreditkan dengan benar",
      "*Jaringan* siap untuk penambahan fitur baru",
    ],
  },

  benefits: {
    header: "Manfaat untuk Peserta",
    subheader: "Operasikan, bangun, atau referensikan — kontribusimu tercatat.",
    p1: "*Satu jaringan, banyak peran*: jalankan node, gunakan API yang kompatibel dengan OpenAI, atau bawa builder lewat referral — setiap aksi terverifikasi menghasilkan *RCP*.",
    p2: "*Pamerkan dan iterasi*: sambungkan aplikasi ke testnet, kumpulkan umpan balik & telemetri nyata, dan tumbuh bersama komunitas.",
    btnMoreRCP: "Selengkapnya tentang RCP",
  },

  node: {
    header: "01. Menguji RTITY Node",
    subheader: "agar suplai inference stabil dan andal",
    p1: "Selesaikan misi instalasi dan *ikuti pembaruan*.",
    p2: "Gunakan Dashboard untuk *menyetel node* dan menjaga komposisi model yang sehat.",
    p3: "*Dapatkan RCP* dengan menguji rilis baru Aplikasi Konsol Node dan melakukan kustomisasi.",
    btnInstall: "Instal Node",
  },

  cloud: {
    header: "02. Menguji RTITY Cloud",
    subheader: "agar layanan makin cepat dan presisi",
    p1: "Kirim *permintaan* paralel/kompleks, buat token API, dan berikan beban tinggi ke Cloud. Lacak daftar tugas dan pembaruan dokumentasi.",
    p2: "*Dapatkan RCP* dengan menguji keberlanjutan dan kegunaan Cloud API.",
    btnAboutCloud: "Tentang Cloud",
  },

  affiliate: {
    header: "03. Menguji platform",
    subheader: "agar pengalaman pengguna sempurna",
    p1: "Buat *tautan referral* dan undang operator node serta pengguna inference.",
    p2: "Naikkan level kontribusimu menuju peran duta.",
    p3: "*Dapatkan RCP* dengan menumbuhkan jumlah pengguna yang diundang; aksi target mereka juga menambah RCP.",
  },

  rcp: {
    header: "Resultity Contribution Points (RCP)",
    subheader: "Mengukur dan memberi imbalan partisipasi",
    c1: [
      "RCP adalah poin kontribusi, *bukan token* dan bukan 1:1 dengan token apa pun. RCP memberi cara yang tepat *untuk menilai kontribusi relatif* tanpa risiko tokenomik, sehingga kalibrasi bisa fleksibel dari waktu ke waktu.",
    ],
    c2: [
      "RCP terakumulasi ke akun *atas aksi-aksi target* dari pengguna dan referral-nya. Pada fase pengujian tertentu, payout untuk aksi spesifik bisa *dinaikkan* untuk mempercepat pembelajaran.",
      "Pada Token Generation Event (TGE), RCP yang terkumpul akan digunakan sebagai *dasar airdrop* token $RTITY bagi kontributor awal.",
    ],
    c3: [
      "RCP adalah mekanisme permanen di Resultity. Awalnya imbalan ditetapkan oleh tim; kemudian kewenangan ini berpindah ke *komunitas dan DAO*.",
      "Selain airdrop TGE, RCP akan mendorong distribusi token berkelanjutan melalui *insentif bergaya mining*.",
    ],
    btnMoreRCP: "Selengkapnya tentang RCP",
  },

  join: {
    header: "Bergabung dengan Testnet",
    subheader: "Jadilah kontributor pertama",
    p1: "Dengan menguji Resultity, kamu membantu membentuk cloud inference terdesentralisasi — dan mengamankan imbalan awal sebagai pionir testnet.",
    btnJoinWaitlist: "Gabung Waitlist",
  },
};

export default id;
