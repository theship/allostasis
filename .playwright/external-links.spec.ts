import { test, expect } from "@playwright/test";

const GHOST_TAG = "https://gnowledge-karden.ghost.io/tag/appliedai/";

// After the field-guide inversion, the ONLY permitted Ghost URL is the demoted
// external Writing nav link. The "point of view" destination is now on-domain
// at /agent-readiness (build spec v2.1 §1, §8.4).

test("Writing nav link is external with correct target/rel/href", async ({ page }) => {
  await page.goto("/");
  const writing = page.getByLabel("Primary").getByRole("link", { name: /Writing/i });
  await expect(writing).toHaveAttribute("target", "_blank");
  await expect(writing).toHaveAttribute("rel", /noopener/);
  await expect(writing).toHaveAttribute("rel", /noreferrer/);
  await expect(writing).toHaveAttribute("href", GHOST_TAG);
});

test("Writing is demoted to after Field Guide in the nav", async ({ page }) => {
  await page.goto("/");
  const labels = await page
    .getByLabel("Primary")
    .getByRole("listitem")
    .allInnerTexts();
  const flat = labels.map((l) => l.trim());
  const guideIndex = flat.findIndex((l) => l.startsWith("Field Guide"));
  const writingIndex = flat.findIndex((l) => l.startsWith("Writing"));
  expect(guideIndex).toBeGreaterThanOrEqual(0);
  expect(writingIndex).toBeGreaterThan(guideIndex);
});

test("About 'point of view' link now resolves on-domain to the guide", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("link", { name: /Read the Field Guide/i }).first()
  ).toHaveAttribute("href", "/agent-readiness");
});

test("no retired Ghost point-of-view URL remains on any built route", async ({ page }) => {
  for (const route of ["/", "/agent-readiness", "/about", "/contact"]) {
    await page.goto(route);
    const povLinks = page.locator(
      'a[href*="build-your-semantic-infrastructure-first"]'
    );
    await expect(povLinks).toHaveCount(0);
  }
});

test("no on-site /writing or /point-of-view route exists", async ({ request }) => {
  for (const route of ["/writing", "/point-of-view"]) {
    const res = await request.get(route, { maxRedirects: 0 });
    expect(res.status()).toBe(404);
  }
});
