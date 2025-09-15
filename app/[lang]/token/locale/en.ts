import type { TokenDict } from "./dict";

const en: TokenDict = {
  seo: {
    title: "RTITY Token — utility & incentives for decentralized inference",
    description:
      "The $RTITY token powers Resultity: credits for inference, staking & governance, ecosystem growth, and sustainable network economics.",
  },

  hero: {
    tokenLabel: "Token",
    ticker: "$RTITY",
    ctaDetails: "VIEW DETAILS",
  },

  profile: {
    header: "Token Profile",
    subheader: "Preliminary Terms & Parameters",
    paragraph:
      "*$RTITY* is an *ERC-20* utility token on an *EVM-compatible* chain. Max supply is *1,327,200,000 tokens* (fixed cap). Timelines for *TGE*, *Airdrop*, and *Public Sale* will be announced with full program details. To align incentives, most allocations will follow structured *vesting* and *lockups*. Multi-chain availability is planned via *bridges* to compatible EVM networks.",
    ctas: { roadmap: "Explore Roadmap", tokenomics: "View Tokenomics" },
  },

  featuresSection: {
    header: "Token Features",
    subheader: "Explore the power of RTITY",
  },

  features: [
    {
      title: "Inference Purchases",
      alt: "Token used for inference purchases",
      description:
        "Pay for model usage and workloads with credits or direct token spend across the Resultity catalogue.",
    },
    {
      title: "Ecosystem Development",
      alt: "Ecosystem development and grants",
      description:
        "Grants, liquidity programs, and compute credits to bootstrap builders, integrations, and research.",
    },
    {
      title: "Governance & Staking",
      alt: "Governance and staking utilities",
      description:
        "Stake to participate in governance. Long-term alignment is rewarded with additional $RTITY on top of fees.",
    },
  ],

  acquire: {
    header: "How to Acquire tokens",
    subheader: "Explore the power of RTITY",
    slides: [
      {
        header: "Airdrop",
        text:
          "Take part in the testnet, complete tasks, and earn RCP (Resultity Contribution Points).\n\nAfter the TGE, the gained *RCP points will be converted into $RTITY* and distributed to legitimate testnet contributors.\n\nAny form of activity can be rewarded.",
      },
      {
        header: "Mining",
        text:
          "Once the TGE is live, new tokens will flow to the most active ecosystem members.\n\nThe *DAO evaluates every contribution in RCP*, then routinely converts those points into $RTITY payouts.",
      },
      {
        header: "Public Sale",
        text:
          "A community-focused token sale that opens access for everyone.\n\n*ROI projections and vesting terms* will be released in the final tokenomics paper.",
      },
      {
        header: "Market Purchases",
        text:
          "We plan listings on major CEX and DEX venues, followed by deep liquidity.\n\nCross-chain support via *bridges to key EVM networks* is already on the roadmap.",
      },
      {
        header: "Node Operating",
        text:
          "More compute, more models, more uptime — more *base income*.\n\nInference jobs are paid separately, and sub-cloud rates often exceed the public market.",
      },
      {
        header: "Staking Rewards",
        text:
          "*Only staked tokens can vote* once governance is enabled.\n\nAs a thank-you for long-term alignment, stakers earn extra $RTITY on top of network fees.",
      },
      {
        header: "Affiliate Program",
        text:
          "Every user can be both a consumer and a supplier of inference.\n\nInvite new builders and earn a *share of the tokens they mine or spend*.",
      },
      {
        header: "Hackathon Awards",
        text:
          "AI moves fast — so will we.\n\nJoin Resultity hackathons, solve cutting-edge challenges, and win *$RTITY prizes*.",
      },
      {
        header: "Grants",
        text:
          "Launch products that lean on Resultity inference and receive dual-loyalty support:\n\n*free compute credits plus capital for growth*.",
      },
    ],
  },

  spendAndHealth: {
    spend: {
      header: "Where You Can Spend $RTITY",
      subheader: "Utility that fuels the network",
      bullets: [
        "*Inference Credits* – convert tokens into credits and pay for any model usage across the entire Resultity catalogue.",
        "*Subclouds* – reserve priority GPU time inside a dedicated cluster of selected cards, running in *high-priority* mode.",
        "*Space Hosting* – deploy agents, RAG pipelines, or full stories and keep them online 24/7.",
      ],
    },
    health: {
      header: "Token Health",
      subheader: "Mechanics that protect long-term value",
      bullets: [
        "Stablecoin payments trigger an *automatic buy-back* of $RTITY from the open market.",
        "*Governance actions* require staking, keeping control with committed holders.",
        "Linear *vesting schedules* for core contributors reduce sell pressure and stabilize price.",
      ],
    },
  },

  tokenomics: {
    header: "Token Allocations",
    subheader: "Explore the power of RTITY",
    legendTop: "Allocation split is preliminary and subject to change before TGE.",
    legendBottom:
      "Distribution aims to balance community incentives, contributor rewards, and long-term sustainability.",
    chart: {
      labels: ["Community & Liquidity", "Investors & Treasury", "Team"],
    },
    sections: {
      community: {
        header: "Community & Liquidity",
        subheader: "40% of Emission",
        cards: [
          { title: "Ecosystem", text: "Programs and credits that onboard thousands of users and builders." },
          { title: "Awards", text: "Testnet, hackathons, and missions that reward meaningful contribution." },
          { title: "DEX & CEX", text: "Liquidity and market-making to ensure healthy token availability." },
        ],
      },
      team: {
        header: "Team",
        subheader: "15% of Emission",
        cards: [{ title: "Founders", text: "Allocated with long-term vesting and accountability to the network." }],
      },
      investors: {
        header: "Investors & Treasury",
        subheader: "45% of Emission",
        cards: [
          { title: "Investors", text: "Strategic support for growth, infrastructure, and market expansion." },
          { title: "Treasury", text: "Operated with transparency to fund development and resilience." },
        ],
      },
    },
  },
};

export default en;
