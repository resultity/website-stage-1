export type NavbarDict = {
  main: string;
  footerCol1:string,
  footerCol2:string,
  footerCol3:string,
  footerSubHeader: string,
  footerCopyright: string,
  runNode: string;
  products: string;
  token: string;
  privacy: string;
  company: string;
  waitlist: string;
  dropdowns: {
    // Link text arrays (already defined)
    productsLeft: { cloud: string; node: string };
    productsRight: { roadmap: string; testnet: string; architecture: string };
    companyVision: { vision: string; whitepaper: string; docs: string };
    companyCommunity: { blog: string; x: string; telegram: string };

    // Headings for dropdowns
    productsHeadings: {
      platform: string;
      development: string;
    };
    companyHeadings: {
      essentials: string;
      community: string;
    };

    // Content for Token dropdown
    token: {
      utility: string;
      totalSupply: string;
      launchDate: string;
      tba: string;
      features: {
        payments: string;
        airdrop: string;
        staking: string;
        rewards: string;
      };
      tokenomics: string;
      roadmap: string;
      // Mobile specific short versions
      supplyShort: string;
      launchShort: string;
    };
  };
};
