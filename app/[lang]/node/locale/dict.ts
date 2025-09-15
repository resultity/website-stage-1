// app/[lang]/node/locale/dict.ts
// Typed dictionary schema for the Node page (no image paths inside).
export type SlideDict = {
  header: string;
  text: string;
  phase: "phase1" | "phase2" | "phase3";
};

export type FeatureItemDict = {
  title: string;
  text: string;
};

export type FeatureDict = {
  title: string;
  alt: string;            // only text stays in locales
  description: string;
};

export type NodeDict = {
  seo: { title: string; description: string };

  hero: {
    title: string;
    subtitle: string;
    blurb: string;
    ctas: { install: string; waitlist: string };
  };

  nodeIntro: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
  };

  howItWorks: {
    header: string;
    subheader: string;
    consumer: { header: string; subheader: string; p: string };
    cloud: { header: string; subheader: string; p: string };
    node: { header: string; subheader: string; p: string };
    narrative1: string;
    narrative2: string;
    deeper: { title: string; p: string; ctas: { cloud: string; docs: string } };
  };

  supportedModels: {
    header: string;
    subheader: string;
    tags: { phase1: string; phase2: string; phase3: string };
    slides: SlideDict[];
    tryAll: { title: string; p: string; cta: string };
  };

  ideology: {
    header: string;
    subheader: string;
    p: string;
    biggerIdea: { hint: string; cta: string };
    features: FeatureItemDict[];
  };

  designPrinciples: { header: string; subheader: string };

  dashboard: {
    header: string;
    subheader: string;
    col1: string;
    col2: string;
  };

  swarm: {
    words: string[];
    suffix: string;
    p1: string;
    p2: string;
  };

  ready: { header: string; p: string; cta: string };


  features: FeatureDict[];
};
