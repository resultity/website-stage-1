// app/[lang]/vision/locale/id.ts
import type { PageLocaleShape } from '@/components/locale';
import type { VisionDict } from './dict';

const id: PageLocaleShape<VisionDict> = {
  seo: {
    title: 'Resultity — Visi',
    description:
      'Resultity adalah lapisan inferensi yang terbuka dan dapat diverifikasi. API yang familiar, tanpa perantara, tanpa penguncian vendor.',
    keywords:
      'Resultity, RTITY, inferensi terdesentralisasi, jaringan AI, subclouds, RAG, agen',
  },
  chart: 'Pasar Inferensi (USD): Aktual & Prakiraan',
  hero: {
    title: 'VISI RESULTITY:  Inferensi adalah jenis energi terbaru',
    subtitle:
      'Resultity adalah lapisan inferensi yang terbuka dan dapat diverifikasi. API yang familiar, tanpa perantara, tanpa lock-in. Konsumsi dan suplai komputasi dengan aturan yang transparan.',
    cta: 'Jelajahi Pasar',
  },

  whatIsInference: {
    title: 'Apa itu inferensi?',
    subtitle: 'Definisi • Cara pengiriman',
    p1:
      '*Inferensi* adalah *forward pass* dari model yang telah dilatih — Anda mengirim *input* (*teks atau media*), model menjalankan perhitungannya, lalu mengembalikan *hasil*. Di produksi, penggunaan biasanya *diukur dalam token* atau satuan lain yang setara dengan *waktu mesin*. Semakin besar *model* (lebih banyak parameter), semakin tinggi kebutuhan *komputasi* — umumnya didukung *GPU* yang dibuat untuk paralelisme masif.',
    p2:
      '*Model* berjalan pada *komputasi* dedikasi dan memberikan output lewat *layanan API*. *Aplikasi* terhubung, mengirim *permintaan*, dan menerima *respons* — baik sistemnya *lokal* maupun *cloud*, beginilah AI menjadi bagian dari produk nyata.',
  },

  market: {
    title: 'Inferensi Cloud: Pasar yang Tumbuh Cepat',
    subtitle: 'Pertumbuhan tinggi, belanja tinggi, dan peluang efisiensi yang besar.',
    p1:
      'Inferensi AI memasuki fase skala: pasar yang dapat dijangkau naik dari *$97,2 miliar (2024) menjadi ~ $253,8 miliar pada 2030*, sementara *~90%* biaya siklus hidup sistem AI terjadi pada tahap inferensi. Di saat yang sama, permintaan komputasi pusat data diperkirakan akan *lebih dari tiga kali lipat pada 2030*, dan modal yang mengalir ke komputasi AI melonjak *~7,5× dalam dua tahun*. Aturan GDPR/CCPA yang makin ketat mendorong komputasi lebih dekat ke data, dan model terbuka kelas Llama/Mistral kini menghadirkan kualitas kelas enterprise tanpa lisensi mahal.',
  },

  challenges: {
    title: 'Tantangan Pasar Inferensi Saat Ini',
    subtitle: 'Roadmap kami menunjukkan bagaimana Resultity memecahkannya melalui desentralisasi.',
    intro1:
      'Pasar inferensi AI saat ini didominasi penyedia terpusat, memicu inefisiensi, risiko, dan biaya tinggi. Akar masalahnya adalah ketergantungan pada infrastruktur tunggal dan ekosistem tertutup.',
    intro2:
      'Arsitektur terdesentralisasi dapat mendistribusikan beban kerja, meningkatkan ketahanan, menurunkan biaya, dan mengembalikan kontrol data serta infrastruktur kepada komunitas.',
    cta: 'Baca roadmap',
  },

  problems: [
    {
      title: 'Biaya Tinggi',
      text:
        'Penyedia inferensi terpusat kerap menerapkan harga premium, sehingga penerapan skala besar menjadi terlalu mahal bagi banyak bisnis.',
    },
    {
      title: 'Vendor Lock-In',
      text:
        'Beralih penyedia mahal dan rumit karena API proprietari, format model, dan struktur penagihan yang tidak kompatibel.',
    },
    {
      title: 'Risiko Privasi Data',
      text:
        'Mengirim data sensitif ke server terpusat meningkatkan paparan terhadap pelanggaran dan ketidakpatuhan regulasi.',
    },
    {
      title: 'Titik Kegagalan Tunggal',
      text:
        'Infrastruktur terpusat rentan mengalami gangguan yang memengaruhi semua klien secara bersamaan.',
    },
    {
      title: 'Kustomisasi Terbatas',
      text:
        'Penyedia sering membatasi pengaturan model, parameter runtime, atau konfigurasi deployment, sehingga menghambat inovasi.',
    },
    {
      title: 'Latensi & Keterbatasan Geografis',
      text:
        'Pusat data yang jauh dari pengguna menyebabkan latensi tinggi dan menurunkan kinerja aplikasi waktu nyata.',
    },
  ],

  builtToChange: {
    title: 'Resultity: Dibangun untuk Mengubah Permainan',
    subtitle:
      'Kami membangun jaringan inferensi AI terdesentralisasi — didorong keahlian, diskalakan komunitas, dan tahan masa depan lewat tata kelola.',
    conclusion:
      '*Kami membuat inferensi menjadi murah, andal, dan praktis.* Jaringan kami membuka pasar di mana penyedia komputasi *menghasilkan pendapatan* dengan berkontribusi daya GPU — dari operator individu hingga peternakan besar. *Builder* terhubung tanpa hambatan, *memangkas biaya infrastruktur*, dan menskalakan tanpa mengorbankan kontrol atau performa. Dengan menjembatani *pasokan* dan *permintaan* dalam satu sistem terdesentralisasi, Resultity menghapus lock-in vendor, memaksimalkan pemanfaatan sumber daya, dan menjaga AI tetap terjangkau bagi yang paling membutuhkannya.\n\nResultity selaras dengan angin pendorong ini melalui *keunggulan harga (50–95% vs terpusat)*, *bagi hasil 50/50* yang transparan dengan operator node, serta *cluster SLA + pembayaran multi-rail* yang meningkatkan LTV dan memperluas permintaan yang bisa dilayani.',
  },

  features: [
    {
      title: 'Tim',
      alt: 'Tim Resultity',
      description:
        'Insinyur inti, pembuat produk, visioner, dan support — mengirim infrastruktur yang membuat inferensi terdesentralisasi layak di skala besar.',
    },
    {
      title: 'Komunitas',
      alt: 'Komunitas Resultity',
      description:
        'Jaringan penyedia komputasi dan operator AI yang berkomitmen — dari pemilik GPU tunggal hingga peternakan besar — menghadirkan kapasitas nyata dan menguji setiap lapisan stack.',
    },
    {
      title: 'DAO (Masa Depan)',
      alt: 'Resultity DAO',
      description:
        'Sistem tata kelola untuk mengamankan evolusi jaringan, menyelaraskan insentif, dan menjaga Resultity tetap terbuka, adil, dan tak terbendung.',
    },
  ],

  approach: {
    title: 'Pendekatan Kami Membangun Jaringan',
    subtitle:
      'Prinsip kunci yang menuntun Resultity menuju inferensi AI yang terjangkau, skalabel, dan andal.',
    tags: {
      affordability: 'Keterjangkauan',
      applicability: 'Keterterapan',
      reliability: 'Keandalan',
    },
    slides: [
      { header: 'API kompatibel OpenAI', text: 'Integrasi lewat *endpoint yang familiar* dan skema serupa, memangkas *waktu integrasi* dan *risiko migrasi*.' },
      { header: 'Tanpa “taman” hardware menganggur', text: 'Pasokan elastis dari node komunitas menjaga *utilisasi tinggi* sehingga Anda membayar *inferensi yang berguna*, bukan rak idle.' },
      { header: 'Kapasitas terdesentralisasi', text: 'Node terdistribusi menyerap *lonjakan permintaan* dan menghindari *titik kegagalan tunggal*, meningkatkan *ketahanan* layanan.' },

      { header: 'Subclouds', text: 'Jalankan *lingkungan terisolasi* dengan target *latensi*, *kepatuhan*, dan *runtime* khusus sesuai kebutuhan.' },
      { header: 'Model bayar per pekerjaan', text: 'Biaya selaras dengan *pekerjaan yang selesai*—mengurangi *overprovisioning* dan menghapus *jam langganan yang tak terpakai*.' },
      { header: 'Redundansi by design', text: '*Failover multi-node otomatis* dan *pekerjaan cermin* menjaga kontinuitas di bawah *beban* dan *insiden regional*.' },

      { header: 'RAG & hosting agen', text: 'Bawa *data* Anda, deploy *workflow*, dan pertahankan *kepemilikan end-to-end* dengan penyimpanan dan routing bawaan.' },
      { header: 'Model open-source dulu', text: 'Manfaatkan *model terbuka* untuk *biaya dasar lebih rendah* dan *upgrade cepat*—ganti stack tanpa *lock-in lisensi*.' },
      { header: 'Eksekusi terverifikasi', text: '*Atestasi kriptografis* dan *pemeriksaan integritas* membuktikan pekerjaan berjalan sesuai permintaan—meningkatkan *kepercayaan* antar pihak.' },

      { header: 'Tier harga kustom', text: 'Selaraskan *biaya* dengan *pola penggunaan*, *kelas model*, dan *target SLA* alih-alih tagihan serba-sama.' },
      { header: 'Tanpa overhead korporat', text: 'Lebih banyak belanja mengalir ke *operator* dan *kapasitas*, bukan *sewa kantor* atau *lapisan perantara* dengan margin tetap.' },
      { header: 'Routing berorientasi keamanan', text: 'Pekerjaan mengalir ke *node terverifikasi* dengan *postur* yang dipaksakan, mempersempit *permukaan serangan* di jaringan.' },

      { header: 'Tata kelola dikelola DAO', text: '*Aturan on-chain* dan *voting komunitas* mengarahkan upgrade dan insentif—menjaga protokol *adaptif* dan *adil*.' },
      { header: 'Harga dibentuk DAO', text: '*Insentif transparan* membuat tarif mengikuti *pasokan/permintaan nyata*—mengurangi *markup buram* dari waktu ke waktu.' },
      { header: 'Pemantauan berkelanjutan', text: '*Health check*, *benchmark*, dan *skor performa* memberi makan scheduler untuk *hasil yang dapat diprediksi*.' },

      { header: 'API plug-in, tanpa lock-in', text: '*Kompatibel API* · *subclouds* · *RAG/agen* — integrasi cepat, kontrol tetap di Anda.' },
      { header: 'Andal secara desain', text: '*Redundansi* · *pekerjaan terverifikasi* · *routing aman* · *pemantauan live*.' },
      { header: 'Bayar hanya untuk nilai', text: '*Bayar per pekerjaan* · *model terbuka* · *harga oleh DAO* · tanpa biaya idle.' },
    ],
  },

  subclouds: {
    title: 'Subclouds: AI Anda, Aturan Anda',
    subtitle:
      'Lingkungan inferensi khusus, dijalankan di infrastruktur terdesentralisasi Resultity.',
    p1:
      'Direncanakan setelah peluncuran jaringan utama, Subcloud memungkinkan Anda membuat lingkungan inferensi khusus — *dioptimalkan* untuk beban kerja Anda dan diisolasi demi *kontrol Anda*. Butuh tumpukan model tertentu, target latensi khusus, atau batas kepatuhan? *Subcloud* memberi kendalinya.',
    p2:
      'Ini adalah AI-as-a-Service, namun dengan syarat Anda. Semua deployment dapat dibayar langsung dalam *token $RTITY*, menyelaraskan penggunaan dengan pertumbuhan jaringan.',
    cta: 'Dokumentasi Subclouds',
  },

  space: {
    title: 'Space: Bangun, Hosting, Otomatiskan',
    subtitle:
      'Marketplace untuk agen, pipeline RAG, dan workflow bertenaga AI — berjalan di Resultity.',
    p1:
      'Juga dijadwalkan pasca-mainnet, *Space* akan menjadi *hub pembangunan* untuk meng-hosting dan memonetisasi aplikasi AI di atas jaringan kami.',
    p2:
      'Dari retrieval-augmented generation hingga agen otonom penuh, Space memungkinkan Anda *mendeploy layanan* yang memanfaatkan komputasi, penyimpanan, dan API terdesentralisasi.',
    p3:
      'Pembayaran dan monetisasi mengalir melalui *$RTITY*, menciptakan *ekonomi native* untuk solusi AI.',
    cta: 'Dokumentasi Space',
  },

  publicGood: {
    title: 'AI untuk Kebaikan Publik',
    subtitle:
      'Akses di tempat yang paling penting — mendukung riset, startup, dan inisiatif publik.',
    cards: {
      startups: {
        title: 'Startup',
        p:
          'Hibah non-dilutif, kredit inferensi, dan onboarding terpandu mengurangi pembakaran awal dan mempercepat peluncuran sehingga founder dapat memvalidasi pasar dan mengirim lebih cepat tanpa melepas ekuitas.',
      },
      openScience: {
        title: 'Sains Terbuka',
        p:
          'Dataset bersama, alat reprodusibilitas, dan kuota kapasitas untuk riset kolaboratif membuka akses ke model mutakhir di luar lab berbayar dan mendorong transfer pengetahuan global.',
      },
      government: {
        title: 'Pemerintah',
        p:
          'Deployment aman dengan residensi data dan auditabilitas mendukung AI berdaulat, layanan publik kritikal, dan ketahanan digital nasional di bawah kontrol kepatuhan yang jelas.',
      },
      medicine: {
        title: 'Medis',
        p:
          'Tarif preferensial untuk rumah sakit, lab, dan biotech memampukan beban kerja klinis yang menjaga privasi dengan pencatatan dan keterlacakan untuk memenuhi standar regulasi seperti HIPAA/GDPR.',
      },
      education: {
        title: 'Pendidikan',
        p:
          'Akses terjangkau untuk universitas dan sekolah teknik: paket kredit, kuota riset, dan lab bersama yang menghadirkan AI praktis ke ruang kelas dan proyek akhir.',
      },
      civicTech: {
        title: 'Civic Tech',
        p:
          'Komputasi diskon untuk LSM, platform sipil, dan inisiatif nirlaba guna menjalankan portal data terbuka, alat komunitas, dan layanan berdampak dengan biaya berkelanjutan.',
      },
    },
  },

  foundation: {
    title: 'Fondasi Keberhasilan Kami',
    subtitle:
      'Kekuatan inti yang menempatkan Resultity untuk kepemimpinan berkelanjutan di AI terdesentralisasi.',
    p1:
      '*Tim multidisipliner* berisi insinyur, pemimpin produk, dan spesialis operasi dengan rekam jejak menghadirkan infrastruktur AI yang *andal*, *skalabel*, dan *inovatif*.',
    p2:
      '*Komunitas global yang terlibat* dari penyedia komputasi dan kontributor yang terus memperluas *kapasitas* dan *ketahanan* jaringan.',
    p3:
      '*Praktik terbaik* yang mapan dalam *keamanan*, *observabilitas*, dan *disiplin operasional* — memastikan pertumbuhan berkelanjutan dan kepercayaan pada skala besar.',
  },
};

export default id;
