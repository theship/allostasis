import { test, expect } from "@playwright/test";

const BUILT_ROUTES = ["/", "/agent-readiness", "/about", "/contact"];

// The Writing nav item has been retired: nothing on the site links out to the
// Ghost blog. The "point of view" destination is on-domain at /agent-readiness.

test("no link to the Ghost blog remains anywhere on the site", async ({ page }) => {
  for (const route of BUILT_ROUTES) {
    await page.goto(route);
    await expect(page.locator('a[href*="gnowledge-karden"]')).toHaveCount(0);
  }
});

test("nav is Home / Field Guide / About / Contact, with no Writing item", async ({ page }) => {
  await page.goto("/");
  const labels = (
    await page.getByLabel("Primary").getByRole("listitem").allInnerTexts()
  ).map((l) => l.trim());
  expect(labels.some((l) => /^Writing/.test(l))).toBe(false);
  const order = ["Home", "Field Guide", "About", "Contact"];
  order.forEach((label, i) => expect(labels[i]).toContain(label));
});

test("About 'point of view' link now resolves on-domain to the guide", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("link", { name: /Read the Field Guide/i }).first()
  ).toHaveAttribute("href", "/agent-readiness");
});

test("no on-site /writing or /point-of-view route exists", async ({ request }) => {
  for (const route of ["/writing", "/point-of-view"]) {
    const res = await request.get(route, { maxRedirects: 0 });
    expect(res.status()).toBe(404);
  }
});
