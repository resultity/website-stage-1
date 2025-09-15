// components/waitlist/locale/en.ts
// English strings for the Waitlist UI

import type { WaitlistDict } from "./dict";

const en: WaitlistDict = {
  
    seo: {
    title: 'Resultity',
    description: 'Decentralized AI Inference Network',
  },
  hero: {
    h1: "How do you want to take part in the Testnet?",
    sub: "Pick one or more options below — we will follow up with the right next steps.",
  },
  labels: {
    email: "Email",
    emailPlaceholder: "name@domain.com",
    howMany: "How many?",
  },
  emailHelp: {
    empty: "Your best contact e-mail.",
    ok: "Looks good.",
    bad: "Please enter a valid e-mail.",
  },
  choices: {
    nodes: {
      title: "Operate nodes",
      counts: {
        one: "1",
        two: "2",
        threePlus: "3+",
      },
    },
    api: {
      title: "API inference",
    },
    affiliate: {
      title: "Affiliate program",
    },
    partnership: {
      title: "Partnership",
    },
  },
  actions: {
    submit: "Submit",
  },
  notices: {
    privacy:
      "We only use this to contact you about the testnet and early access.",
    privacyLink: "Privacy Policy",
  },
  feedback: {
    sent: "Submission sent.",
    error: "Please complete the required fields.",
  },
};

export default en;
