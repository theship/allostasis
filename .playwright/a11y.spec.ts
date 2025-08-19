import { test, expect } from "@playwright/test";

const routes = ["/", "/specializations", "/approach", "/results", "/governance", "/engagement", "/methods", "/contact"];

for (const route of routes) {
  test(`page loads and has main landmarks: ${route}`, async ({ page }) => {
    await page.goto("http://localhost:3000" + route);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByLabel("Primary").getByRole("link", { name: /Apply AI Today/i })).toBeVisible();
  });
}