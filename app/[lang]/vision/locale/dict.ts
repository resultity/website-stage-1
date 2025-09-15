// app/[lang]/vision/locale/dict.ts

export type SeoMeta = {
  title: string;
  description: string;
};

export type VisionFeature = { title: string; alt: string; description: string };
export type VisionSlide = { header: string; text: string };

export type VisionDict = {
  seo: SeoMeta;                          // <-- added for <Seo {...t.seo} />
  chart: string;

  hero: { title: string; subtitle: string; cta: string };

  whatIsInference: { title: string; subtitle: string; p1: string; p2: string };

  market: { title: string; subtitle: string; p1: string };

  challenges: {
    title: string;
    subtitle: string;
    intro1: string;
    intro2: string;
    cta: string;
  };

  // Used by FeatureBoxes (title + text items)
  problems: { title: string; text: string }[];

  builtToChange: {
    title: string;
    subtitle: string;
    conclusion: string;
  };

  // For FeaturesGrid
  features: VisionFeature[];

  approach: {
    title: string;
    subtitle: string;
    tags: { affordability: string; applicability: string; reliability: string };
    slides: VisionSlide[]; // must match Slide metadata length in page
  };

  subclouds: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    cta: string;
  };

  space: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    cta: string;
  };

  publicGood: {
    title: string;
    subtitle: string;
    cards: {
      startups: { title: string; p: string };
      openScience: { title: string; p: string };
      government: { title: string; p: string };
      medicine: { title: string; p: string };
      education: { title: string; p: string };
      civicTech: { title: string; p: string };
    };
  };

  foundation: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
  };
};
