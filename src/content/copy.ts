// src/content/copy.ts
// Single source of truth for all site copy + per-route metadata.
//
// Positioning spine (build spec v2.1 — "the field-guide inversion"):
//   the vision gap / data objects / data contracts.
// The canonical long-form artifact is the Agent-Readiness Field Guide at
// /agent-readiness — six layers in process order, seven tests. The homepage is a
// router: name the reader, state the thesis, point at the guide and the audit.
//
// Built routes: / (home), /agent-readiness (Field Guide), /about, /contact.
// Writing remains an EXTERNAL link to the Ghost blog (demoted in nav).

// ---------- Destinations ----------
export const routes = {
  home: "/",
  fieldGuide: "/agent-readiness",
  about: "/about",
  contact: "/contact",
};

// External destinations only. The "point of view" link is no longer external —
// it now resolves to the on-domain Field Guide (routes.fieldGuide).
export const links = {
  // Writing (nav) → Ghost Applied AI tag. The one permitted Ghost URL; the
  // @next/mdx wiring stays in place for a future on-site migration.
  writing: "https://gnowledge-karden.ghost.io/tag/appliedai/",
  linkedin: "https://www.linkedin.com/in/jburdekin/",
};

// ---------- CTAs ----------
export const cta = {
  primaryLabel: "Request an Agent-Readiness Audit",
  auditShortLabel: "Request an Audit",
  fieldGuideLabel: "Read the Field Guide",
};

// ---------- Navigation ----------
// `external` items render with target="_blank" + rel="noopener noreferrer" + an affordance.
export const nav = [
  { label: "Home", href: routes.home, external: false },
  { label: "Field Guide", href: routes.fieldGuide, external: false },
  { label: "Writing", href: links.writing, external: true },
  { label: "About", href: routes.about, external: false },
  { label: "Contact", href: routes.contact, external: false },
];

// ---------- Metadata (per built route) ----------
export const meta = {
  siteTitle: "Allostasis AI",
  siteDescription:
    "Your agents act on your data objects — and only on those. Where the objects don't carry your vision, agents guess. We find the vision gap and close it.",
  pages: {
    home: {
      title:
        "Allostasis · Agent-readiness for organizations that run agents on themselves",
      description:
        "Your agents act on your data objects — and only on those. Where the objects don't carry your vision, agents guess. We find the gap and close it. Read the Agent-Readiness Field Guide — six layers, seven tests you can run this week — or request an audit.",
    },
    about: {
      title: "About Julee Burdekin · Allostasis",
      description:
        "I find where a company's meaning breaks. I fix it, so the business can trust its own answers. Now its AI depends on the same thing.",
    },
    contact: {
      title: "Contact · Allostasis",
      description:
        "The first step toward an Agent-Readiness Audit — a fixed-scope diagnostic that shows you where your agents are guessing.",
    },
  },
};

// ---------- Engagement offers (SINGLE SOURCE OF TRUTH) ----------
// Rendered identically by the homepage (§4.3) and the Field Guide (§3.2 "How to
// work with us"). Do not fork this copy into either page.
export const offers = [
  {
    kicker: "01 · DIAGNOSTIC",
    name: "The Agent-Readiness Audit",
    body:
      "A fixed-scope, fixed-price diagnostic. You get: a scored map of all six layers against our rubric (which you keep); the ten-term diff run across your actual systems, with every divergence documented; a rescue-count baseline on named workflows; a map of which steps in those workflows are deterministic and currently left to agent judgment; and three data contracts your leadership needs to ratify to unblock the program. The fastest way to know where you stand.",
    // TODO(operator): add duration ("N weeks") to this meta line when decided — do not invent.
    meta: "Fixed scope, fixed price",
  },
  {
    kicker: "02 · BUILD",
    name: "The Semantic Architecture Engagement",
    body:
      "A defined project to close the gaps the audit found: principles written to be cited, the vocabulary contracted and the domain model ratified as a control surface for agent reasoning, the deterministic boundary drawn and encoded as machinery, workflows rebuilt as execution surfaces from observed runs, and judgment ownership made explicit in the architecture. It integrates with whatever platform you run, and your team owns it after we leave. Scoped from the audit; we bring in senior specialists as the work requires.",
    meta: "Defined project, scoped from the audit",
  },
  {
    kicker: "03 · RETAINER",
    name: "Fractional Knowledge Engineering",
    body:
      "Ongoing senior partnership for organizations scaling agent use, where the semantic layer needs continuous architecture, governance, and evals. Not a one-time fix. Monthly retainer, with quarterly leadership briefings that translate rescue counts and consistency metrics into P&L language.",
    meta: "Monthly retainer",
  },
];

