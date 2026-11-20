# Copy de-slop spec — implementation work order

Date: 2026-11-20. Author: prepared with Julee in the `alee` planning session; the editorial rationale lives in `alee/content/de-slop-pass.md`. This file is self-contained: an agent can execute it without reading anything outside this repo.

## Scope and ground rules

- **Only file to edit:** `src/content/copy.ts`, on branch `content/three-layer-guide`.
- Change **copy strings only** — no schema, type, key, route, or structure changes. Do not rename object keys. Do not touch the contact-form field schema (marked "preserved exactly" in the file).
- Do not touch the unrelated modified files in the working tree (`archive/deploy-verbose.sh`, `docs/VERCEL-DEPLOYMENT-PLAN.md`); commit only `src/content/copy.ts` (and this spec's checkbox updates if asked).
- After edits: `npm run build` (or the repo's lint/build gate) must pass.
- **Voice rules** (apply to every rewrite; never introduce new violations):
  1. Cut any sentence that restates the sentence after it.
  2. No tidy enumerated triads unless one member does real work. Two uneven items beat three parallel ones.
  3. Prefer loose, spoken constructions over balanced ones.
  4. No "Here's the…", "The point worth making…", or similar presenter preambles.
  5. Banned: unlock, empower, transform, seamless, cutting-edge, exclamation points, "not just X", rhetorical-question headers.
  6. When shortening, keep the specific and cut the general.

## 1 · BLOCKED ON OWNER DECISION — do not apply until Julee picks a side

The guide currently argues both positions on the knowledge graph: the layer-02 `tagline` says "A dynamic knowledge graph…", while `layers[1].experiments[0]` (experiment 3) `intro` says "The alternative is to sit your domain experts down and ratify the graph explicitly: which entities exist, how geography connects to account connects to product, which metric drives which," and its `good.body` says "built with your domain experts, versioned…".

**If Julee chooses DYNAMIC**, replace experiment 3 `intro` with:

> Left to raw tables and prose, an agent infers your domain's structure statistically, and it will invent relationships that don't exist in your business. The fix is not locking your domain experts in a room to ratify a graph preemptively — that's a fool's errand: inefficient, and the results are short-lived. The fix is a dynamic graph, grown from your objects and corrected by the people who know, versioned like code. It gives the agent something to check against. Done properly, the graph isn't something the agent consults. It's the surface the agent navigates.

…and replace experiment 3 `good.body` with:

> An explicit domain model of entities, relationships, and metric dependencies — grown from your objects, corrected by your experts as it's used, versioned, and wired in as the boundary of agent investigation rather than background reading.

**If Julee chooses PREEMPTIVE RATIFICATION**, instead change the layer-02 `tagline` to drop the word "dynamic" and leave experiment 3 substantively alone (apply only edit 2 below).

## 2 · Unconditional edits (apply all)

Each edit names the object path in `copy.ts`, the exact current text to find, and the replacement.

1. **Dedup the navigates-riff.** `layers[1].intro` (layer 02 "Domain of interest") currently ends with the same riff as experiment 3 ("…is not something the agent consults; it is the surface the agent navigates. Every edge is a hypothesis it may investigate, and paths that are not in the graph are not legal moves. That bound is what turns an open-ended fishing expedition into a tractable investigation."). Replace the whole `intro` with:
   > Content fixes what your terms mean. This layer fixes how they relate, and how far an agent may roam.
   (The riff survives once, inside experiment 3.)
2. **`fieldGuide.reframe.paragraphs[1]`:** delete the opening "Here's the mechanism. " (start the paragraph at "Everything load-bearing…"). In the same paragraph: change "a founder's thesis, a product lead's model of the customer, a researcher's understanding of why the system works" to "a founder's thesis, a product lead's read on the customer"; and change "specs, code, pipelines, CRM records, support threads" to "the objects" (the full list already appears in `opening.paragraphs[1]` directly above — keep that first occurrence).
3. **Experiment 4 (`deterministic boundary`) `intro`:** "detecting that a threshold was crossed, that a number moved, that a gate passed" → "detecting that a threshold was crossed or a number moved".
4. **Experiment 4 `good.body`:** "The boundary itself is an object: reviewable, arguable, improvable." → "The boundary itself is an object you can argue with."
5. **Experiment 5 (`workflows`) `intro`:** of the three closing questions, delete the middle one ("Did they record where the documentation failed?"), keeping "Did anyone watch the work being attempted…?" and "Is the wiki org-chart folklore?".
6. **Experiment 5 `procedure.body`:** "it's concrete, it trends, and it's hard to argue with" → "it trends, and it's hard to argue with".
7. **Experiment 6 (`single owner`) `intro`:** replace "Judgment is probably not owned by one person in your group. But folks take ownership of decisions. Clarifying who is the owner, decider, one responsible makes it easy to identify judgements. Just like for humans, having this charted out makes reasoning much clearer for agents." with:
   > In most orgs nobody owns judgment outright — but people do own decisions. Chart who decides what, and judgment becomes something an agent can locate.
8. **Experiment 7 (`evals`) `failurePattern.body`:** "until the edge case shows up in front of a customer" → "until the edge case ships" (the roof-leak sentence in the intro keeps "in front of a customer"; it may appear only once in the experiment).

## 3 · Do NOT change (protected lines)

"each fact is stated five times, in four places, and three of those are stale" · "pitch decks, all-hands recordings, and the founder's head" · "We ask a colleague, read the room, find that spreadsheet." · "You have an incident process." · "described, not executable" · "If the answer is a list of names, the answer is nobody." · the roof-leak sentence · the pull quote · "We don't claim a certification that doesn't exist." · the About page in its entirety · "architecture work, not transcription work."

## 4 · TODO fills (from the planning session; conversion items)

- `fieldGuide.bioBlock.body` (currently `null`): set to
  > Thirty years making information mean the same thing everywhere: Adobe (content strategy, W3C steward), Planet Labs (Head of Developer Relations, Planet SDK for Python), Macromedia, RSA. Founder, Allostasis.
- `offers[0].meta` duration ("N weeks") and the opening-stat citation: **leave the TODOs in place** unless Julee supplies the values; do not invent either.

## 5 · Acceptance checks

- `grep -c "surface the agent navigates" src/content/copy.ts` → exactly 1.
- `grep -c "Here's the mechanism" src/content/copy.ts` → 0.
- `grep -c "owner, decider, one responsible" src/content/copy.ts` → 0.
- Build passes; no key names changed (`git diff` shows only string-value changes in `src/content/copy.ts`).
- Reading time (`readingTimeMinutes: 11`) — recount words after edits; adjust if it drops below ~10 minutes, per the file's own comment.
