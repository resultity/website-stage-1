export type FeatureText = {
  title: string;
  alt: string;
  description: string;
};

export type UseCaseCard = {
  title: string;
  bullets: {
    who: string;
    where: string;
    tools: string;
    keyFeatures: string;
  };
  paragraph: string;
  savingTag: string;
};

export type DialogMessage = { role: "system" | "user" | "assistant"; content: string };
export type Dialog = DialogMessage[];

export type CloudDict = {
  seo: { title: string; description: string };

  hero: {
    title: string;
    subtitle: string;
    ctaSavings: string;
  };

  dropin: {
    header: string;
    subheader: string;
    p1: string;
    p2: string;
  };

  users: {
    features: FeatureText[];
    deeperTitle: string;
    deeperText: string;
    deeperCtas: { nodes: string; docs: string };
  };

  tableCompare: {
    header: string;
    subheader: string;
    headings: { criterion: string; resultity: string; centralized: string };
    rows: {
      cost: { criterion: string; rt: string; rtTag: "lower"; cz: string; czTag: "higher" };
      migration: { criterion: string; rt: string; rtTag: "seamless"; cz: string; czTag: "complex" };
      resilience: { criterion: string; rt: string; rtTag: "distributed"; cz: string; czTag: "centralized" };
      latency: { criterion: string; rt: string; rtTag: "minor"; cz: string; czTag: "lower" };
      streaming: { criterion: string; rt: string; rtTag: "same"; cz: string; czTag: "same" };
      observability: { criterion: string; rt: string; rtTag: "same"; cz: string; czTag: "same" };
    };
    tags: {
      lower: string;
      higher: string;
      seamless: string;
      complex: string;
      distributed: string;
      centralized: string;
      minor: string;
      same: string;
    };
  };

  usecases: {
    header: string;
    subheader: string;
    cards: UseCaseCard[]; 
    ctaBlock: { prompt: string; cta: string };
  };

  evolution: {
    header: string;
    subheader: string;
    steps: {
      header: string;
      subheader: string;
      bullets: string; 
    }[];
    box: { lead: string; cta: string };
  };

  migration: {
    header: string;
    subheader: string;
    p: string;
    ctaLead: string;
    ctaButton: string;
  };

  decentralized: {
    items: { title: string; text: string }[];
  };

  engage: {
    left: {
      header: string;
      subheader: string;
      paragraphs: string[];
    };
    right: {
      header: string;
      subheader: string;
      paragraphs: string[];
      note: string;
      cta: string;
    };
  };

  terminalLight: {
    labels: { headers: string; body: string };
    dialogs: Dialog[];
  };
};