// ---------- Home ----------
// Compresses to roughly two screens: hero → thesis → engage → closing CTA.
export const home = {
  hero: {
    headline: "An agent with a vision performs better",
    subhead:
      "For CTOs, platform leads, and founders deploying AI agents against their own organization: every agent builds its picture of how you work from the data objects it can reach. Where those objects don't carry your vision, the agent fills the gap with a guess confidently, at scale. We map where your vision is leaking out of the objects your agents read, and what it takes to close the gap.",
    primaryCta: { label: cta.fieldGuideLabel, href: routes.fieldGuide },
    secondaryCta: { label: cta.primaryLabel, href: routes.contact },
  },

  thesis: {
    heading: "The vision gap",
    paragraphs: [
      "Everything valuable in your company begins as leadership vision, and realizing it generates data objects all over the org — specs, code, pipelines, CRM records, support threads. Almost none of those objects were designed to carry the vision that produced them, so they drift: the same entity named three ways, definitions current in one system and stale in another, reasoning that lives in someone's head while the object records only the steps.",
      "Humans absorb that drift with judgment. Agents can't. They act on the objects literally, at scale, and carry every ambiguity into every task downstream. We call the distance between what leadership means and what the objects say the vision gap. Closing it is architecture work, not transcription work. And it's the part of agent-readiness no one in the org chart currently owns.",
      "The full argument — six layers in process order, with seven tests you can run on your own organization this week — is in the Field Guide.",
    ],
    link: {
      label: "Read: How Much of Your Vision Can Your Agents Actually See?",
      href: routes.fieldGuide,
    },
  },

  engage: {
    heading: "How we engage",
  },

  closingCta: {
    heading: "Find out how much of your vision your agents can actually see.",
    body:
      "The audit is fixed-scope and fixed-price, and tells you exactly where your agents are guessing — and what it's costing you.",
    cta: { label: cta.primaryLabel, href: routes.contact },
  },
};

// ---------- Field Guide types (build spec v2.1 §2) ----------
export type LayerBlock = {
  /** Sub-block heading, e.g. "Failure pattern" / "The tradeoff-probe test" / "Passing the bar". */
  label: string;
  body: string;
};

/** Used only by Layer 01, which splits into 01a and 01b. */
export type LayerPart = {
  id: "01a" | "01b";
  name: string;
  intro: string;
  failurePattern: LayerBlock;
  test: LayerBlock;
  good: LayerBlock;
};

export type LayerGroupId = "substrate" | "decisions" | "loop";

export type Layer = {
  number: "01" | "02" | "03" | "04" | "05" | "06";
  name: string;
  tagline: string;
  group: LayerGroupId;
  /** REQUIRED for every layer — the paragraph between tagline and sub-blocks. */
  intro: string;
  /** Present only on Layer 01. */
  parts?: LayerPart[];
  /** Present on Layers 02–06 (absent when `parts` is used). */
  failurePattern?: LayerBlock;
  test?: LayerBlock;
  good?: LayerBlock;
};

