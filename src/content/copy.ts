// src/content/copy.ts
// Single source of truth for all site copy + per-route metadata.
// Positioning (v06): your AI gives wrong answers because your systems disagree on
// what your data means. We find where meaning breaks and make it legible.
// Built routes: / (home), /about, /contact. Writing/Point of View are EXTERNAL links.
// Locked tagline: "allostasis: stability through change." (do not alter)

// ---------- External destinations ----------
// Stored here so they are swappable when content moves in-house.
export const links = {
  // Writing (nav) → Ghost Applied AI tag (on-thesis posts).
  writing: "https://gnowledge-karden.ghost.io/tag/appliedai/",
  // Point of View anchor post. When the dedicated POV essay lands, repoint this.
  pov: "https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/",
  // LinkedIn (footer + contact page). Confirmed by operator.
  linkedin: "https://www.linkedin.com/in/jburdekin/",
};

// ---------- CTAs ----------
export const cta = {
  primaryLabel: "Request an AI Readiness Audit",
  secondaryLabel: "See why the pilot stalled",
  povLabel: "Read the point of view",
};

// ---------- Navigation ----------
// `external` items render with target="_blank" + rel="noopener noreferrer" + an affordance.
export const nav = [
  { label: "Home", href: "/", external: false },
  { label: "Writing", href: links.writing, external: true },
  { label: "About", href: "/about", external: false },
  { label: "Contact", href: "/contact", external: false },
];

// ---------- Metadata (per built route) ----------
export const meta = {
  siteTitle: "Allostasis AI",
  siteDescription:
    "We find where your organization's meaning breaks — the conflicting definitions and missing authority your AI reads — and make it legible. Start with a two-week AI Readiness Audit.",
  pages: {
    home: {
      title: "Allostasis · Why your AI gives wrong answers",
      description:
        "AI feels overhyped, random. It hallucinates. Your vision is lost. We find where your meaning breaks, and make it legible to your AI. Start with a two-week audit.",
    },
    about: {
      title: "About Julee Burdekin · Allostasis",
      description:
        "I find where a company's meaning breaks. I fix it, so the business can trust its own answers. Now its AI depends on the same thing.",
    },
    contact: {
      title: "Contact · Allostasis",
      description:
        "The first step toward an AI Readiness Audit. A two-week engagement that shows you where your meaning breaks.",
    },
  },
};

