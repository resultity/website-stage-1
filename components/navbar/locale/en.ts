import type { PageLocaleShape } from '@/components/locale';
import type { NavbarDict } from './dict';

const en: PageLocaleShape<NavbarDict> = {
  seo: {
    title: 'Resultity',
    description: 'Decentralized AI Inference Network',
  },
  main: 'Main',
    footerCol1:"Explore",
  footerCol2:"Resources",
  footerCol3:"Community",
  footerSubHeader: "Decentralized AI infrastructure powered by community-run nodes and tokens.",
  footerCopyright: "All rights reserved.",
  runNode: 'Run a Node',
  products: 'Products',
  token: 'Token $RTITY',
  company: 'Company',
  waitlist: 'ᐅ Join Waitlist',
  dropdowns: {
    productsLeft: {
      cloud: 'RTITY Cloud',
      node: 'RTITY Node',
    },
    productsRight: {
      roadmap: 'Roadmap',
      testnet: 'Testnet',
      architecture: 'Architecture',
    },
    companyVision: {
      vision: 'Vision',
      whitepaper: 'Whitepaper',
      docs: 'Docs',
    },
    companyCommunity: {
      blog: 'Blog',
      x: 'X',
      telegram: 'Telegram',
    },
    productsHeadings: {
      platform: 'Inference Platform',
      development: 'Development',
    },
    companyHeadings: {
      essentials: 'Essentials',
      community: 'Community',
    },
    token: {
      utility: 'Utility token for the Resultity network',
      totalSupply: 'Total Supply',
      launchDate: 'Launch Date',
      tba: 'TBA',
      features: {
        payments: 'Payments',
        airdrop: 'Airdrop',
        staking: 'Staking',
        rewards: 'Rewards',
      },
      tokenomics: 'Tokenomics',
      roadmap: 'Roadmap',
      supplyShort: 'Supply',
      launchShort: 'Launch',
    },
  },
};

export default en;
