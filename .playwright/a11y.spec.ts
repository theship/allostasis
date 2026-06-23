import { test, expect } from "@playwright/test";

// The redo consolidates eight routes to three built routes (spec §3).
const builtRoutes = ["/", "/about", "/contact"];

for (const route of builtRoutes) {
  test(`landmarks + single h1 + primary CTA: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    // Exactly one <h1> per route (spec §6).
    await expect(page.locator("main h1")).toHaveCount(1);
    // New primary CTA in the primary nav.
    await expect(
      page
        .getByLabel("Primary")
        .getByRole("link", { name: /Request an AI Readiness Audit/i })
    ).toBeVisible();
  });
}

test("home renders the v06 positioning", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/pilot stalled/i);
  await expect(page.getByRole("heading", { name: /Sound familiar\?/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /It is not the AI\. It is the meaning\./i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /How we engage/i })).toBeVisible();
});

test("about page names the practitioner", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main")).toContainText("Julee Burdekin");
});

test("contact form keeps the qualifying field schema", async ({ page }) => {
  await page.goto("/contact");
  for (const id of ["name", "email", "company", "role", "challenge", "timeline", "budget", "details"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});
