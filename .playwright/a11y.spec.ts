import { test, expect } from "@playwright/test";

// Four built routes after the field-guide inversion (build spec v2.1 §1).
const builtRoutes = ["/", "/agent-readiness", "/about", "/contact"];

for (const route of builtRoutes) {
  test(`landmarks + single h1 + primary CTA: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Assert on landmark ROLES, not tags: the guide nests <header> inside
    // <article>/<section>, which is valid and not a banner landmark.
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    // Exactly one <h1> per route.
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(
      page
        .getByLabel("Primary")
        .getByRole("link", { name: /Request an Agent-Readiness Audit/i })
    ).toBeVisible();
  });
}

test("home is the slim router: hero, thesis, engage, closing CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /an agent with a vision performs better/i
  );
  await expect(page.getByRole("heading", { name: /The vision gap/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /How we engage/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /how much of your vision your agents can actually see/i })
  ).toBeVisible();
});

test("home hero CTAs resolve to the guide and contact", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /Read the Field Guide/i }).first()
  ).toHaveAttribute("href", "/agent-readiness");
  await expect(
    page.getByRole("link", { name: /Request an Agent-Readiness Audit/i }).first()
  ).toHaveAttribute("href", "/contact");
});

test("nav Field Guide link works", async ({ page }) => {
  await page.goto("/");
  await page
    .getByLabel("Primary")
    .getByRole("link", { name: "Field Guide", exact: true })
    .click();
  await expect(page).toHaveURL(/\/agent-readiness$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /six layers, seven tests/i
  );
});

test("footer links to the Field Guide", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByLabel("Footer").getByRole("link", { name: "Field Guide" })
  ).toHaveAttribute("href", "/agent-readiness");
});

test("the three offers render identically on / and /agent-readiness", async ({ page }) => {
  const offerNames = [
    "The Agent-Readiness Audit",
    "The Semantic Architecture Engagement",
    "Fractional Knowledge Engineering",
  ];
  for (const route of ["/", "/agent-readiness"]) {
    await page.goto(route);
    for (const name of offerNames) {
      await expect(
        page.getByRole("heading", { name, exact: true })
      ).toBeVisible();
    }
    // The DIAGNOSTIC body is the §6 text, from the single copy.ts source.
    await expect(page.locator("main")).toContainText(
      "three data contracts your leadership needs to ratify"
    );
  }
});

test("about page names the practitioner", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main")).toContainText("Julee Burdekin");
});

test("contact form keeps the qualifying field schema", async ({ page }) => {
  await page.goto("/contact");
  for (const id of ["name", "email", "phone", "company", "role", "challenge", "timeline", "budget", "details"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});
