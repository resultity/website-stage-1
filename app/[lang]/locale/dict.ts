// app/[lang]/locale/dict.ts
// Type-safe dictionary contract for the Resultity homepage

export type Dict = {
  seo: {
    title: string
    description: string
  }
  hero: {
    h1: string
    sub: string
    smallLine1: string
    smallLine2: string
    ctaWaitlist: string
    ctaDocs: string
    rotator: string[]
  }
  kpis: {
    cheaperLabel: string
    cheaperSuffix: string
    withResultity: string
    forEveryInference: string
    modelPortfolio: string
    openSourceFamilies: string
  }
  whatIs: {
    header: string
    subheader: string
  }
  buildCloud: {
    header: string
    subheader: string
    bullets: {
      swap: string
      openaiCompat: string
      syncAsync: string
      overModels: string
      payg: string
      noLockin: string
      exploreCloudBtn: string
      microNote: string
      readDocsBtn: string
    }
  }
  flow: {
    title: string
    cards: {
      userApp: {
        title: string
        p1: string
        p2: string
        p3: string
        p4: string
      }
      coordination: {
        title: string
        p1: string
        p2: string
        p3: string
        p4: string
      }
      nodeExec: {
        title: string
        p1: string
        p2: string
        p3: string
        p4: string
      }
      response: {
        title: string
        p1: string
        p2: string
        p3: string
        p4: string
      }
    }
  }
  roadmap: {
    header: string
    subheader: string
    bullets: {
      now: string
      next: string
      later: string
    }
    viewBtn: string
  }
  contribute: {
    header: string
    subheader: string
    follow: {
      header: string
      sub: string
      newsBtn: string
      communityBtn: string
    }
    promote: {
      header: string
      sub1: string
      sub2: string
      aboutTestnetBtn: string
    }
    power: {
      header: string
      sub: string
      text: string
      waitlistBtn: string
      nodeBtn: string
    }
  }
  dictionary: {
    headword: string
    ipa: string
    noun: string
    def1Long: string
    def2Long: string
    def1Short: string
    def2Short: string
    usage: string
    usageText: string
    domains: string
    domainsText: string
    etymology: string
    etymologyText: string
    seeAlso: string
    inferenceApi: string
    nodes: string
    tokenomics: string
    vision: string
    internalRefs: string
    internalRefsText: string
  }
}