// ---------- Home ----------
export const home = {
  hero: {
    headline: "Your AI pilot stalled, and no one can say why.",
    subhead:
      "You approved it. It worked in the demo. In production it fell apart, and the post-mortem called it “a learning.” Here is what the post-mortem missed. The pilot did not fail because the AI is weak. It failed because your systems do not agree on what your data means. The next pilot hits the same wall, unless someone maps it first. That is what we do. We show you exactly where your meaning breaks. Then we fix it.",
    primaryCta: { label: cta.primaryLabel, href: "/contact" },
    secondaryCta: { label: cta.secondaryLabel, href: links.pov, external: true },
  },

  soundFamiliar: {
    heading: "Sound familiar?",
    intro: "You have probably heard some version of these:",
    items: [
      "Our AI gives different answers to the same question.",
      "It makes things up. It invents policies we never wrote.",
      "It worked in the demo. It fell apart in production.",
      "The project failed. The post-mortem just said it was a learning.",
      "Garbage in, garbage out. But we cannot find the garbage.",
      "We have all this data. The AI cannot seem to use it.",
      "Finance and Sales get different numbers from the same AI.",
      "Where do we even start getting our data ready for AI?",
    ],
    closing: "Every one of these has the same root. It is not the model. It is the meaning.",
  },

  meaning: {
    heading: "It is not the AI. It is the meaning.",
    paragraphs: [
      "To produce reliable, actionable information, your AI project design relies on a map of your organization, your vision.",
      "Across your systems, the same term means different things. Revenue. Active customer. Churn. Each department defined it years ago, in its own tools, for its own reasons. Nothing says which definition wins. So the AI reaches one, reports it with confidence, then reaches a different one tomorrow. When Finance and Sales get different numbers, the AI surfaces what was always there.",
      "When the authoritative answer is not written anywhere the AI can read, the AI acts unpredictably. You can only guess at the errors a probabilistic system will make. And those errors compound through every task downstream.",
      "This is not dirty data. It is ambiguity. And ambiguity is findable.",
    ],
  },

  whatWeDo: {
    heading: "What we do",
    intro: "We find where your meaning breaks, and we make it legible. In three moves:",
    items: [
      {
        number: "01",
        title: "We find what your AI actually touches.",
        body:
          "Not all your data. The handful of systems and artifacts your AI reads to answer the questions you care about.",
      },
      {
        number: "02",
        title: "We map where the meaning breaks.",
        body:
          "Conflicting definitions, missing authority, terms that mean different things in different places.",
      },
      {
        number: "03",
        title: "We give you the fix.",
        body:
          "A scored map of where it breaks, the authoritative definitions you are missing, and the data contracts that keep them from drifting again.",
      },
    ],
  },

  whatYouGet: {
    heading: "What you get",
    body:
      "A scored map of the data objects your AI actually touches. Each one rated where its meaning is ambiguous, conflicting, or missing. Plus the authoritative definitions and data contracts to fix the worst breaks first. Two weeks. Fixed price. Before you commit to building anything.",
  },

  noMegaproject: {
    heading: "You do not need a megaproject",
    body:
      "You do not need a year-long data overhaul to start. You need a map of the few objects your AI actually touches, and where they are ambiguous. That is a short engagement. Two weeks, not two quarters.",
  },

  toolsFit: {
    heading: "Where the tools fit",
    body:
      "You may be evaluating a semantic layer or a data catalog: dbt, Cube, Collibra, Atlan, or a graph of your own. That is the right category of tool. But those tools enforce meaning. They cannot decide it. Someone has to establish which definition is authoritative before any tool can hold the line. That decision sits upstream of every platform, and it is the part we do. We are vendor-neutral. We will help you choose, and make sure the tool is modeling something real.",
  },

  engage: {
    heading: "How we engage",
    offers: [
      {
        title: "The Audit",
        body:
          "Two weeks minimum. Fixed scope, fixed price. I lead it, and bring in specialists where your systems call for them. We map the artifacts your AI touches, find where the meaning breaks, and hand you a scored map with the definitions and data contracts to fix it. You can act on it with your team, or with ours.",
      },
      {
        title: "The Build",
        body:
          "If you want it made real, we build it with a small, senior team: the definitions, the data contracts, the structure your AI reads from. Instrumented, so you can watch it improve. Your team owns it when we leave.",
      },
    ],
    note:
      "For organizations scaling AI across more of the business, the Build can continue as an ongoing fractional engagement: meaning kept current as you change.",
    cta: { label: cta.primaryLabel, href: "/contact" },
  },

  closingCta: {
    heading: "Find out where your systems disagree.",
    body:
      "The audit takes two weeks. It tells you exactly where your meaning breaks, and what it costs every time your AI answers from the wrong place.",
    cta: { label: cta.primaryLabel, href: "/contact" },
  },
};

