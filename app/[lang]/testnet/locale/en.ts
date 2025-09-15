// app/[lang]/testnet/locale/en.ts
// English copy for the Testnet page and HeroContent

import type { Dict } from "./dict";

const en: Dict = {
  seo: {
    title: "Resultity Testnet — phase 01",
    description:
      "Join the Resultity testnet: run nodes, stress the OpenAI-compatible API, invite builders, and earn RCP for verified contributions.",
  },

  heroTitle: "TESTNET",
  phase: "phase 01",
  tiles: {
    node: { title: "node & dashboard", subtitle: "install, control, rewards" },
    cloud: { title: "cloud & models", subtitle: "openai-compatible api" },
    referral: { title: "referral links", subtitle: "invite and earn rcp" },
  },
  aria: {
    node: "Node and Dashboard",
    cloud: "Cloud and Models",
    referral: "Referral Links",
  },
  info: {
    contribute: "contribute & earn RCP",
    duration: "testnet duration: 3+ months",
    learnMore: "ᐅ Learn more",
  },

  about: {
    header: "Testnet Goals",
    subheader: "phase 01",
    lines: [
      "*Community* grows organically and provides feedback",
      "*Nodes* get installed seamlessly and auto-update",
      "*Models* get pulled and started to fit device specs",
      "Node *Dashboard* and Cloud *Panel* are operational",
      "*RCP points* are credited correctly",
      "*Network* is ready to have new features added",
    ],
  },

  benefits: {
    header: "Participant Benefits",
    subheader: "Operate, build, or refer — your contribution is counted.",
    p1: "*One network, many roles*: run a node, consume the OpenAI-compatible API, or bring builders via referrals — every verified action earns *RCP*.",
    p2: "*Showcase and iterate*: plug your app into the testnet, gather real feedback and telemetry, and grow with the community.",
    btnMoreRCP: "More about RCP",
  },

  node: {
    header: "01. Testing RTITY Node",
    subheader: "to make inference supplies stable and reliable",
    p1: "Fulfill the installation quest and *follow the updates*.",
    p2: "Use the Dashboard to *tune your node* and maintain a healthy model mix.",
    p3: "*Earn RCP* by testing new releases of the Node Console App and customizing it.",
    btnInstall: "Install Node",
  },

  cloud: {
    header: "02. Testing RTITY Cloud",
    subheader: "to make the service faster and more precise",
    p1: "Send parallel, complex *requests*, issue API tokens, and apply high load to the Cloud. Track the task list and documentation updates.",
    p2: "*Earn RCP* by testing the sustainability and applicability of the Cloud API.",
    btnAboutCloud: "About Cloud",
  },

  affiliate: {
    header: "03. Testing the platform",
    subheader: "to make user experience perfect",
    p1: "Generate your *affiliate link* and invite node operators and inference consumers.",
    p2: "Level up your contribution to an ambassador role.",
    p3: "*Earn RCP* by growing the number of invited users; their target actions also accrue RCP.",
  },

  rcp: {
    header: "Resultity Contribution Points (RCP)",
    subheader: "Measure and reward participation",
    c1: [
      "RCP are contribution points, *not a token* and not 1:1 with any token. They provide a precise way *to gauge relative contribution* without tokenomic risk, enabling flexible calibration over time.",
    ],
    c2: [
      "RCP accrue to an account *for target actions* by the user and their referrals. During focused testing phases, payouts for specific actions may be significantly increased to accelerate learning.",
      "At the Token Generation Event (TGE), accumulated RCP will be used as *the basis for the airdrop* of $RTITY tokens to early contributors.",
    ],
    c3: [
      "RCP are a permanent mechanism in Resultity. Initially rewards are set by the team; later this authority moves to *the community and DAO*.",
      "Beyond the TGE airdrop, RCP will drive ongoing token distributions through mining-style *incentive payouts*.",
    ],
    btnMoreRCP: "More about RCP",
  },

  join: {
    header: "Join the Testnet",
    subheader: "Be among the first contributors",
    p1: "By testing Resultity you help shape a decentralized inference cloud — and secure early rewards as a testnet pioneer.",
    btnJoinWaitlist: "Join the Waitlist",
  },
};

export default en;
