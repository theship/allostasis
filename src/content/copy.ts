// src/content/copy.ts
// Site copy + minimal metadata for each page.
// No PII/PHI language. Financial Services removed.

export const cta = {
  primaryLabel: "Apply AI Today",
  secondaryLabel: "Book a 25-min architecture intro",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Specializations", href: "/specializations" },
  { label: "Approach", href: "/approach" },
  { label: "Results", href: "/results" },
  { label: "Governance", href: "/governance" }, // Governance & Reliability (short route)
  { label: "Engagement", href: "/engagement" },
  { label: "Methods", href: "/methods" },
  { label: "Contact", href: "/contact" },
];

export const meta = {
  siteTitle: "Allostasis AI",
  siteDescription:
    "We design and operate specialized knowledge systems—data + human-in-the-loop + evaluation—tuned for high signal-to-noise and day-2 operations.",
  pages: {
    home: {
      title: "Specialized Knowledge Systems · High Signal-to-Noise",
      description:
        "Human-in-the-loop data pipelines, evaluation harnesses, and governance that hold up in production and under scrutiny.",
    },
    specializations: {
      title: "Specializations · Patterns adapted to domain reality",
      description:
        "Reusable building blocks tuned to workflows, latency needs, and oversight requirements.",
    },
    approach: {
      title: "Approach · A practical loop for AI—with humans in it",
      description:
        "Frame → Secure → Validate → Transfer. Traceable decisions and rollback plans.",
    },
    results: {
      title: "Results · Selected outcomes (anonymized)",
      description:
        "Anonymized impact notes: reduced manual review, faster time-to-decision, production-ready artifacts.",
    },
    governance: {
      title: "Governance & Reliability",
      description:
        "Deployment isolation, access control, change management, and operational resilience.",
    },
    engagement: {
      title: "Engagement · Work the way your team works",
      description:
        "Build-with, Build-for, and Advisory. Two-week pilot to baseline and plan.",
    },
    methods: {
      title: "Methods · Practical memos from the field",
      description:
        "Short, useful write-ups on golden sets, non-bottleneck HITL, and drift detection.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch or schedule a short architecture intro.",
    },
  },
};

// ---------- Home ----------
export const home = {
  headline: {
    line1: "Specialized",
    line2: "knowledge systems.",
    line3: "High signal-to-noise."
  },
  subhead:
    "We build human-in-the-loop data pipelines, evaluation harnesses, and governance that hold up in production and under scrutiny.",
  bullets: [
    { title: "Method first.", body: "Versioned data, prompts, and evals wired into CI." },
    { title: "Signal over noise.", body: "Golden sets and drift checks—improvements are measurable, not anecdotal." },
    { title: "Built to last.", body: "Observable pipelines with rollback plans your team can own." },
  ],
  ctaSection: {
    heading: "Ready to build something exceptional?",
    subheading: "Let's discuss how specialized knowledge systems can transform your operations.",
    buttonText: "Schedule Architecture Review"
  }
};

// ---------- Specializations ----------
export const specializations = {
  headline: "Patterns adapted to domain reality",
  intro:
    "We reuse proven building blocks and tune them to your workflows, latency needs, and oversight requirements—useful on day one, maintainable on day 400.",
  cards: [
    { title: "Civic & Urban Systems", body: "Data versioning, transparent metrics, and decision traces across mixed teams." },
    { title: "Life Sciences & Healthcare", body: "Evaluation rigor, traceable decisions, and review-friendly workflows." },
    { title: "Media & Knowledge Ops", body: "Retrieval with provenance, editorial guardrails, and latency-aware UX." },
    { title: "Scientific & R&D", body: "Reproducible datasets, experiment tracking, and domain-specific eval suites." }
  ],
  loopNote:
    "Under the hood, it's the same loop tuned to your constraints: Data → Labeling → Eval → Release",
};

// ---------- Approach ----------
export const approach = {
  headline: "A practical loop for AI—with humans in it",
  framing:
    "We optimize for traceability and steady-state operations. Every decision—data, labels, prompts, models—has a paper trail and a rollback plan.",
  loops: [
    { title: "Frame", body: "Clear outcomes, baseline, and risk register." },
    { title: "Secure", body: "Ingest plan, environment isolation, and access controls." },
    { title: "Validate", body: "Golden sets, inter-annotator agreement, eval harnesses, and drift checks." },
    { title: "Transfer", body: "Artifacts, runbook, dashboards; handover or managed operations." },
  ],
};

