import { test, expect } from "@playwright/test";

const GHOST_TAG = "https://gnowledge-karden.ghost.io/tag/appliedai/";
const GHOST_POV =
  "https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/";

// All outbound links open in a new tab with rel="noopener noreferrer" (spec §4.3 / §6 / §8.2).

test("Writing nav link is external with correct target/rel/href", async ({ page }) => {
  await page.goto("/");
  const writing = page.getByLabel("Primary").getByRole("link", { name: /Writing/i });
  await expect(writing).toHaveAttribute("target", "_blank");
  await expect(writing).toHaveAttribute("rel", /noopener/);
  await expect(writing).toHaveAttribute("rel", /noreferrer/);
  await expect(writing).toHaveAttribute("href", GHOST_TAG);
});

test("hero secondary CTA points to the POV anchor post, new tab + rel", async ({ page }) => {
  await page.goto("/");
  const pov = page.getByRole("link", { name: /See why the pilot stalled/i }).first();
  await expect(pov).toHaveAttribute("target", "_blank");
  await expect(pov).toHaveAttribute("rel", /noopener noreferrer/);
  await expect(pov).toHaveAttribute("href", GHOST_POV);
});

test("About POV link is external with rel", async ({ page }) => {
  await page.goto("/about");
  const pov = page.getByRole("link", { name: /Read the point of view/i }).first();
  await expect(pov).toHaveAttribute("href", GHOST_POV);
  await expect(pov).toHaveAttribute("target", "_blank");
  await expect(pov).toHaveAttribute("rel", /noopener noreferrer/);
});

test("no on-site /writing or /point-of-view route exists", async ({ request }) => {
  for (const route of ["/writing", "/point-of-view"]) {
    const res = await request.get(route, { maxRedirects: 0 });
    expect(res.status()).toBe(404);
  }
});
