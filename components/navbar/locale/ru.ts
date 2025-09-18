import type { PageLocaleShape } from '@/components/locale';
import type { NavbarDict } from './dict';

const ru: PageLocaleShape<NavbarDict> = {
  seo: {
    title: 'Resultity',
    description: 'Децентрализованная сеть для AI инференса',
  },
  main: 'Главная',
      footerCol1:"О продукте",
  footerCol2:"Дополнительно",
  footerCol3:"Community",
  footerSubHeader: "Decentralized AI infrastructure powered by community-run nodes and tokens.",
  footerCopyright: "All rights reserved.",
  runNode: 'Запустить Ноду',
  products: 'Продукты',
  token: 'Токен $RTITY',
  privacy: 'Политика конфиденциальности',
  company: 'Компания',
  waitlist: 'ᐅ Присоединиться',
  dropdowns: {
    productsLeft: {
      cloud: 'RTITY Cloud',
      node: 'RTITY Node',
    },
    productsRight: {
      roadmap: 'Дорожная карта',
      testnet: 'Тестовая сеть',
      architecture: 'Архитектура',
    },
    companyVision: {
      vision: 'Vision',
      whitepaper: 'Whitepaper',
      docs: 'Документация',
    },
    companyCommunity: {
      blog: 'Блог',
      x: 'X',
      telegram: 'Telegram',
    },
    productsHeadings: {
      platform: 'Платформа инференса',
      development: 'Разработка',
    },
    companyHeadings: {
      essentials: 'Основное',
      community: 'Сообщество',
    },
    token: {
      utility: 'Служебный токен сети Resultity',
      totalSupply: 'Общее предложение',
      launchDate: 'Дата запуска',
      tba: 'TBA',
      features: {
        payments: 'Платежи',
        airdrop: 'Airdrop',
        staking: 'Стейкинг',
        rewards: 'Награды',
      },
      tokenomics: 'Токеномика',
      roadmap: 'Дорожная карта',
      supplyShort: 'Эмиссия',
      launchShort: 'Запуск',
    },
  },
};

export default ru;
