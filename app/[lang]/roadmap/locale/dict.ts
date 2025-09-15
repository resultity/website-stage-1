// app/[lang]/roadmap/locale/dict.ts
// Type-only dictionary schema used by both page and panel.

export type StationDict = {
  title: string;
  subtitle: string;
  color?: string;
  done?: boolean;
};

export type StageDict = {
  header: string;
  subheader: string;
  accentText: string;
  stations: StationDict[];
};

export type RoadmapDict = {
  seo: {
    title: string;
    description: string;
  };
  term: {
    title: string;
    footer: string;
  };
  hero: {
    levelPrefix: string;
  };
  panel: {
    nextStageFallback: string;
    nextLabelPrefix: string;
    ariaRoadmap: string;
  };
  stages: StageDict[];
};
