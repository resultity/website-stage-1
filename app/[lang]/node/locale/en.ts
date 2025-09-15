// app/[lang]/node/locale/en.ts
import type { NodeDict } from "./dict";

const en: NodeDict = {
  seo: {
    title: "Resultity Node — run models, earn, and power the network",
    description:
      "Install the Resultity Node to run models locally, receive real inference jobs, and earn based on contribution. Modular, containerized, and built for swarms.",
  },

  hero: {
    title: "Resultity Node: your GPU, powering global AI",
    subtitle:
      "Run a lightweight container, receive real inference jobs, and earn rewards.",
    blurb:
      "Every request served by *your node* helps power agents, apps, and research running on Resultity.\nYou're not just running code — you're *fueling* the next generation of decentralized AI infrastructure.",
    ctas: { install: "Installation", waitlist: "Join Waitlist" },
  },

  nodeIntro: {
    header: "Resultity Node",
    subheader: "Your inference engine in the decentralized cloud",
    p1: "Resultity Node is a *lightweight desktop app* that connects your machine to the decentralized cloud. It uses your *GPU, CPU, memory,* and storage to run models locally and communicate with the Resultity network.",
    p2: "Once online, your node *downloads models, receives inference jobs,* and keeps its state synced. It helps *maintain network stability* and *executes tasks* — earning rewards based on actual contribution.",
  },

  howItWorks: {
    header: "How it works",
    subheader:
      "From request to reward, the network runs every step transparently.",
    consumer: {
      header: "Inference Consumer",
      subheader: "Launches the request",
      p: "Chooses a model, *sends a job* to the network, and pays the fee for inference.",
    },
    cloud: {
      header: "RTITY Cloud",
      subheader: "Routes and balances",
      p: "Receives the job, applies commission, and *dispatches* it to an available node.",
    },
    node: {
      header: "RTITY Node",
      subheader: "Executes and rewards",
      p: "Keeps the network running, *performs the job* on GPU, and earns the reward.",
    },
    narrative1:
      "The node connects your GPU to the Resultity (RTITY) network. It receives jobs from the orchestrator, runs them using local models, and returns results. Models are installed and updated automatically. The node signs each task and keeps its status synced with the system.",
    narrative2:
      "Jobs come in via our API. RTITY Cloud routes them to nodes and handles payments. Part of each payment goes to the node operator, and the remainder supports the wider ecosystem. A running node with installed models counts as active support — even without jobs — and contributes to network stability.",
    deeper: {
      title: "Want to dive deeper?",
      p: "Learn how the network works, node incentives, and how to get started.",
      ctas: { cloud: "Explore the cloud", docs: "Read the docs" },
    },
  },

  supportedModels: {
    header: "Supported Model Families",
    subheader:
      "Resultity Nodes cover a wide range of transformer workloads — from chat and retrieval to vision, audio, code, and creative generation.",
    tags: {
      phase1: "Testnet",
      phase2: "Mainnet Launch",
      phase3: "Tokenized Mainnet",
    },
    slides: [
      {
        header: "Chat & Retrieval",
        text:
          "*LLMs for dialogue, Q&A, and assistants.*\n\n" +
          "Models like *LLaMA-2 (7B–70B)*, *Mistral*, and *OpenChat* power interactive sessions, summarization, and search.\n\n" +
          "*VRAM:* 8 GB+ for 7B–13B, 24 GB+ for larger variants.",
        phase: "phase1",
      },
      {
        header: "Voice & Transcription",
        text:
          "*Speech-to-text and audio agents.*\n\n" +
          "Run *Whisper*, *OpenVoice*, and similar models for live captions, transcription, or voice cloning.\n\n" +
          "*VRAM:* 4 GB+ (CPU fallback available).",
        phase: "phase2",
      },
      {
        header: "Vision & Multimodal",
        text:
          "*AI that sees and understands images.*\n\n" +
          "*Llava*, *MiniGPT-4*, *CogVLM* support OCR, captioning, diagrams, and multimodal reasoning.\n\n" +
          "*VRAM:* 12 GB+ for reliable output.",
        phase: "phase3",
      },
      {
        header: "Image Generation",
        text:
          "*Creative tools powered by diffusion.*\n\n" +
          "Models like *Stable Diffusion XL*, *Kandinsky*, and *Playground v2* handle art, prototypes, and batch rendering.\n\n" +
          "*VRAM:* 8 GB+ (16 GB+ for high-res).",
        phase: "phase2",
      },
      {
        header: "Embedding & Search",
        text:
          "*Semantic search with transformer embeddings.*\n\n" +
          "*BGE*, *InstructorXL*, and *E5* embed text for RAG, clustering, and vector similarity.\n\n" +
          "*VRAM:* 4 GB+ for base models, 8–12 GB for scale.",
        phase: "phase2",
      },
      {
        header: "Function Calling & Tools",
        text:
          "*LLMs with plugin-like capabilities.*\n\n" +
          "*OpenChat Tool*, *GPT4-Function* and *ChatML* support advanced tools, tool use, and context memory.\n\n" +
          "*VRAM:* 16 GB+ recommended.",
        phase: "phase3",
      },
      {
        header: "Code Generation",
        text:
          "*Autonomous coding assistants.*\n\n" +
          "Run *StarCoder*, *CodeLLaMA*, *DeepseekCoder* to power completions, translations, or realtime copilots.\n\n" +
          "*VRAM:* 8–16 GB+ depending on model size.",
        phase: "phase1",
      },
      {
        header: "RAG & Agents",
        text:
          "*Modular chains with memory and planning.*\n\n" +
          "*LangChain*, *Autogen*, *DSPy* support smart agents that combine local models with retrieval.\n\n" +
          "*VRAM:* 8–24 GB+ depending on context size.",
        phase: "phase2",
      },
    ],
    tryAll: {
      title: "Try them all",
      p: "Install the node and customize your model collection",
      cta: "Install Node",
    },
  },

  ideology: {
    header: "Node Ideology",
    subheader:
      "Resultity is more than infrastructure. It’s a movement for open computation, where ownership, rewards, and control stay with you — the node operator.",
    p: "Resultity is more than infrastructure — it’s a *movement for open computation*. \nBy running a node you *own your contribution*, decide your terms, and take part in building a decentralized future where compute is shared, rewarded, and governed by the community.",
    biggerIdea: { hint: "Explore the bigger idea ➪", cta: "Vision" },
    features: [
      {
        title: "Decentralized by Design",
        text: "Every Resultity node is autonomous — no centralized scheduler dictates its lifecycle. You decide when to start, update, or pause.",
      },
      {
        title: "Earn Transparently",
        text: "Contributions are measured. Work is rewarded. From GPU time to storage to bandwidth — every resource earns its share.",
      },
      {
        title: "Stay Independent",
        text: "No lock-in. No custodial wallet. Your keys, your machine, your rules. Everything is verifiable on-chain and in logs.",
      },
      {
        title: "Shape the Future",
        text: "Be more than a worker. Vote on proposals, suggest new features, and help govern the evolution of Resultity as a true compute cooperative.",
      },
    ],
  },

  designPrinciples: {
    header: "Design Principles of RTITY Node",
    subheader:
      "From solo setups to multi-node swarms — built for simplicity, performance, and transparent rewards.",
  },

  dashboard: {
    header: "Node Dashboard",
    subheader:
      "Unified control panel for live stats, model versions, node tracking, and rewards.",
    col1:
      "The Node Dashboard is a web-based control panel you can access online to manage your entire swarm of deployed nodes, jobs, and models. It synchronizes configurations, monitors inference tasks, and balances network load in real time.",
    col2:
      "You can view job history, inspect logs, track performance metrics, and adjust traffic allocations from any browser — whether you’re on a single device or overseeing a full GPU cluster. All updates and model changes are applied automatically via Docker without interrupting running tasks.",
  },

  swarm: {
    words: ["swarm", "farm", "multi-nod"],
    suffix: "ING FIRST",
    p1: "Resultity Node is built for *fleet operators* and *farming enthusiasts*. No command lines — just *launch, monitor, and scale* through a single dashboard.",
    p2: "Models and logic *update automatically*. Join the *testnet* and earn RCP across your entire *device fleet*.",
  },

  ready: {
    header: "Ready to participate?",
    p: "Let us know that you are ready to deploy at least one node",
    cta: "Join waitlist",
  },


  features: [
    {
      title: "Modular Architecture",
      alt: "Modular Node Architecture",
      description:
        "Each node includes a binary core, inference container, and isolated model store — ready to go out of the box.",
    },
    {
      title: "Containerized Runtime",
      alt: "Containerized Runtime Environment",
      description:
        "The compute environment is built on Docker, enabling fast deployment, isolation, and easy upgrades.",
    },
    {
      title: "Self-Managed Models",
      alt: "Local Model Management",
      description:
        "Models are downloaded, stored, and loaded locally — enabling fast start times and full offline capability.",
    },
  ],
};

export default en;