// ---------- About ----------
export const about = {
  heading: "I find where a company's meaning breaks.",
  paragraphs: [
    "I'm Julee Burdekin. I have spent my career across data-rich companies doing one thing: making their information mean the same thing everywhere, so the business can trust its own answers. Now their AI depends on the same thing.",
    "At Adobe, I built multi-axis metadata so a customer could land on exactly the right API for their language and their tools. At Planet, I designed a naming convention that kept satellite imagery identifiable from the ground station all the way to the analyst's workbench, so the critical insights the founders knew were magical survived the trip. At Geospan, and elsewhere, the same work.",
    "It is not a tooling purchase. It is not a cleanup project. It is recovering what your organization means, and making it legible. To your people first. Now to your AI. I am technical. I work in your real systems, from your CRM to your code. I bring in a small bench of senior specialists where the work calls for them. What starts as my experience is delivered as a team.",
  ],
  // Set off as an emphatic standalone line, then its follow-through paragraph.
  pullquote: "AI does not forget, and it does not forgive.",
  closing:
    "It acts on what you give it. Whatever your data does not say clearly, the AI will say for you. Allostasis is the practice of keeping your meaning stable while everything around it changes.",
  links: [
    { label: "Read the point of view", href: links.pov, external: true },
    { label: "Get in touch", href: "/contact", external: false },
  ],
};

// ---------- Contact ----------
// Field schema + API contract preserved exactly. Only headline/intro and the
// `challenge` options are repositioned; timeline/budget/company/role/details unchanged.
export const contact = {
  headline: "See where your systems disagree.",
  intro:
    "Tell us about your AI project and where it is going wrong. The answers that do not match. The pilot that stalled. The number Finance and Sales cannot agree on. The audit is a two-week engagement, and this is the first step toward it.",
  form: {
    fields: {
      name: { label: "Name", placeholder: "Your name", required: true },
      email: { label: "Email", placeholder: "you@company.com", required: true },
      company: { label: "Company", placeholder: "Company name", required: true },
      role: { label: "Role", placeholder: "Your role", required: false },
      challenge: {
        label: "Primary Challenge",
        placeholder: "Select a challenge",
        required: true,
        options: [
          { value: "inconsistent-answers", label: "AI gives inconsistent or wrong answers" },
          { value: "stalled-pilot", label: "A pilot stalled or failed in production" },
          { value: "conflicting-definitions", label: "Conflicting definitions across systems (e.g. Finance vs Sales)" },
          { value: "getting-started", label: "Don't know where to start getting data AI-ready" },
          { value: "tool-selection", label: "Choosing a semantic layer or data catalog" },
          { value: "scaling", label: "Scaling AI across the business" },
          { value: "other", label: "Other" },
        ],
      },
      timeline: {
        label: "Timeline",
        placeholder: "Select timeline",
        options: [
          { value: "immediate", label: "Immediate (< 1 month)" },
          { value: "quarter", label: "This quarter" },
          { value: "half-year", label: "Next 6 months" },
          { value: "year", label: "This year" },
          { value: "planning", label: "Planning stage" },
        ],
      },
      budget: {
        label: "Budget Range",
        placeholder: "Select budget",
        options: [
          { value: "< 50k", label: "Less than $50k" },
          { value: "50-100k", label: "$50k - $100k" },
          { value: "100-250k", label: "$100k - $250k" },
          { value: "250k+", label: "$250k+" },
          { value: "tbd", label: "To be determined" },
        ],
      },
      details: {
        label: "Project Details",
        placeholder:
          "Tell us about the AI project, the answers that don't match, the pilot that stalled, and what you're aiming for...",
      },
    },
    submitButton: "Request an Audit",
    requiredNote: "* Required fields",
  },
  success: {
    title: "Request received",
    message:
      "Thanks — your request has been submitted. I'll review it and get back to you, usually within 24–48 hours.",
    emailNote: "📧 A confirmation email has been sent to your address.",
  },
  error: {
    title: "Something went wrong",
  },
};

// ---------- Footer ----------
export const footer = {
  tagline: "allostasis: stability through change.",
  copyright: "© 2026 Allostasis AI.",
};

export type Copy = {
  links: typeof links;
  cta: typeof cta;
  nav: typeof nav;
  meta: typeof meta;
  home: typeof home;
  about: typeof about;
  contact: typeof contact;
  footer: typeof footer;
};

const siteCopy: Copy = {
  links,
  cta,
  nav,
  meta,
  home,
  about,
  contact,
  footer,
};

export default siteCopy;
