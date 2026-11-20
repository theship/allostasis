import { test, expect } from "@playwright/test";

// The Agent-Readiness Field Guide.
// Three layers in process order (content, domain of interest, operations),
// carrying seven experiments numbered 1-7 flat.

const LAYERS = ["Content", "Domain of interest", "Operations"];

const EXPERIMENTS = [
  "Vision & principles",
  "Vocabulary & contracts",
  "The knowledge graph as domain bounds",
  "The deterministic boundary",
  "Workflows from observation, not the org chart",
  "A single owner of judgment",
  "Evals & feedback",
];

const PROBES = [
  "The tradeoff probe",
  "The ten-term diff",
  "The traversal probe",
  "The misallocation inventory",
  "The cold-start run",
  "The coherence probe",
  "The silent-failure probe",
];

test.describe("/agent-readiness", () => {
  test("renders the H1 and the header meta line", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /three layers, seven experiments/i
    );
    await expect(page.locator("main")).toContainText(/Updated November 2026/i);
  });

  test("renders the three layer headings, in process order", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const name of LAYERS) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
    const body = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    const positions = LAYERS.map((l) => body.indexOf(l));
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test("renders all seven experiments, numbered 1-7 in order", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const [i, name] of EXPERIMENTS.entries()) {
      await expect(
        page.getByRole("heading", { name: new RegExp(`Experiment ${i + 1}\\s+${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i") })
      ).toBeVisible();
    }
    // Flat numbering: no 01a/01b sub-parts survive.
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/\b01a\b/);
    expect(body).not.toMatch(/\b01b\b/);
  });

  test("every layer and every experiment renders an intro paragraph", async ({ page }) => {
    await page.goto("/agent-readiness");
    const main = page.locator("main");
    const intros = [
      "These are the objects an agent can actually read",          // layer 01
      "Content fixes what your terms mean.",                        // layer 02
      "What runs as machinery rather than judgment",                // layer 03
      "Every organization runs on a set of positions",              // exp 1
      "Your organization has almost certainly stated everything an agent needs.", // exp 2
      "Relationships are where unstructured corpora fail hardest",  // exp 3
      "Every real process has deterministic parts and judgment parts", // exp 4
      "There's at least one person in your org whose undocumented knowledge", // exp 5
      "The principle is older than agents",                         // exp 6
      "Most teams discover their agent was wrong the way they discover a roof leak", // exp 7
    ];
    for (const intro of intros) await expect(main).toContainText(intro);
  });

  test("renders all seven probe labels", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const label of PROBES) {
      await expect(page.locator("main")).toContainText(label);
    }
  });

  test("renders the mid-page CTA band and the closing CTA", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(page.locator("main")).toContainText(
      "The audit is the scored, full-coverage version of these seven experiments."
    );
    const auditLinks = page.getByRole("link", {
      name: /Request an Agent-Readiness Audit/i,
    });
    expect(await auditLinks.count()).toBeGreaterThanOrEqual(3);
    for (const link of await auditLinks.all()) {
      await expect(link).toHaveAttribute("href", "/contact");
    }
  });

  test("renders the pull-quote and the offers section", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(page.locator("main blockquote")).toContainText(
      /vision-fidelity problem, not a documentation problem/i
    );
    await expect(
      page.getByRole("heading", { name: /How to work with us/i })
    ).toBeVisible();
  });

  test("shows no user-visible TODO or placeholder text", async ({ page }) => {
    await page.goto("/agent-readiness");
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/TODO/i);
    expect(body).not.toMatch(/\bTBD\b/i);
    expect(body).not.toMatch(/lorem ipsum/i);
    expect(body).toContain("Julee Burdekin, founder of Allostasis.");
  });

  test("contains no em-dashes", async ({ page }) => {
    await page.goto("/agent-readiness");
    const body = await page.locator("main").innerText();
    expect(body).not.toContain("—");
  });

  test("uses three-layers / seven-experiments language", async ({ page }) => {
    await page.goto("/agent-readiness");
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/six layers/i);
    expect(body).not.toMatch(/five layers/i);
    expect(body).not.toMatch(/seven tests/i);
    expect(body).toMatch(/three layers/i);
    expect(body).toMatch(/seven experiments/i);
  });
});
