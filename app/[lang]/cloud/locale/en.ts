import type { CloudDict } from "./dict";

const en: CloudDict = {
  seo: {
    title: "RTITY Cloud — up to 80% savings on AI inference",
    description:
      "OpenAI-compatible API routed over a decentralized GPU network. Policy-driven routing, transparent metering, no lock-in. Migrate in minutes.",
  },

  hero: {
    title: "RTITY CLOUD: Save up to 80% on AI inference",
    subtitle:
      "OpenAI-compatible API over a distributed GPU network — policy-driven routing, transparent metering, no lock-in.",
    ctaSavings: "Savings by Use Case",
  },

  dropin: {
    header: "Decentralized Inference, Drop-In Simple",
    subheader: "OpenAI-compatible API, smart routing across community GPU nodes",
    p1:
      "Resultity Cloud is a *drop-in inference layer*: the same OpenAI-compatible API, but routed through a decentralized network of community GPU nodes. You switch the endpoint and key — nothing else. Infrastructure stays current, models are diverse, and performance scales automatically without central chokepoints.",
    p2:
      "Choosing Resultity means *up to 80% lower cost*, access to *50+ production-ready models* (7B–70B, text, code, vision, audio), and *minutes to migrate* without rewrites. No egress fees, no vendor lock-in — just scalable inference with the flexibility to pick the right model for every workload.",
  },

  users: {
    features: [
      {
        title: "For Developers",
        alt: "Developers and no-code builders",
        description:
          "Power IDE assistants and automation flows using an OpenAI-compatible API. Early-stage startups can ship MVPs without rewrites, keep stacks portable, and control usage via quotas and telemetry.",
      },
      {
        title: "For Researchers",
        alt: "Researchers, students, and public sector teams",
        description:
          "Run experiments and classroom projects with reproducible configs and versioned models. Use policy controls and audit-ready logs to manage access and track activity at scale.",
      },
      {
        title: "For Business Teams",
        alt: "Businesses and product teams",
        description:
          "Add AI features to customer workflows via tenant-aware keys, metering, and routing guardrails. Growing startups and SMBs operate reliably across environments with predictable, transparent costs.",
      },
    ],
    deeperTitle: "Want to dive deeper?",
    deeperText: "Learn how the network works, node incentives, and how to get started.",
    deeperCtas: { nodes: "Inference Nodes", docs: "Read the docs" },
  },

  tableCompare: {
    header: "Resultity vs Centralized Clouds",
    subheader: "Drop-in, OpenAI-compatible routing over a distributed GPU network — compare at a glance.",
    headings: { criterion: "Criterion", resultity: "Resultity Cloud", centralized: "Centralized Clouds" },
    rows: {
      cost: {
        criterion: "Cost per inference",
        rt: "Up to 80% lower via community supply",
        rtTag: "lower",
        cz: "Premium pricing, egress and quota add-ons",
        czTag: "higher",
      },
      migration: {
        criterion: "Migration & compatibility",
        rt: "OpenAI-compatible; switch endpoint/key in minutes",
        rtTag: "seamless",
        cz: "Proprietary APIs, code rewrites, contracts",
        czTag: "complex",
      },
      resilience: {
        criterion: "Resilience & routing",
        rt: "Decentralized routing, Subcloud isolation",
        rtTag: "distributed",
        cz: "Region/provider dependencies",
        czTag: "centralized",
      },
      latency: {
        criterion: "Latency",
        rt: "Slightly higher in some regions due to node distribution",
        rtTag: "minor",
        cz: "Optimized data-center peering keeps latency very low",
        czTag: "lower",
      },
      streaming: {
        criterion: "Streaming & batching",
        rt: "Supported via compatible endpoints",
        rtTag: "same",
        cz: "Supported across major APIs",
        czTag: "same",
      },
      observability: {
        criterion: "Observability & metering",
        rt: "Transparent usage, per-tenant keys",
        rtTag: "same",
        cz: "Usage dashboards, billing meters",
        czTag: "same",
      },
    },
    tags: {
      lower: "Lower",
      higher: "Higher",
      seamless: "Seamless",
      complex: "Complex",
      distributed: "Distributed",
      centralized: "Centralized",
      minor: "Minor trade-off",
      same: "Same",
    },
  },

  usecases: {
    header: "High-Impact Use Cases",
    subheader: "Optimized experience and significant savings on the scenarios companies rely on every day",
    cards: [
      {
        title: "IDE & Dev Tools",
        bullets: {
          who: "Who: Developers, plugin authors",
          where: "Where: VS Code, JetBrains, terminals, CLIs",
          tools: "Tools: Extensions, LSP hooks, CLI helpers",
          keyFeatures: "Key features: OpenAI-compatible API, pinned models",
        },
        paragraph: "Connect inline copilots and refactors without rewrites; keep configs reproducible across teams.",
        savingTag: "Reduce spend ~60–75%",
      },
      {
        title: "Knowledge & Retrieval",
        bullets: {
          who: "Who: Data teams, ML engineers",
          where: "Where: Doc stores, ticketing, wikis, BI",
          tools: "Tools: Embeddings API, pgvector, Pinecone, Weaviate",
          keyFeatures: "Key features: regional routing, reproducible runs",
        },
        paragraph: "Build enterprise search and Q&A with stable embeddings and predictable spend.",
        savingTag: "Reduce spend ~40–70%",
      },
      {
        title: "User Applications",
        bullets: {
          who: "Who: SaaS teams, no-code builders, startups",
          where: "Where: Web/mobile apps, plugins, backends",
          tools: "Tools: n8n, Zapier, serverless functions",
          keyFeatures: "Key features: drop-in API, instant switch",
        },
        paragraph: "Ship chat, assist, and automation features fast with portable integration.",
        savingTag: "Reduce spend ~50–70%",
      },
      {
        title: "Enterprise Systems",
        bullets: {
          who: "Who: Enterprise IT, solution providers",
          where: "Where: ERP, CRM, ITSM, analytics",
          tools: "Tools: API gateways, SDKs, middleware",
          keyFeatures: "Key features: per-tenant keys, policy controls, audits",
        },
        paragraph: "Embed tenant-aware inference into core systems without re-architecting billing or access.",
        savingTag: "Reduce spend ~40–60%",
      },
      {
        title: "Agents & Workflows",
        bullets: {
          who: "Who: Product, ops, automation teams",
          where: "Where: Job queues, orchestrators, RPA",
          tools: "Tools: LangChain, Airflow, temporal, CI/CD",
          keyFeatures: "Key features: private Subclouds, routing guardrails",
        },
        paragraph: "Run background agents and pipelines with isolation, quotas, and auditable execution.",
        savingTag: "Reduce spend ~50–80%",
      },
      {
        title: "Speech & Vision",
        bullets: {
          who: "Who: Support teams, media apps, operations",
          where: "Where: Call centers, meeting tools, media pipelines",
          tools: "Tools: ASR (Whisper-class), TTS, image recognition/generation",
          keyFeatures: "Key features: streaming, batch modes, regional routing",
        },
        paragraph: "Power transcription, voice bots, and visual automation closer to users.",
        savingTag: "Reduce spend ~60–70%",
      },
    ],
    ctaBlock: { prompt: "Found what fits your needs? Let us know", cta: "Join waitlist" },
  },

  evolution: {
    header: "RTITY Cloud Evolution",
    subheader:
      "Resultity Cloud evolves from a free Testnet into a tokenized Mainnet — expanding from basic chat and code inference to media, embeddings, and Subcloud clusters. Each stage adds stronger economics, community governance, and predictable pricing. The path is designed to keep inference open, affordable, and continuously upgraded without vendor lock-in.",
    steps: [
      {
        header: "Testnet",
        subheader: "Chat and code, async/sync flows",
        bullets:
          "*Scope:* Chat Completions and Code Generation for daily needs\n" +
          "*Incentives:* Every consumer earns RCP points and joins airdrops\n" +
          "*Pricing:* Free with limits, or via testnet tokens",
      },
      {
        header: "After Mainnet Launch",
        subheader: "Media support, batch jobs, stablecoins",
        bullets:
          "*Scope:* Partial support for media + embeddings, batch & competitive requests\n" +
          "*Payments:* Stablecoins as a temporary option\n" +
          "*Market fit:* Partner onboarding, pricing balanced by real supply and demand",
      },
      {
        header: "Tokenized Mainnet",
        subheader: "Full media, embeddings, Subclouds",
        bullets:
          "*Scope:* Full support for media and embeddings\n" +
          "*Subclouds:* Rent clusters with routing + isolation for SLA\n" +
          "*Payments:* $RTITY tokens with pre-purchased credits\n" +
          "*Programs:* Startup and social tracks\n" +
          "*Pricing:* Competitive vs market offers",
      },
    ],
    box: {
      lead: "Milestones of RTITY Cloud — see what’s next",
      cta: "Roadmap",
    },
  },

  migration: {
    header: "Effortless Migration to the RTITY Cloud",
    subheader:
      "Keep your OpenAI-compatible interface — just change the endpoint and key to unlock lower costs, higher reliability, and transparent governance.",
    p:
      "Switching to Resultity Cloud is frictionless: in most cases it means *just updating your API endpoint and key*. You keep the same OpenAI-compatible interface, but gain *lower costs*, *better reliability*, and *transparent governance* powered by community nodes and token incentives.",
    ctaLead: "Explore the bigger idea ➪",
    ctaButton: "Vision",
  },

  decentralized: {
    items: [
      { title: "Relevant Pricing", text: "Costs reflect real market conditions, shaped by both providers and users, staying fair and predictable without hidden markups." },
      { title: "Flexibility", text: "Switch between models, configs, and workloads instantly, adapting to experiments or production tasks without overhead." },
      { title: "Resilience", text: "Decentralized routing provides redundancy and failover, ensuring tasks continue even under outages or regional disruptions." },
      { title: "Privacy", text: "Requests are cryptographically signed and processed locally, keeping data anonymous and compliant with GDPR and CCPA." },
      { title: "No Hardware Lock-In", text: "Use community GPU capacity instead of building your own fleet, cutting upfront costs and management complexity." },
      { title: "Open Access", text: "Transparent, permissionless entry ensures developers and businesses can join or leave the network without barriers." },
    ],
  },

  engage: {
    left: {
      header: "Get Involved",
      subheader: "Three straightforward ways to contribute today",
      paragraphs: [
        "*Join the Testnet* — run real requests, surface issues, and help validate routing, limits, and pricing envelopes.",
        "*Developers & Node Operators* — bring new contributors to expand coverage and speed up feature rollout across regions.",
        "*Referrals & Rewards* — connect other projects, earn referral income, and qualify for community airdrops tied to adoption.",
        "*Startups & Live Services* — integrate early, share requirements, and co-design production paths that fit your workloads.",
        "*Tell us your needs and ideas* — join the waitlist and become an early adopter.",
      ],
    },
    right: {
      header: "What You Get",
      subheader: "Practical value for early participants",
      paragraphs: [
        "*Your requests prioritized* — we track recurring needs and fold them into GA configs, model menus, and defaults.",
        "*Direct maintainer feedback* — fast loops on routing targets, rate limits, and API surface as features harden.",
        "*Early capacity planning* — pre-request Subcloud shapes and regions so launch windows align with your demand.",
      ],
      note: "Priority access. Your requests heard. Direct impact on the roadmap.",
      cta: "Join Waitlist",
    },
  },

  terminalLight: {
    labels: { headers: "Headers:", body: "Body:" },
    dialogs: [
      [{ role: "user", content: "How do I cook pasta in a rice cooker?" }],
      [
        { role: "system", content: "You are a concise assistant." },
        { role: "user", content: "Give me 3 quick tips to speed up Node.js APIs." },
      ],
      [
        { role: "user", content: "Summarize the pros and cons of RAG vs fine-tuning in 5 bullets." },
        { role: "assistant", content: "RAG pros: fresh info, smaller base model... cons: retrieval infra..." },
        { role: "user", content: "Now add one concrete example for each approach." },
      ],
      [
        { role: "system", content: "Answer with bullet points only." },
        { role: "user", content: "Keep it framework-agnostic." },
      ],
      [{ role: "user", content: "Explain how JSON Web Tokens work to a junior developer." }],
      [
        { role: "system", content: "Always include a short code example when relevant." },
        { role: "user", content: "How do I debounce a function in JavaScript?" },
      ],
      [
        { role: "user", content: "What is the difference between Docker image and container?" },
        { role: "assistant", content: "An image is a template; a container is a running instance." },
        { role: "user", content: "List typical commands to inspect a running container." },
      ],
      [{ role: "user", content: "Give me a regex to validate ISO8601 date (YYYY-MM-DD) and explain it." }],
      [
        { role: "system", content: "Be strictly accurate and prefer standards references." },
        { role: "user", content: "What is the correct HTTP status code for a validation error?" },
      ],
      [{ role: "user", content: "I have an array of 10M integers. Outline approaches to get the 100 largest values quickly." }],
    ],
  },
};

export default en;
