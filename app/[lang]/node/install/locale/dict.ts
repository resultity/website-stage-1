export type FeatureDict = {
  title: string;
  alt: string;
  description: string;
};

export type TerminalStep = {
  name: string;
  text: string;
};

export type NodeInstallDict = {
  seo: { title: string; description: string };

  hero: {
    title: string;
    subtitle: string;
    blurb: string;
    ctas: { install: string; waitlist: string };
  };

  halves: {
    testnet: {
      header: string;
      subheader: string;
      p1: string;
      p2: string;
      cta: string;
    };
    mainnet: {
      header: string;
      subheader: string;
      p1: string;
      p2: string;
      cta: string;
    };
  };

  installSection: {
    header: string;
    subheader: string;
    narrative: string;
  };

  capabilities: {
    header: string;
    subheader: string;
    features: FeatureDict[];
    col1: string;
    col2: string;
  };

  deeper: {
    title: string;
    p: string;
    ctas: { cloud: string; docs: string };
  };

  dashboard: {
    header: string;
    subheader: string;
    listHeading: string;
    bullets: string[];
    narrative: string;
  };

  final: {
    header: string;
    subheader: string;
    lead: string;
    bullets: string[];
    buttons: { primary: string; secondary: string };
    p: string;
  };

  terminal: {
    steps: TerminalStep[];
  };
};