// ---------- Results ----------
export const results = {
  headline: "Selected outcomes (anonymized)",
  cards: [
    {
      context: "Regulated constraints and multi-party review.",
      shipped: "HITL pipeline + eval harness; targeted failure-mode tests.",
      impact: "Manual review down ~30–50%; time-to-decision from days → hours.",
      timelineScale: "N months; X–Yk items/month.",
      delivered: "Datasets, labeling guide, tests, and a production runbook.",
    },
    {
      context: "Complex domain taxonomy and evolving requirements.",
      shipped: "Versioned data pipeline + golden sets; change-log for prompts/models.",
      impact: "Regression detection in minutes; controlled rollout with rollback.",
      timelineScale: "N months; X–Y releases/quarter.",
      delivered: "Eval harness and governance framework.",
    },
    {
      context: "Hybrid automation with human checkpoints.",
      shipped: "Queueing for high-impact steps; inter-annotator agreement tracking.",
      impact: "Throughput up ~25–40% with stable quality thresholds.",
      timelineScale: "N weeks; X–Y reviewers.",
      delivered: "Guidelines, dashboards, and steady-state ops runbook.",
    },
  ],
};

// ---------- Governance & Reliability ----------
export const governance = {
  headline: "Change you can track. Systems you can trust.",
  points: [
    "Deployment isolation: your cloud VPC, on-prem, or dedicated single-tenant runtime; restricted egress supported.",
    "Access control: role-based permissions, short-lived credentials, and audit trails.",
    "Change management: thresholds, waiver process, and change logs for prompts/models.",
    "Operational resilience: backups, restore drills, dependency transparency, and clear runbooks.",
    "Standards alignment: maps cleanly to common control frameworks (e.g., ISO 27001, SOC 2).",
  ],
  isolationNote:
    "\"Isolation\" here means environment isolation—network boundaries, tenancy, and runtime separation.",
};

// ---------- Engagement ----------
export const engagement = {
  headline: "Work the way your team works",
  models: [
    { title: "Build-with", body: "We embed; you keep everything." },
    { title: "Build-for", body: "We deliver the pipeline and hand you the keys." },
    { title: "Advisory & review", body: "Independent assessment of vendors, data flows, and evals." },
  ],
  firstTwoWeeks: "Baseline & risk register, scoped pilot plan, and architecture sketch. Then go/no-go.",
};

// ---------- Methods ----------
export const methods = {
  headline: "Practical memos from the field",
  intro: "Short, useful write-ups. Quarterly cadence.",
  articles: [
    {
      id: "golden-sets",
      title: "Designing golden sets that actually predict lift",
      summary: "Golden sets that correlate with production lift and reduce noisy wins.",
      sections: [
        {
          heading: "The Problem",
          content: "Most evaluation sets are built retroactively, after models are already in production. They test what we think matters, not what actually drives outcomes."
        },
        {
          heading: "Our Approach",
          content: "Keep the golden set small, versioned, and traceable:",
          bullets: [
            "**Tie each example to a product decision.** Every test case should map to a real user need or business outcome.",
            "**Record the failure mode it represents.** Document why this case matters and what happens when it fails.",
            "**Track agreement metrics alongside model scores.** Human consensus often predicts production success better than raw accuracy."
          ]
        },
        {
          heading: "Key Principles",
          subsections: [
            { title: "Version Everything", text: "Your golden set will evolve. Track changes like code - who changed it, when, and why." },
            { title: "Start Small", text: "50 well-chosen examples beat 5,000 random ones. Quality over quantity." },
            { title: "Measure What Matters", text: "If improving your metric doesn't improve your product, you're measuring the wrong thing." }
          ]
        },
        {
          heading: "The Bottom Line",
          content: "Ship tests, not vibes. A good golden set tells you whether your changes will work before they hit production."
        }
      ]
    },
    {
      id: "hitl",
      title: "Human-in-the-loop without human bottlenecks",
      summary: "Queues, SLAs, and agreement metrics that scale decisions without stalls.",
      sections: [
        {
          heading: "The Challenge",
          content: "Adding humans to your pipeline usually means adding delays. Every manual review becomes a potential bottleneck, turning your fast AI system into a slow, expensive queue."
        },
        {
          heading: "Smart Routing, Not Everything",
          content: "The key insight: not all decisions need the same level of scrutiny.",
          bullets: [
            "**Queue only high-impact steps.** Auto-approve low-risk paths with confidence thresholds.",
            "**Measure agreement and escalate outliers.** When reviewers disagree, that's signal, not noise.",
            "**Publish SLAs and stick to them.** Optimize for cycle time, not heroics."
          ]
        },
        {
          heading: "Implementation Patterns",
          subsections: [
            { 
              title: "Confidence-Based Routing", 
              text: "High confidence (>95%) → Auto-approve\nMedium confidence (70-95%) → Single review\nLow confidence (<70%) → Committee review\nDisagreement → Escalate to expert",
              isCode: true
            },
            { 
              title: "Time-Boxing Reviews", 
              text: "Set hard limits. If review isn't complete in X hours, apply the default action. This forces prioritization and prevents backlogs." 
            },
            { 
              title: "Parallel Processing", 
              text: "Don't serialize reviews. Run them in parallel where possible, aggregate results, and move forward." 
            }
          ]
        },
        {
          heading: "Metrics That Matter",
          bullets: [
            "**Median time to decision** (not average - outliers will kill your average)",
            "**Agreement rates** between reviewers",
            "**Override patterns** - what gets changed and why",
            "**Queue depth** over time"
          ]
        },
        {
          heading: "The Payoff",
          content: "A well-designed HITL system gets you the best of both worlds: AI speed with human judgment, without the traditional tradeoffs."
        }
      ]
    }
  ]
};