// ---------- Field Guide (/agent-readiness) ----------
// The canonical long-form artifact. Six layers in process order, grouped 2–3–1;
// seven tests total (Layer 01 carries two, in parts 01a and 01b).
export const fieldGuide = {
  meta: {
    title:
      "Organizational Legibility: Six Layers, Seven Tests · Agent-Readiness Field Guide · Allostasis",
    description:
      "A working reference on where agent context comes from, where it breaks, and how to test for the breaks. Six layers in process order, with seven tests you can run in-house.",
    ogTitle: "Organizational legibility: six layers, seven tests",
    ogDescription: "Field Guide · Allostasis",
  },

  kicker: "Field Guide",
  title: "Organizational legibility: six layers, seven tests",
  subtitle:
    "A working reference on where agent context comes from, where it breaks, and how to test for the breaks. Every test here runs in-house, with the tools and access you already have.",

  // Maintained by hand; bump on edits. `updatedISO` backs the JSON-LD dateModified.
  updated: "July 2026",
  updatedISO: "2026-07-30",
  // Computed from the guide's body copy (~2,500 words @ 225wpm); recompute on edits.
  readingTimeMinutes: 11,

  opening: {
    paragraphs: [
      "You've deployed agents. The model is state-of-the-art, the orchestration is competent, the demos are good. Then the agent makes a decision nobody on the team would make. Before filing it under hallucination or harness failure, consider a third explanation: the decision was correct for the organization described in the objects the agent could reach. That organization just isn't yours.",
      // TODO(operator): opening stat. When you have ONE verified citation (MIT NANDA
      // pilot-failure figures, METR agent-reliability findings, or agents.md/llms.txt
      // adoption as a field signal), insert it as its own sentence at the end of this
      // paragraph, cited by source name. Do not insert anything unverified.
      "An agent builds its picture of your company from data objects: schemas, records, code, docs, tickets, half-written conventions. Where those objects are thin or contradictory, it doesn't stop to ask. It fills the gap with a statistically plausible guess. The guess compounds through every task downstream. This guide covers where that gap comes from, how to measure it, and what closing it actually consists of.",
    ],
  },

  reframe: {
    heading: "Agent-readiness is not a documentation problem.",
    paragraphs: [
      "The instinct when an agent fails is to write more documentation. It's the wrong instinct, and it's why \"we documented everything and the agent still guesses\" is such a common report.",
      "Here's the mechanism. Everything load-bearing in a company starts as somebody's model: a founder's thesis, a product lead's model of the customer, a researcher's understanding of why the system works. Executing on that model generates information all over the org: specs, code, pipelines, CRM records, support threads. Each of those is a data object, and almost none of them were designed to carry the reasoning that produced them. So the objects drift: the same entity named three ways, a definition current in one system and stale in another, the rationale for a workflow living in someone's head while the object records only the steps.",
      "Humans absorb that drift with judgment. We ask a colleague, read the room, find that spreadsheet. Agents act on the objects literally, at scale. Drift that used to cost onboarding time and support tickets now costs wrong decisions made confidently. And splitting the work across multiple agents makes it worse, not better: every handoff is a place context dies.",
      "We call the distance between what leadership means and what the objects say the vision gap. Agent-readiness is the work of closing it: architecture work, not transcription work. That distinction drives everything that follows.",
    ],
  },

  layersIntro: {
    heading: "Six layers, in process order with seven tests",
    body:
      "An agent-ready organization is built in process order: first the substrate agents read, then three decisions about how the work is organized, then the loop that proves the rest is working. The three middle layers look like engineering choices, but they're auditable properties of your organization. An org can fail every one of them before a single agent is deployed. Each layer below has a failure pattern, a test, and Passing the bar. None of the tests needs new tooling; run all seven and you'll have an honest map of where you stand.",
  },

  // Exactly 3 — rendered as section headers before the first layer of each group.
  layerGroups: [
    { id: "substrate", heading: "The substrate: what your agents read" },
    {
      id: "decisions",
      heading:
        "The build decisions: auditable properties of how you've organized the work",
    },
    { id: "loop", heading: "The loop: how you know any of it is working" },
  ] as Array<{ id: LayerGroupId; heading: string }>,

  // Exactly 6. Layer 01 carries `parts` (01a/01b) instead of flat sub-blocks.
  layers: [
    {
      number: "01",
      name: "The legible substrate",
      tagline:
        "Meaning carried into objects: first the judgment, then the vocabulary.",
      group: "substrate",
      intro:
        "This layer is half the work. It has two parts, because objects have to carry two different kinds of meaning: how your leadership decides, and what your terms denote. Miss the first and agents reason like a generic company. Miss the second and they reason precisely about entities that don't quite exist.",
      parts: [
        {
          id: "01a",
          name: "Vision & principles",
          intro:
            "Every organization runs on a set of positions its leadership treats as settled: what to optimize, what to refuse, which tradeoffs are already decided. Very little of that is usually written anywhere an agent can retrieve it. When an agent hits a genuine tradeoff, it should be reasoning from your positions not from the median opinion of its training data.",
          failurePattern: {
            label: "Failure pattern",
            body:
              "The vision exists in pitch decks, all-hands recordings, and the founder's head. The agent consumes all of it and flattens it into probability mass. So when it hits a real tradeoff, the resolution is the internet's average answer, not yours.",
          },
          test: {
            label: "The tradeoff-probe test",
            body:
              "Pick one decision your leadership would consider obvious, one where \"it depends\" is the wrong answer. Give an agent only your written surfaces and pose the decision. If it hedges, or decides the way a generic company would, this part of the substrate is missing. Ten minutes, end to end.",
          },
          good: {
            label: "Passing the bar",
            body:
              "A short, ratified principles document that states positions, not values-poster abstractions. Written horizons, values, and principles are something an agent can cite mid-reasoning. Version it like code.",
          },
        },
        {
          id: "01b",
          name: "Vocabulary & contracts",
          intro:
            "Your organization has almost certainly stated everything an agent needs. The problem is that each fact is stated five times, in four places, and three of those are stale. Humans route around this on social signal: ask in the channel, someone points at the real source, the group self-corrects in thirty seconds. An agent retrieves what ranks well. What ranks well is often what was written most confidently, longest ago.",
          failurePattern: {
            label: "Failure pattern",
            body:
              "The same term means different things in different systems. \"Customer\" in Salesforce is not \"customer\" in the billing schema is not \"customer\" in the support macros. Each object is locally correct. A human reconciles the three without noticing. An agent silently picks one. Or worse, collapses them into a lowest-common-denominator merge. Every downstream decision inherits the pick.",
          },
          test: {
            label: "The ten-term-diff test",
            body:
              "List your ten most load-bearing business terms. Pull their working definitions from three systems, for example: schema, CRM, docs, and then diff them. Every divergence is a place your agents are already choosing a meaning for you. Budget an afternoon, and expect the diff to be uncomfortable.",
          },
          good: {
            label: "Passing the bar",
            body:
              "Data contracts: explicit, owned, versioned agreements about what an object means and guarantees, between the team that produces it and the teams that consume it. Enforce it at the object, not on a wiki page.",
          },
        },
      ],
    },
    {
      number: "02",
      name: "The knowledge graph as domain bounds",
      tagline:
        "The KG as the control plane that defines your agents' domain of interest.",
      group: "substrate",
      intro:
        "Layer 01 fixes what your terms mean. This layer fixes how they relate. Relationships are where unstructured corpora fail hardest: left to raw tables and prose, an agent infers your domain's structure statistically, and it will invent relationships that don't exist in your business. The alternative is to sit your domain experts down and ratify the graph explicitly: which entities exist, how geography connects to account connects to product, which metric drives which. Done properly, the graph isn't something the agent consults. It's the surface the agent navigates. Every ratified edge is a hypothesis the agent may investigate. Paths not in the graph aren't legal moves. That bound is what turns an open-ended fishing expedition into a tractable investigation.",
      failurePattern: {
        label: "Failure pattern",
        body:
          "The agent's answer cites a causal chain nobody in the org recognizes. It may be plausible-sounding, statistically derived. But it's wrong about how the business actually works. Nobody can point to the relationship it violated, because the relationships were never objects.",
      },
      test: {
        label: "The traversal-probe test",
        body:
          "Pick a real symptom from last quarter: a metric that moved. Ask an agent, with only your written surfaces, to lay out the plausible causes and how it would check each one. Compare its causal map to the one your best analyst carries in their head. Every relationship the agent missed or invented is an edge you never ratified.",
      },
      good: {
        label: "Passing the bar",
        body:
          "An explicit domain model with entities, relationships, metric dependencies that is built with your domain experts, versioned, and wired in as the boundary of agent investigation rather than background reading. This is where ontology and knowledge-graph discipline lives, applied one altitude up from the data platform.",
      },
    },
    {
      number: "03",
      name: "The deterministic boundary",
      tagline: "Someone has decided what is not an AI task.",
      group: "decisions",
      intro:
        "Every real process has deterministic parts and judgment parts, and the most expensive mistake in agent deployment is paying a model to do unreliably what a pipeline does perfectly. Statistics and machinery should run before any agent is pulled in: detecting that a threshold was crossed, that a number moved, that a gate passed. Whether your organization has drawn this boundary anywhere, and written it down, is a fact about your org's auditability today, agents or no agents.",
      failurePattern: {
        label: "Failure pattern",
        body:
          "An agent is deciding what counts as a signal. Sometimes it applies a method; sometimes it barely looks at the data. Sometimes it's a real signal; sometimes it's noise dressed as insight. Nobody can say which, because nobody decided which questions were ever the agent's to answer.",
      },
      test: {
        label: "The misallocation-inventory test",
        body:
          "List every step your agents (or your agent plans) currently assign to model judgment. Mark each one: could a pipeline with a threshold do this? Every \"yes\" is a reliability hole you're paying token prices for. If nobody can produce the list, the boundary doesn't exist.",
      },
      good: {
        label: "Passing the bar",
        body:
          "A written boundary: detection, gating, and prioritization run as tested, versioned machinery; agents are invoked downstream of it, on a queue of things worth investigating. The boundary itself is an object: reviewable, arguable, improvable.",
      },
    },
    {
      number: "04",
      name: "Workflows from observation, not the org chart",
      tagline:
        "The documented workflow describes what the work actually is not who used to do it.",
      group: "decisions",
      intro:
        "There's at least one person in your org whose undocumented knowledge is what keeps a process running, and that knowledge is real. But there's a trap in transcribing it directly. The workflow a human runs is shaped by human role boundaries. A pipeline that mimics those roles inherits their seams. Context dies in the handoff. The durable property to audit is whether your documented workflows were ever validated against observation. Did anyone watch the work being attempted by a capable person outside the group, or by an agent? Did they and record where the documentation failed? Is the wiki org-chart folklore?",
      failurePattern: {
        label: "Failure pattern",
        body:
          "The wiki says what the workflow is about. A description written for a human who can fill gaps is not an execution surface for an agent that can't. The gaps are invisible until something without tribal knowledge attempts the work.",
      },
      test: {
        label: "The cold-start-run test",
        body:
          "Give an agent a real (safe) instance of a documented workflow and only the documentation. Count the human rescues every time someone steps in with context that wasn't in the objects. More than zero rescues means the workflow is described, not executable. The rescue count is your metric: it's concrete, it trends, and it's hard to argue with.",
      },
      good: {
        label: "Passing the bar",
        body:
          "Workflows written as execution surfaces. Inputs are named. Outputs are specified. Edge cases are documented in advance. Stated boundary make clear where the agent must stop and ask. Boundaries are derived from watching the work run. Every rescue folded back into the object that failed to prevent it.",
      },
    },
    {
      number: "05",
      name: "A single owner of judgment",
      tagline: "Sub-tasks return results. They never return reasoning.",
      group: "decisions",
      intro:
        "The principle is older than agents: judgment needs a single accountable owner. Distribute a decision across a committee, with human or agent members, and every member can be locally right while the outcome is incoherent: correct cause identified, disconnected action recommended, an outlook that follows from neither. The current architectural expression of the principle is one agent that owns the reasoning end to end; it may delegate focused investigations to sub-agents and machinery, but delegations return results, never conclusions. Judgment is probably not owned by one person in your group. But folks take ownership of decisions. Clarifying who is the owner, decider, one responsible makes it easy to identify judgements. Just like for humans, having this charted out makes reasoning much clearer for agents.",
      failurePattern: {
        label: "Failure pattern",
        body:
          "Each step in the chain is defensible and the whole is incoherent. The diagnosis names the real cause; the recommendation addresses a different one; the forecast assumes the recommendation worked. No single mind, whether human or agent, ever held the end-to-end picture, so nobody notices the seams. Coherence failures are the hardest kind to catch, because every component passes its own review.",
      },
      test: {
        label: "The coherence-probe test",
        body:
          "Take a recent multi-step output from an agent pipeline, or from your human process. Read only the conclusion chain: does the recommended action actually address the identified cause? Does the projected outcome follow from the action? Then ask the sharper question: who owned this end to end? If the answer is a list of names, the answer is nobody.",
      },
      good: {
        label: "Passing the bar",
        body:
          "One named owner for each decision class, human and agent alike. In agent architecture: a single reasoning agent holding the full context, with sub-agents scoped to investigations whose results, not whose judgments, flow back. The delegation boundary is written down, like everything else in this guide.",
      },
    },
    {
      number: "06",
      name: "Evals & feedback",
      tagline:
        "Every layer above feeds this one. This one points back at the layer that failed.",
      group: "loop",
      intro:
        "Most teams discover their agent was wrong the way they discover a roof leak: from underneath, during a storm, in front of a customer. But notice what well-built agent systems already do at runtime: pull a hypothesis, test it against real data, mark it supported or contradicted, move on. That loop is why they work. This layer runs the same loop over the whole stack. The payoff of process order is that failures become addressable: a wrong tradeoff points at 01a, an invented relationship at 02, noise-chasing at 03, a rescue at 04, an incoherent chain at 05. Every failure becomes a graded case; the case points at the object that caused it; the eval set grows from your operations instead of someone's imagination.",
      failurePattern: {
        label: "Failure pattern",
        body:
          "\"The agent seems better lately.\" No baseline, no metric, no way to distinguish improvement from luck. So the program can't defend its budget, and quietly dies. Meanwhile regressions are invisible: an agent that got worse at one edge case looks identical to one that didn't, until the edge case shows up in front of a customer.",
      },
      test: {
        label: "The silent-failure-probe test",
        body:
          "Take a real agent mistake from the last month and ask one question: how did you find out? If the answer is a customer, an escalation, or someone happening to notice, you don't have a feedback loop. You have an incident process. Then ask the harder version: how many like it are running right now that nobody has caught?",
      },
      good: {
        label: "Passing the bar",
        body:
          "A graded set of real cases with known-good answers: rescues from Layer 04, divergences from 01b, coherence failures from 05. Rerun whenever the surfaces beneath them change. Someone owns the number. Report regularly. Tracking direction of change. And with each failing case, trace to the specific layer and object that caused it. That traceability is the whole reason to structure the layers this way.",
      },
    },
  ] as Layer[],

  midCta: {
    body: "The audit is the scored, full-coverage version of these seven tests.",
    buttonLabel: cta.primaryLabel,
    href: routes.contact,
  },

  honestProblem: {
    heading: "The honest problem",
    paragraphs: [
      "Agent-readiness has no mature measurement standard. The benchmarks the field publishes measure model capability, not organizational legibility. No public benchmark tells you whether your company, specifically, can be read. The semantic-platform vendors are right about the problem and sell tooling for the last 20% of it. The other 80% has no product category: the ontology, the governed vocabulary, the reasoning carried into objects, the boundaries and ownership the middle layers describe. That is why it has no owner inside most org charts.",
      // TODO(operator): optional strengthening citation on AI-program measurement
      // immaturity (verify current McKinsey State of AI ROI-measurement figures before
      // citing). Section ships fine without it.
      "We don't claim a certification that doesn't exist. We measure direction of change on the seven tests above, and we show our work: the rubric is part of the audit deliverable. And clients keep the rubric.",
    ],
  },

  pullQuote: {
    quote:
      "Agent-readiness is a vision-fidelity problem, not a documentation problem. Write more docs and agents keep guessing. Carry the vision into the objects, and agents stop needing to.",
    attribution: "The argument this guide rests on.",
  },

  offersSection: {
    heading: "How to work with us",
    intro:
      "Each engagement starts from whichever layer the tests say you're stuck in.",
    cta: { label: cta.auditShortLabel, href: routes.contact },
  },

  bioBlock: {
    name: "Julee Burdekin",
    title: "founder of Allostasis",
    // TODO(operator): 2–3 sentences of track record stated as nouns (teams led,
    // systems shipped, domains). Pull from the About page once finalized. Render only
    // the name + title line until supplied — do not pad with adjectives.
    body: null as string | null,
  },

  closingCta: {
    heading: "If you've run the tests, we're happy to look at the results with you.",
    body:
      "A 30-minute conversation is usually enough to tell whether it's worth going further. Bring the result that surprised you.",
    buttonLabel: cta.primaryLabel,
    href: routes.contact,
  },
};

