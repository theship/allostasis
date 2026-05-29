// src/content/copy.ts
// Single source of truth for all site copy + per-route metadata.
// Positioning: the organizational semantic layer. See docs/allostasis-build-spec.md §4.
// Built routes: / (home), /about, /contact. Writing/Point of View are EXTERNAL links.

// ---------- External destinations ----------
// Stored here so they are swappable when content moves in-house (see spec §4.0 / §4.3).
export const links = {
  // Writing (nav + "Read the writing →") → Ghost Applied AI tag (on-thesis posts).
  writing: "https://gnowledge-karden.ghost.io/tag/appliedai/",
  // Point of View anchor post (hero + framework + About "Read the point of view →").
  pov: "https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/",
  // LinkedIn (footer + contact page). Confirmed by operator 2026-05-29.
  linkedin: "https://www.linkedin.com/in/jburdekin/",
};

// ---------- CTAs ----------
export const cta = {
  primaryLabel: "Request an Agent-Readiness Audit",
  secondaryLabel: "Book a 25-min intro",
  povLabel: "Read the point of view",
  writingLabel: "Read the writing",
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
    "We architect the organizational semantic layer — the principles, workflows, vocabulary, and reference knowledge AI agents need to act correctly.",
  pages: {
    home: {
      title: "Allostasis · The organizational semantic layer for agent-readiness",
      description:
        "Build the semantic layer your agents are already trying to read. We architect the principles, workflows, vocabulary, and reference knowledge AI agents need to act correctly — so they stop guessing.",
    },
    about: {
      title: "About Julee Burdekin · Knowledge engineering for agent-readiness",
      description:
        "Knowledge engineering from someone who has run the engineering and built the graphs. Making your organization legible to its agents is an org-design and systems problem — Julee Burdekin practices it as a discipline.",
    },
    contact: {
      title: "Contact · Find out how legible your organization is",
      description:
        "Tell me where your agents are guessing, and I'll tell you what it's costing. Request an Agent-Readiness Audit of your organizational semantic layer.",
    },
  },
};

// ---------- Home ----------
export const home = {
  hero: {
    headline: "Build the semantic layer your agents are already trying to read.",
    subhead:
      "Every AI agent inside your organization forms a model of how you work from whatever context it can find — your docs, your code, your half-written norms. Allostasis is knowledge engineering for that reality: we architect the organizational semantic layer — the principles, workflows, vocabulary, and reference knowledge agents need to act correctly — so they stop guessing.",
    primaryCta: { label: cta.primaryLabel, href: "/contact" },
    secondaryCta: { label: cta.povLabel, href: links.pov, external: true },
  },

  problem: {
    heading: "Your organization is already being interpreted. The only question is how well.",
    paragraphs: [
      "The semantic-platform vendors have it half right: a knowledge graph is a kind of GPS for AI — it steers a model toward grounded, explainable answers instead of confident guesses. But a graph over your data is only half the map. Agents don't just need your records structured; they need to know how decisions get made here, which workflow is canonical, what a term actually means in your business, and why you do things the way you do.",
      "That layer — the organizational one — is the part nobody has owned. When it's thin or contradictory, the agent doesn't stop. It fills the gap with its best guess, and the cost of those guesses compounds quietly across every task. We call the accumulated cost **context debt**: like tech debt, but it shows up as decisions made on stale, incomplete, or invented context. Agent-readiness isn't a documentation problem. It's a semantic-layer problem at the level of the whole organization.",
    ],
  },

  whatWeDo: {
    heading: "What we do",
    items: [
      {
        number: "01",
        title: "We map the organizational semantic layer.",
        body:
          "We assess how legible your organization actually is to an agent: where vision and principles live, how operating norms are encoded, whether workflows are documented well enough to be executed rather than merely described, how reference knowledge holds up when something acts on it, and whether your vocabulary is consistent enough to be trusted. You get a clear, scored picture of where agents are guessing — and what it's costing.",
      },
      {
        number: "02",
        title: "We architect it, not just document it.",
        body:
          "A semantic layer is a design discipline, not transcription. We model the entities, relationships, controlled vocabulary, and canonical definitions an agent needs, and we structure the five layers so they reinforce each other and stay correct as the organization changes. This is ontology and knowledge-graph thinking applied to how an organization works — drawn from years of engineering management and strategic planning, not a style guide.",
      },
      {
        number: "03",
        title: "We build it to hold under scrutiny.",
        body:
          "Governed context: versioning, lineage, certification of new terms and relationships, and evaluation loops wired into how you already work — so improvements are measurable, not anecdotal, and your team owns the system after we leave.",
      },
    ],
  },

  framework: {
    heading: "The five layers of an agent-ready organization",
    layers: [
      {
        title: "Vision & principles",
        gloss: "the why, so an agent can reason about tradeoffs the way you would",
      },
      {
        title: "Operating norms",
        gloss: "the how-we-do-things-here that's usually unwritten",
      },
      {
        title: "Workflows",
        gloss: "processes documented well enough to be executed, not just described",
      },
      {
        title: "Reference knowledge",
        gloss:
          "durable facts, structured for retrieval and correct interpretation — where ontology, controlled vocabulary, and knowledge graphs live",
      },
      {
        title: "Evals & feedback",
        gloss: "how you know any of the above is actually working",
      },
    ],
    closing:
      "Most organizations have layers 3 and 4 in some form. Almost none have 1, 2, and 5. That gap is where agents fail — and it's the gap a data-only semantic layer can't close.",
    link: { label: "Read the full point of view", href: links.pov, external: true },
  },

  toolsFit: {
    heading: "Tools you may know",
    body:
      "If you're evaluating a semantic platform — Progress Semaphore, Graphwise (the merged PoolParty + Ontotext GraphDB), Collibra, or building on an RDF graph yourself — you're solving the right problem with the right category of tool. But the platform models the last 20%. The 80% that determines whether any of it works is the ontology, the governed vocabulary, and the organizational knowledge that feeds it. We do that 80% — and we'll help you choose and stand up the platform so it's modeling something worth modeling.",
    link: { label: "Read the writing", href: links.writing, external: true },
  },

  engage: {
    heading: "How we engage",
    offers: [
      {
        title: "Agent-Readiness Audit",
        body:
          "A fixed-scope, fixed-price diagnostic. We assess your organizational semantic layer against the five-layer framework — including knowledge architecture, vocabulary consistency, and agent-consumability of your existing surfaces — and deliver a scored report with prioritized, concrete fixes. The fastest way to know where you stand.",
      },
      {
        title: "Semantic Architecture Engagement",
        body:
          "A defined project to design and build the missing layers — principles, norms, workflows, ontology, evals — into a system your team can maintain, and to integrate it with whatever platform you run.",
      },
      {
        title: "Fractional Knowledge Engineering",
        body:
          "Ongoing senior partnership for organizations scaling agent use, where the semantic layer needs continuous architecture and governance, not a one-time fix.",
      },
    ],
    cta: { label: "Request an Audit", href: "/contact" },
  },

  closingCta: {
    heading: "Find out how legible your organization really is.",
    body:
      "The audit takes a week and tells you exactly where your agents are guessing — and what it's costing you.",
    cta: { label: cta.primaryLabel, href: "/contact" },
  },
};

