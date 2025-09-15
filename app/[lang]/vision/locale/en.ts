// app/[lang]/vision/locale/en.ts
import type { PageLocaleShape } from '@/components/locale';
import type { VisionDict } from './dict';

const en: PageLocaleShape<VisionDict> = {
  seo: {
    title: 'Resultity — Vision',
    description:
      'Resultity is an open, verifiable inference layer. Familiar APIs, no intermediaries, no lock-in.',
    keywords:
      'Resultity, RTITY, decentralized inference, AI network, subclouds, RAG, agents',
  },
  chart: 'Inference Market (USD): Actuals and Forecast',
  hero: {
    title: 'RESULTITY VISION:  Inference is the newest type of energy',
    subtitle:
      'Resultity is an open, verifiable inference layer. Familiar APIs, no intermediaries, no lock-in. Consume and supply compute under transparent rules.',
    cta: 'Explore the Market',
  },

  whatIsInference: {
    title: 'What is inference?',
    subtitle: 'Definition • How it’s delivered',
    p1:
      '*Inference* is the forward pass of a pretrained model — you send in *inputs* (*text or media data*), the model runs its computations, and you get back the *result*. In production, it’s *metered in tokens* or other units derived from *machine time*. The larger the *model* (more parameters), the higher the demand for *compute* — most often powered by *GPUs*, built for massive parallelism.',
    p2:
      '*A model* runs on dedicated *compute* and delivers its output via an *API service*. *Applications* connect, send *requests*, and receive *responses* — whether the system is *local* or in the *cloud*, this is how AI becomes part of real products.',
  },

  market: {
    title: 'Cloud Inference: A Rapidly Expanding Market',
    subtitle: 'High growth, high spend, and massive opportunities for efficiency.',
    p1:
      'AI inference is entering its scale phase: the addressable market rises from *$97.2B (2024) to ~$253.8B by 2030*, while *~90%* of an AI system’s lifecycle spend accrues at the inference stage. At the same time, data-center compute demand is set to *more than triple by 2030*, and capital poured into AI compute has surged *~7.5× in two years*. Tightening GDPR/CCPA regimes push compute closer to the data, and Llama-/Mistral-class open models now deliver enterprise-grade quality without expensive licenses.',



  },

  challenges: {
    title: 'The Challenges of Today’s Inference Market',
    subtitle: 'Our roadmap outlines how Resultity will solve them through decentralization.',
    intro1:
      'The current AI inference market is dominated by centralized providers, leading to inefficiencies, risks, and high costs. These issues stem from reliance on single infrastructures and closed ecosystems.',
    intro2:
      'A decentralized architecture can distribute workloads, improve resilience, lower costs, and return control over data and infrastructure to the community.',
    cta: 'Read roadmap',
  },

  problems: [
    {
      title: 'High Costs',
      text:
        'Centralized inference providers often impose premium pricing, making large-scale deployments prohibitively expensive for many businesses.',
    },
    {
      title: 'Vendor Lock-In',
      text:
        'Switching providers is costly and complex due to proprietary APIs, model formats, and billing structures.',
    },
    {
      title: 'Data Privacy Risks',
      text:
        'Sending sensitive data to centralized servers increases exposure to breaches and regulatory non-compliance.',
    },
    {
      title: 'Single Point of Failure',
      text:
        'Centralized infrastructure is vulnerable to outages, downtime, or service disruptions impacting all clients at once.',
    },
    {
      title: 'Limited Customization',
      text:
        'Providers often restrict model tuning, runtime parameters, or deployment configurations, limiting innovation.',
    },
    {
      title: 'Latency and Geography Constraints',
      text:
        'Centralized data centers can cause high latency for users in remote regions, degrading real-time application performance.',
    },
  ],

  builtToChange: {
    title: 'Resultity: Built to Change the Game',
    subtitle:
      'We are building a decentralized AI inference network — powered by expertise, scaled by community, and future-proofed by governance.',
    conclusion:
      '*We make inference cheap, reliable, and practical.* Our network unlocks a market where compute *providers earn* by contributing GPU power — from individual operators to large-scale farms. *Builders* connect seamlessly, *slash infrastructure costs*, and scale without sacrificing control or performance. By bridging *supply* and *demand* in one decentralized system, Resultity removes vendor lock-in, maximizes resource use, and keeps AI accessible for those who need it most. \n\nResultity aligns with these tailwinds through a *price advantage (50–95% vs centralized)*, a transparent *50/50 revenue share* with node operators, and premium *SLA clusters + multi-rail payments* that increase LTV and widen accessible demand.',
  },

  features: [
    {
      title: 'The Team',
      alt: 'Resultity Team',
      description:
        'Core engineers, product builders, visionaries, and support — shipping infrastructure that makes decentralized inference viable at scale.',
    },
    {
      title: 'The Community',
      alt: 'Resultity Community',
      description:
        'A network of committed compute providers and AI operators — from solo GPU owners to large-scale farms — delivering real capacity and testing every layer of the stack.',
    },
    {
      title: 'The DAO (Future)',
      alt: 'Resultity DAO',
      description:
        'A governance system to secure the network’s evolution, align incentives, and keep Resultity open, fair, and unstoppable.',
    },
  ],

  approach: {
    title: 'Our Approach to Building the Network',
    subtitle:
      'Key principles guiding Resultity towards affordable, scalable, and reliable AI inference.',
    tags: {
      affordability: 'Affordability',
      applicability: 'Applicability',
      reliability: 'Reliability',
    },
    slides: [
      { header: 'OpenAI-compatible API', text: 'Plug in with *familiar endpoints* and schemas, cutting *integration time* and *migration risk* for existing stacks.' },
      { header: 'No idle hardware parks', text: 'Elastic supply from community nodes keeps *utilization high* so you pay for *useful inference*, not idle racks.' },
      { header: 'Decentralized capacity', text: 'Distributed nodes absorb *demand spikes* and avoid a *single point of failure*, improving service *resilience*.' },

      { header: 'Subclouds', text: 'Spin up *isolated environments* with custom *latency*, *compliance*, and *runtime* constraints on demand.' },
      { header: 'Pay-per-job model', text: 'Spend maps to *completed work*—reducing *overprovisioning* and eliminating *unused subscription hours*.' },
      { header: 'Redundancy by design', text: 'Automatic *multi-node failover* and *mirrored jobs* maintain continuity under *load* and *regional incidents*.' },

      { header: 'RAG and agent hosting', text: 'Bring your *data*, deploy *workflows*, and keep *ownership end-to-end* with native storage and routing hooks.' },
      { header: 'Open-source models first', text: 'Leverage *open models* for *lower base cost* and *rapid upgrades*—swap stacks without *licensing lock-ins*.' },
      { header: 'Verifiable execution', text: '*Cryptographic attestations* and *integrity checks* prove jobs ran as requested—raising *trust* across parties.' },

      { header: 'Custom pricing tiers', text: 'Align *cost* with *usage patterns*, *model classes*, and *SLA targets* instead of one-size-fits-all bills.' },
      { header: 'No corporate overhead', text: 'Direct more spend to *operators* and *capacity*, not *office leases* or *middle layers* with fixed markups.' },
      { header: 'Security-first routing', text: 'Jobs flow to *verified nodes* with enforced *posture*, narrowing the *attack surface* across the network.' },

      { header: 'DAO-managed governance', text: '*On-chain rules* and *community votes* steer upgrades and incentives—keeping the protocol *adaptable* and *fair*.' },
      { header: 'Pricing shaped by the DAO', text: 'Transparent *incentives* let rates track *real supply/demand*—reducing *opaque markups* over time.' },
      { header: 'Continuous monitoring', text: '*Health checks*, *benchmarks*, and *performance scoring* feed the scheduler for *predictable outcomes*.' },

      { header: 'Plug-in API, zero lock-in', text: '*API compatible* · *subclouds* · *RAG/agents* — integrate fast, keep control.' },
      { header: 'Reliable by design', text: '*Redundancy* · *verifiable jobs* · *secure routing* · *live monitoring*.' },
      { header: 'Pay only for value', text: '*Pay-per-job* · *open models* · *DAO pricing* · no idle spend.' },
    ],
  },

  subclouds: {
    title: 'Subclouds: Your AI, Your Rules',
    subtitle:
      'Custom inference environments, deployed on Resultity’s decentralized infrastructure.',
    p1:
      'Planned after the main network launch, Subcloud will let you spin up dedicated inference environments — *fine-tuned* for your workload, isolated for *your control*. Whether you need a specific model stack, custom latency targets, or compliance boundaries, *Subcloud* gives you the levers to configure it.',
    p2:
      'It’s AI-as-a-Service, but on your terms. All deployments can be paid for directly in *$RTITY tokens*, aligning usage with network growth.',
    cta: 'Subclouds Docs',
  },

  space: {
    title: 'Space: Build, Host, Automate',
    subtitle:
      'A marketplace for agents, RAG pipelines, and AI-powered workflows — running on Resultity.',
    p1:
      'Also scheduled for post-mainnet delivery, *Space* will be *the hub for building*, hosting, and monetizing AI applications on top of our network.',
    p2:
      'From retrieval-augmented generation to fully automated agents, Space lets you *deploy services* that tap into decentralized compute, storage, and APIs.',
    p3:
      'Payment and monetization flow through *$RTITY*, creating a *native economy* for AI solutions.',
    cta: 'Space Docs',
  },

  publicGood: {
    title: 'Public-Good AI',
    subtitle:
      'Access where it matters most — supporting research, startups, and public initiatives.',
    cards: {
      startups: {
        title: 'Startups',
        p:
          'Non-dilutive grants, inference credits, and guided onboarding reduce early burn and accelerate launch so founders can validate markets and ship faster without giving up equity.',
      },
      openScience: {
        title: 'Open Science',
        p:
          'Shared datasets, reproducibility tooling, and capacity quotas for collaborative research unlock access to cutting-edge models beyond paywalled labs and promote global knowledge transfer.',
      },
      government: {
        title: 'Government',
        p:
          'Secure deployments with data-residency and auditability support sovereign AI, mission-critical public services, and national digital resilience under clear compliance controls.',
      },
      medicine: {
        title: 'Medicine',
        p:
          'Preferential rates for hospitals, labs, and biotech enable privacy-preserving clinical workloads with logging and traceability features to meet regulatory standards like HIPAA/GDPR.',
      },
      education: {
        title: 'Education',
        p:
          'Affordable access for universities and technical schools: bundled credits, research quotas, and shared labs that bring hands-on AI into classrooms and capstone projects.',
      },
      civicTech: {
        title: 'Civic Tech',
        p:
          'Discounted compute for NGOs, civic platforms, and nonprofit ventures to power open data portals, community tooling, and impact-driven services at sustainable cost.',
      },
    },
  },

  foundation: {
    title: 'Our Foundation for Success',
    subtitle:
      'Core strengths that position Resultity for sustained leadership in decentralized AI.',
    p1:
      'A *multidisciplinary team* of engineers, product leaders, and operations specialists with a track record of delivering *reliable*, *scalable*, and *innovative* AI infrastructure.',
    p2:
      'An *engaged global community* of compute providers and contributors that continuously expands the network’s *capacity* and *resilience*.',
    p3:
      'Established *best practices* in *security*, *observability*, and *operational discipline* — ensuring sustainable growth and trust at scale.',
  },
};

export default en;