// ---------- About ----------
export const about = {
  heading: "I find where a company's meaning breaks.",
  paragraphs: [
    "I'm Julee Burdekin. I have spent my career across data-rich companies doing one thing: making their information mean the same thing everywhere, so the business can trust its own answers. Now their AI depends on the same thing.",
    "At Adobe, I built multi-axis metadata so a customer could land on exactly the right API for their language and their tools. At Planet, I designed a naming convention that kept satellite imagery identifiable from the ground station all the way to the analyst's workbench, so the critical insights the founders knew were magical survived the trip. At Geospan, and elsewhere, the same work.",
    "It is not a tooling purchase. It is not a cleanup project. It is recovering what your organization means, and making it legible to your AI. I am technical. I work in your real systems, from your CRM to your code. I bring in a small bench of senior specialists where the work calls for them. What starts as my experience is delivered as a team.",
    "It acts on what you give it. Whatever your data does not say clearly, the AI will say for you. Allostasis is the practice of keeping your meaning stable while everything around it changes.",
  ],
  links: [
    { label: "Read the Field Guide", href: routes.fieldGuide, external: false },
    { label: "Get in touch", href: routes.contact, external: false },
  ],
};

// ---------- Contact ----------
// Field schema + API contract preserved exactly. Untouched by this pass.
export const contact = {
  headline: "See where your systems disagree.",
  intro:
    "Tell us about your AI project and where it is going wrong. The answers that do not match. The pilot that stalled. The number Finance and Sales cannot agree on. The audit is a fixed-scope engagement, and this is the first step toward it.",
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
          { value: "inconsistent-answers", label: "Agents give inconsistent or wrong answers" },
          { value: "stalled-pilot", label: "A pilot stalled or failed in production" },
          { value: "conflicting-definitions", label: "Conflicting definitions across systems (e.g. Finance vs Sales)" },
          { value: "getting-started", label: "Don't know where to start getting objects agent-ready" },
          { value: "tool-selection", label: "Choosing a semantic layer or data catalog" },
          { value: "scaling", label: "Scaling agent use across the business" },
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
          "Tell us about the agents you're running, the decisions that surprised you, and what you're aiming for...",
      },
    },
    submitButton: cta.auditShortLabel,
    requiredNote: "* Required fields",
  },
  success: {
    title: "Request received",
    message:
      "Thanks. Your request has been submitted. I'll review it and get back to you, usually within 24–48 hours.",
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
  links: [
    { label: "Field Guide", href: routes.fieldGuide },
    { label: "Contact", href: routes.contact },
  ],
};

export type Copy = {
  routes: typeof routes;
  links: typeof links;
  cta: typeof cta;
  nav: typeof nav;
  meta: typeof meta;
  offers: typeof offers;
  home: typeof home;
  fieldGuide: typeof fieldGuide;
  about: typeof about;
  contact: typeof contact;
  footer: typeof footer;
};

const siteCopy: Copy = {
  routes,
  links,
  cta,
  nav,
  meta,
  offers,
  home,
  fieldGuide,
  about,
  contact,
  footer,
};

export default siteCopy;
