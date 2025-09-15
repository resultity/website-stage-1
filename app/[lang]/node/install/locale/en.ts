import type { NodeInstallDict } from "./dict";

const en: NodeInstallDict = {
  seo: {
    title: "RTITY Node Installation — join the testnet and start earning",
    description:
      "Install the Resultity (RTITY) Node, connect your wallet, and join the public testnet. Run open models locally and earn RCP for uptime and jobs.",
  },

  hero: {
    title: "RTITY Node Installation",
    subtitle:
      "Operators from the waitlist get early access to the testnet as binaries roll out.",
    blurb:
      "Resultity links *idle GPUs* to a global inference economy. Run open models locally, earn *fair rewards*, and retain full *sovereignty* — no lock-ins, no gatekeepers.",
    ctas: { install: "Installation", waitlist: "Join Waitlist" },
  },

  halves: {
    testnet: {
      header: "Earn RCP in the Testnet",
      subheader:
        "Install the Node, deploy open models, and get rewarded for availability and job completion — even idle time counts.",
      p1: "The *public testnet* distributes *Resultity Contribution Points* (RCP) to active nodes. These points convert into tokens after TGE.",
      p2: "Installation is simple: run the binary, link your wallet, and connect. You’ll get inference jobs or idle credits with zero manual setup.",
      cta: "Join the Testnet",
    },
    mainnet: {
      header: "Serve Jobs in the Mainnet",
      subheader:
        "Nodes earn tokens by executing AI workloads from cloud clients. Earnings scale with usage, latency, and hardware tier.",
      p1: "Inference requests are paid in tokens. *Each job* is matched with eligible nodes in real time — fast response, secure compute.",
      p2: "You stay in control: accept jobs, pause, update models — all from the dashboard or CLI. *Your node, your rules*.",
      cta: "Learn Tokenomics",
    },
  },

  installSection: {
    header: "Seamless Installation",
    subheader:
      "The node is designed as a portable binary with native performance and zero setup overhead. Linux, macOS, and Windows will be fully supported.",
    narrative:
      "All major operating systems are supported. The local application is delivered as a binary with permissions to launch subprocesses and access the file system of a personal computer or dedicated server.",
  },

  capabilities: {
    header: "Capabilities",
    subheader:
      "Operators gain full control over models, deployment, and mining — with RTITY as the reward",
    features: [
      {
        title: "Multi-node Farming",
        alt: "Multi-node Farming",
        description:
          "Run as many nodes as you want. Each node is independent, redundant, and scales your earnings.",
      },
      {
        title: "Model Strategy",
        alt: "Model Strategy",
        description:
          "Select a diverse loadout or specialize in high-demand models. You choose — the network adapts.",
      },
      {
        title: "Proof of Availability",
        alt: "Proof of Availability",
        description:
          "Stay online to earn. Even idle nodes help the network — and get rewarded for uptime.",
      },
    ],
    col1:
      "The first phase of the network launch will be an open testnet. Anyone can participate and earn RCP (Resultity Contribution Points) for various actions. These points will affect the size of each participant’s $RTITY airdrop.",
    col2:
      "To support the network and perform inference jobs, the node must have at least one model installed. A mid-range laptop or budget GPU server is sufficient to start contributing.",
  },

  deeper: {
    title: "Want to dive deeper?",
    p: "Learn how the network works, node incentives, and how to get started.",
    ctas: { cloud: "Explore the cloud", docs: "Read the docs" },
  },

  dashboard: {
    header: "One dashboard. Infinite control.",
    subheader:
      "Run your node with a single binary. Connect it to your account, and unlock full control — remotely.",
    listHeading: "What the dashboard gives you:",
    bullets: [
      "Remote control of all your nodes from one interface",
      "Live model management and versioning",
      "Job monitoring, stats, and performance insights",
      "Reward tracking and payout history",
      "Seamless Docker-based updates and installations",
    ],
    narrative:
      "Once connected, your node runs silently in the background. Thanks to its modular structure and Docker core, updates, installs, and runtime don’t interrupt your flow. Stay online, stay rewarded — with nothing but uptime and internet.",
  },

  final: {
    header: "Power the AI revolution\nFrom your own device",
    subheader:
      "Decentralized cloud compute is here — and you can be part of it. All you need is a GPU.",
    lead: "Rtity Node lets anyone contribute to AI workloads from home:",
    bullets: [
      "Run inference tasks and serve real-time responses",
      "Help train and fine-tune open-source models",
      "Earn rewards for your GPU’s compute cycles",
      "Participate in a fair, community-powered network",
    ],
    buttons: { primary: "Testnet", secondary: "Join Waitlist" },
    p: "The same GPU built for gaming or rendering now becomes a fuel source for global-scale AI. It’s not just about compute — it’s about owning part of the next wave of infrastructure.",
  },

  terminal: {
    steps: [
      {
        name: "requirements",
        text: `
[ Lightweight LLMs (~7B, quantized) ]
  • GPU: 6–10 GB VRAM (e.g., RTX 3060)
  • RAM: 16–32 GB system memory

[ Mid-size LLMs (~13B) ]
  • GPU: 16–24 GB VRAM (FP16 or quantized)
  • RAM: 32–64 GB system memory

[ Multimodal / Large LLMs (30B+) ]
  • GPU: ≥48 GB VRAM or multi-GPU setup
  • RAM: 64–128 GB system memory with fast SSD
`.trim(),
      },
      {
        name: "dependencies",
        text: `
Supported OS:
  - Windows 10+ (x64)
  - Linux (Ubuntu 20.04+)
  - macOS 12+

Dependencies:
  - GPU drivers installed (NVIDIA/AMD)
  - Docker (required)
  - Internet access
  - Open ports for node sync
`.trim(),
      },
      {
        name: "install",
        text: `
╔═════════════════╗
║ RELEASE PENDING ║
╚═════════════════╝

While the app is being baked:
▸ Check the roadmap
▸ Follow our updates
▸ JOIN THE WAITLIST

Be among the first to deploy
and shape the decentralized network.
`.trim(),
      },
      {
        name: "earn",
        text: `
╔═════════════════╗
║ TESTNET REWARDS ║
╚═════════════════╝

▸ Run a node and tune it via the dashboard
▸ Maintain uptime and serve inference jobs
▸ Join missions and community-driven activities
▸ Invite API users and new node operators

Earn RCP points → converted to $RTITY at TGE.
No staking. No buy-in. Just contribution.
`.trim(),
      },
    ],
  },
};

export default en;
