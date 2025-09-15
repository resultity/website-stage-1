export type TokenomicsDict = {
  tokenomics: {
    header: string;
    subheader: string;
    legendTop: string;
    legendBottom: string;
    chart: { labels: [string, string, string] };
    sections: {
      community: {
        header: string;
        subheader: string;
        cards: { title: string; text: string }[];
      };
      team: {
        header: string;
        subheader: string;
        cards: { title: string; text: string }[];
      };
      investors: {
        header: string;
        subheader: string;
        cards: { title: string; text: string }[];
      };
    };
  };
};

export type FeatureText = {
  title: string;
  alt: string;
  description: string;
};

export type SlideText = {
  header: string;
  text: string;
};

export type TokenomicsSectionCard = { title: string; text: string };

export type TokenDict = {
  seo: { title: string; description: string };

  hero: {
    tokenLabel: string;
    ticker: string;
    ctaDetails: string;
  };

  profile: {
    header: string;
    subheader: string;
    paragraph: string;
    ctas: { roadmap: string; tokenomics: string };
  };

  featuresSection: {
    header: string;
    subheader: string;
  };

  features: FeatureText[];

  acquire: {
    header: string;
    subheader: string;
    slides: SlideText[];
  };

  spendAndHealth: {
    spend: {
      header: string;
      subheader: string;
      bullets: string[];
    };
    health: {
      header: string;
      subheader: string;
      bullets: string[];
    };
  };

  tokenomics: {
    header: string;
    subheader: string;
    legendTop: string;
    legendBottom: string;
    chart: { labels: [string, string, string] };
    sections: {
      community: {
        header: string;
        subheader: string;
        cards: TokenomicsSectionCard[];
      };
      team: {
        header: string;
        subheader: string;
        cards: TokenomicsSectionCard[];
      };
      investors: {
        header: string;
        subheader: string;
        cards: TokenomicsSectionCard[];
      };
    };
  };
};