// ---------- About ----------
export const about = {
  heading: "Knowledge engineering, from someone who's run the engineering — and built the graphs.",
  paragraphs: [
    "I'm Julee Burdekin. Before agents made organizational legibility urgent, I spent years in engineering management and strategic planning, and I built knowledge graphs and information architecture when “semantic layer” was still a back-office concern. That combination is the point. Making an organization legible to its agents isn't a writing task and it isn't pure data plumbing — it's an org-design and systems problem that happens to produce structured artifacts.",
    "The discipline the market now calls the semantic layer — taxonomies, ontologies, knowledge graphs that ground AI in real meaning — is the same discipline I've practiced, applied one level up: not just to your data, but to how your organization actually decides, operates, and knows things. That's the layer agents stand on. It's also the layer nobody has owned.",
    "Allostasis is that discipline, offered as a practice. I work with teams who've realized their agents are only as good as the context they're given — and that the context is the part no one has architected yet.",
  ],
  links: [
    { label: "Read the point of view", href: links.pov, external: true },
    { label: "Get in touch", href: "/contact", external: false },
  ],
};

// ---------- Contact ----------
// Field schema + API contract preserved exactly (see spec §4.5). Only headline/intro and
// the `challenge` options are repositioned; timeline/budget/company/role/details unchanged.
export const contact = {
  headline: "Find out how legible your organization is",
  intro: "Tell me where your agents are guessing, and I'll tell you what it's costing.",
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
          { value: "audit", label: "Agent-readiness / semantic-layer audit" },
          { value: "ontology", label: "Ontology & knowledge-graph design" },
          { value: "stale-context", label: "Agents acting on missing or stale context" },
          { value: "governance", label: "Governance & versioning of knowledge" },
          { value: "platform-selection", label: "Choosing a semantic platform (Semaphore / Graphwise / etc.)" },
          { value: "scaling", label: "Scaling agent use" },
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
        placeholder: "Tell me where your agents are guessing, what you've already tried, and what you're aiming for...",
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
  tagline: "allostasis: maintaining stability through change.",
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
