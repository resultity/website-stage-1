// components/waitlist/locale/dict.ts
// Types for the Waitlist localization dictionary

export type WaitlistDict = {
  seo: { title: string; description: string };
  hero: {
    h1: string;
    sub: string;
  };
  labels: {
    email: string;
    emailPlaceholder: string;
    howMany: string;
  };
  emailHelp: {
    empty: string;
    ok: string;
    bad: string;
  };
  choices: {
    nodes: {
      title: string;
      counts: {
        one: string;
        two: string;
        threePlus: string;
      };
    };
    api: {
      title: string;
    };
    affiliate: {
      title: string;
    };
    partnership: {
      title: string;
    };
  };
  actions: {
    submit: string;
  };
  notices: {
    privacy: string;
    privacyLink: string;
  };
  feedback: {
    sent: string;
    error: string;
  };
};