// ---------- Contact ----------
export const contact = {
  headline: "Architecture Intro",
  intro: "Tell us about your challenge and we'll design a solution that fits.",
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
          { value: "data-quality", label: "Data quality & labeling" },
          { value: "evaluation", label: "Evaluation & testing" },
          { value: "human-in-loop", label: "Human-in-the-loop workflows" },
          { value: "governance", label: "Governance & compliance" },
          { value: "scale", label: "Scaling existing system" },
          { value: "new-system", label: "Building new system" },
          { value: "other", label: "Other" }
        ]
      },
      timeline: {
        label: "Timeline",
        placeholder: "Select timeline",
        options: [
          { value: "immediate", label: "Immediate (&lt; 1 month)" },
          { value: "quarter", label: "This quarter" },
          { value: "half-year", label: "Next 6 months" },
          { value: "year", label: "This year" },
          { value: "planning", label: "Planning stage" }
        ]
      },
      budget: {
        label: "Budget Range",
        placeholder: "Select budget",
        options: [
          { value: "&lt; 50k", label: "Less than $50k" },
          { value: "50-100k", label: "$50k - $100k" },
          { value: "100-250k", label: "$100k - $250k" },
          { value: "250k+", label: "$250k+" },
          { value: "tbd", label: "To be determined" }
        ]
      },
      details: {
        label: "Project Details",
        placeholder: "Tell us more about your project, current systems, and goals..."
      }
    },
    submitButton: "Submit Request",
    requiredNote: "* Required fields"
  },
  success: {
    title: "Success!",
    message: "Your request has been submitted successfully. We'll review your requirements and contact you soon.",
    emailNote: "📧 A confirmation email has been sent to your email address."
  },
  error: {
    title: "Error"
  }
};

// ---------- Footer ----------
export const footer = {
  disclaimer: "allostasis: maintaining stability through change",
  copyright: "Allostasis AI. All rights reserved."
};

// ---------- Diagram ----------
export const diagram = {
  title: "Governance Rails",
  steps: ["Data", "Labeling", "Eval", "Release"]
};

// ---------- FAQ ----------
export const faq = [
  { q: "What's \"Apply AI Today\"?", a: "A scoping conversation and brief to map your domain problem to a tractable pilot." },
  { q: "Do you fine-tune models?", a: "When warranted. We start with task design, data quality, and evals; model changes come last." },
  { q: "What do you keep after hand-off?", a: "Nothing by default—no copies of data or artifacts unless ongoing operations are contracted." },
  { q: "How do you measure success?", a: "Lift vs. baseline, cost-to-serve, and time-to-decision—captured in the eval harness." },
];

export type Copy = {
  cta: typeof cta; nav: typeof nav; meta: typeof meta; home: typeof home;
  specializations: typeof specializations; approach: typeof approach;
  results: typeof results; governance: typeof governance;
  engagement: typeof engagement; methods: typeof methods; 
  contact: typeof contact; footer: typeof footer; 
  diagram: typeof diagram; faq: typeof faq;
};

const siteCopy: Copy = {
  cta, nav, meta, home, specializations, approach, results, governance, 
  engagement, methods, contact, footer, diagram, faq,
};

export default siteCopy;