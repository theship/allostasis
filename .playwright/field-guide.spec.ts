import { test, expect } from "@playwright/test";

// The Agent-Readiness Field Guide (build spec v2.1 §3, §8.2, §8.8).
// Six layers in process order, grouped 2–3–1, with seven tests total.

const LAYERS = [
  "The legible substrate",
  "The knowledge graph as domain bounds",
  "The deterministic boundary",
  "Workflows from observation, not the org chart",
  "A single owner of judgment",
  "Evals & feedback",
];

const GROUP_HEADINGS = [
  "The substrate: what your agents read",
  "The build decisions — auditable properties of how you've organized the work",
  "The loop — how you know any of it is working",
];

const TESTS = [
  "The tradeoff-probe test",
  "The ten-term-diff test",
  "The traversal-probe test",
  "The misallocation-inventory test",
  "The cold-start-run test",
  "The coherence-probe test",
  "The silent-failure-probe test",
];

test.describe("/agent-readiness", () => {
  test("renders the H1 and the header meta line", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /six layers, seven tests/i
    );
    await expect(page.locator("main")).toContainText(/Updated July 2026/i);
  });

  test("renders all six layer headings", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const name of LAYERS) {
      await expect(
        page.getByRole("heading", { name, exact: true })
      ).toBeVisible();
    }
  });

  test("renders all three group headings, in order", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const heading of GROUP_HEADINGS) {
      await expect(
        page.getByRole("heading", { name: heading, exact: true })
      ).toBeVisible();
    }
    // 2–3–1 arc: the group headings appear in process order down the page.
    const body = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    const positions = GROUP_HEADINGS.map((h) =>
      body.indexOf(h.replace(/\s+/g, " "))
    );
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test("Layer 01 nests both parts (01a, 01b)", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(
      page.getByRole("heading", { name: /01a\s+Vision & principles/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /01b\s+Vocabulary & contracts/i })
    ).toBeVisible();
  });

  test("every layer and both parts render an intro paragraph", async ({ page }) => {
    await page.goto("/agent-readiness");
    const main = page.locator("main");
    // One distinctive sentence from each layer intro + both Layer 01 part intros.
    const intros = [
      "This layer is half the work.", // 01
      "Every organization runs on a set of positions", // 01a
      "Your organization has almost certainly stated everything an agent needs.", // 01b
      "Layer 01 fixes what your terms mean.", // 02
      "Every real process has deterministic parts and judgment parts", // 03
      "There's at least one person in your org whose undocumented knowledge", // 04
      "The principle is older than agents", // 05
      "Most teams discover their agent was wrong the way they discover a roof leak", // 06
    ];
    for (const intro of intros) {
      await expect(main).toContainText(intro);
    }
  });

  test("renders all seven test labels", async ({ page }) => {
    await page.goto("/agent-readiness");
    for (const label of TESTS) {
      await expect(page.locator("main")).toContainText(label);
    }
  });

  test("renders the mid-page CTA band and the closing CTA", async ({ page }) => {
    await page.goto("/agent-readiness");
    await expect(page.locator("main")).toContainText(
      "The audit is the scored, full-coverage version of these seven tests."
    );
    const auditLinks = page.getByRole("link", {
      name: /Request an Agent-Readiness Audit/i,
    });
    // Nav CTA + mid-page band + closing CTA.
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
    // The bio block renders name + title only until the operator supplies copy.
    expect(body).toContain("Julee Burdekin, founder of Allostasis.");
  });

  test("uses six-layers / seven-tests language, never five", async ({ page }) => {
    await page.goto("/agent-readiness");
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/five layers/i);
    expect(body).not.toMatch(/five tests/i);
    expect(body).toMatch(/six layers/i);
    expect(body).toMatch(/seven tests/i);
  });
});
