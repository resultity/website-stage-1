// app/[lang]/testnet/locale/dict.ts
// Shared dictionary type used by BOTH: Testnet page and HeroContent

export type Dict = {
  seo: {
    title: string;
    description: string;
  };

  // HeroContent
  heroTitle: string;
  phase: string;
  tiles: {
    node: { title: string; subtitle: string };
    cloud: { title: string; subtitle: string };
    referral: { title: string; subtitle: string };
  };
  aria: {
    node: string;
    cloud: string;
    referral: string;
  };
  info: {
    contribute: string;
    duration: string;
    learnMore: string;
  };

  // Testnet page sections
  about: {
    header: string;
    subheader: string;
    lines: string[]; // 6 bullet lines
  };

  benefits: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
    btnMoreRCP: string;
  };

  node: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
    p3: string;
    btnInstall: string;
  };

  cloud: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
    btnAboutCloud: string;
  };

  affiliate: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
    p3: string;
  };

  rcp: {
    header: string;
    subheader: string;
    c1: string[]; // column 1 paragraphs
    c2: string[]; // column 2 paragraphs
    c3: string[]; // column 3 paragraphs
    btnMoreRCP: string;
  };

  join: {
    header: string;
    subheader: string;
    p1: string;
    btnJoinWaitlist: string;
  };
};
