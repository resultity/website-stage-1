// app/[lang]/navbar/locale/id.ts
import type { PageLocaleShape } from '@/components/locale';
import type { NavbarDict } from './dict';

const id: PageLocaleShape<NavbarDict> = {
  seo: {
    title: 'Resultity',
    description: 'Jaringan Inferensi AI Terdesentralisasi',
  },
  main: 'Utama',
  footerCol1: 'Jelajahi',
  footerCol2: 'Sumber Daya',
  footerCol3: 'Komunitas',
  footerSubHeader:
    'Infrastruktur AI terdesentralisasi yang didukung oleh node yang dijalankan komunitas dan token.',
  footerCopyright: 'Semua hak dilindungi.',
  runNode: 'Jalankan Node',
  products: 'Produk',
  token: 'Token $RTITY',
  privacy: 'Kebijakan Privasi',
  company: 'Perusahaan',
  waitlist: 'ᐅ Bergabung ke Waitlist',
  dropdowns: {
    productsLeft: {
      cloud: 'RTITY Cloud',
      node: 'RTITY Node',
    },
    productsRight: {
      roadmap: 'Roadmap',
      testnet: 'Testnet',
      architecture: 'Arsitektur',
    },
    companyVision: {
      vision: 'Visi',
      whitepaper: 'Whitepaper',
      docs: 'Dokumentasi',
    },
    companyCommunity: {
      blog: 'Blog',
      x: 'X',
      telegram: 'Telegram',
    },
    productsHeadings: {
      platform: 'Platform Inferensi',
      development: 'Pengembangan',
    },
    companyHeadings: {
      essentials: 'Esensial',
      community: 'Komunitas',
    },
    token: {
      utility: 'Token utilitas untuk jaringan Resultity',
      totalSupply: 'Total Pasokan',
      launchDate: 'Tanggal Peluncuran',
      tba: 'TBA',
      features: {
        payments: 'Pembayaran',
        airdrop: 'Airdrop',
        staking: 'Staking',
        rewards: 'Imbalan',
      },
      tokenomics: 'Tokenomik',
      roadmap: 'Roadmap',
      supplyShort: 'Pasokan',
      launchShort: 'Peluncuran',
    },
  },
};

export default id;
