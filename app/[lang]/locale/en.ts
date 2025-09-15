// app/[lang]/locale/en.ts
// English copy for the Resultity homepage

import { Dict } from "./dict"

const en: Dict = {
  seo: {
    title: "Resultity — decentralized AI inference",
    description:
      "Resultity is a decentralized inference network: open, verifiable, and designed for developers and operators. Join the early concept and help shape the first release.",
  },
  hero: {
    h1: "Resultity: global AI, powered by people",
    sub: "A new era of AI inference: open, verifiable, and accessible",
    smallLine1: "Developers get open access to inference.",
    smallLine2: "Operators power the network and share in its growth.",
    ctaWaitlist: "Join the waitlist",
    ctaDocs: "Read the docs",
    rotator: ["affordability", "security", "reliability", "anonymity", "scalability"],
  },
  kpis: {
    cheaperLabel: "Cheaper up to",
    cheaperSuffix: "than centralized AI providers",
    withResultity: "With Resultity you get",
    forEveryInference: "for every inference",
    modelPortfolio: "Model portfolio",
    openSourceFamilies: "open-source families",
  },
  whatIs: {
    header: "What is Resultity",
    subheader: "Trustless AI responses delivered via DePIN architecture",
  },
  buildCloud: {
    header: "Build with RTITY CLOUD",
    subheader: "Drop-in OpenAI-compatible endpoint",
    bullets: {
      swap: "*Swap* endpoint, *keep* your code",
      openaiCompat: "• OpenAI-compatible endpoint.",
      syncAsync: "• Sync and async requests.",
      overModels: "• Over *50 models* (text & media).",
      payg: "• Pay-as-you-go credits. Up to *80%* cheaper.",
      noLockin: "• No vendor lock-in.",
      exploreCloudBtn: "Explore the cloud",
      microNote:
        "Learn how the network works, node incentives, and how to get started.",
      readDocsBtn: "Read the docs",
    },
  },
  flow: {
    title: "The Flow",
    cards: {
      userApp: {
        title: "User App → API",
        p1: "Connect via API. Applications send requests through the OpenAI-compatible Resultity Cloud.",
        p2: "No rewrites. Only endpoint and key swap required.",
        p3: "Broad coverage. Text, code, embeddings, and media endpoints supported.",
        p4: "Auditable. All requests are signed and logged.",
      },
      coordination: {
        title: "Coordination",
        p1: "Validation. The scheduler checks every job before dispatch.",
        p2: "Smart routing. Selection by model type, region, and SLA.",
        p3: "Secure channels. Jobs move through encrypted WebSockets.",
        p4: "Transparency. Monitoring ensures predictable outcomes.",
      },
      nodeExec: {
        title: "Node Execution",
        p1: "Agent dispatch. Node Agent receives jobs and launches runtime containers.",
        p2: "Local storage. Models are cached locally for fast load and offline readiness.",
        p3: "GPU power. Inference runs on GPU with signed outputs.",
        p4: "Scalable. Multi-node farming and automatic Docker updates.",
      },
      response: {
        title: "Response",
        p1: "Fast delivery. Results return to the user in real time.",
        p2: "Billing. Credits deducted automatically from balance.",
        p3: "Fair rewards. Operators earn Resultity Contribution Points (RCP).",
        p4: "TGE conversion. RCP converts to $RTITY tokens after TGE.",
      },
    },
  },
  roadmap: {
    header: "Roadmap",
    subheader: "From testnet baking to an open, multimodal network.",
    bullets: {
      now: "• Now: *Baking Cloud & Node* for the testnet (API surface, runners, ops).",
      next: "• Next: *Multimodal* models and *IDE AI*; early partnerships.",
      later: "• Later: *TGE*, *DAO*, and auxiliary services.",
    },
    viewBtn: "View Roadmap",
  },
  contribute: {
    header: "How to contribute",
    subheader: "Become an early adopter and gain all the benefits",
    follow: {
      header: "Follow Us",
      sub: "Even a simple subscription brings metrics and involvement.",
      newsBtn: "News",
      communityBtn: "Community",
    },
    promote: {
      header: "Promote Us",
      sub1: "Resultity begins its marathon with the testnet phase.",
      sub2:
        "Get notified at launch, invite others, and earn RCP points for cloud testing and network growth.",
      aboutTestnetBtn: "About Testnet",
    },
    power: {
      header: "Power Us",
      sub: "Install RTITY Node and fuel up the network",
      waitlistBtn: "Join the waitlist",
      text: "Run background inference jobs from cloud users, *keep the network online* with installed models, and *earn RCP* during the testnet — later converted into real *$RTITY tokens* after the TGE.",
      nodeBtn: "RTITY Node",
    },
  },
  dictionary: {
    headword: "Resultity",
    ipa: "/ri-ˈzəl-tə-tee/",
    noun: "noun",
    def1Long:
      "*1.* A collective term for the condition of having produced an outcome; the substance of a result.",
    def2Long:
      "*2.* Computing, DePIN. A decentralized inference platform: a distributed GPU network delivering verifiable AI outputs via an OpenAI-compatible API, with rewards and accounting surfaced through RCP/$RTITY.",
    def1Short: "*1.* Outcome; the substance of a result.",
    def2Short: "*2.* DePIN. A decentralized GPU network delivering AI via API.",
    usage: "Usage:",
    usageText: "often capitalized when referring to the platform.",
    domains: "Domain labels:",
    domainsText: "computing; DePIN; AI inference.",
    etymology: "Etymology:",
    etymologyText: "from result + -ity.",
    seeAlso: "See also:",
    inferenceApi: "Inference API",
    nodes: "Nodes",
    tokenomics: "Tokenomics",
    vision: "Resultity Vision",
    internalRefs: "Internal refs:",
    internalRefsText: "RCP (Resultity Contribution Points); $RTITY.",
  },
}

export default en
