import { test, expect } from "@playwright/test";

// 301 redirects for the eight→three consolidation (spec §3 / §8.1).
// Requested without following so we can assert the status code and Location.

const toHome = ["/specializations", "/approach", "/results", "/governance"];

for (const from of toHome) {
  test(`301 ${from} -> /`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(res.headers()["location"]).toBe("/");
  });
}

test("301 /engagement -> /#engage", async ({ request }) => {
  const res = await request.get("/engagement", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toContain("/#engage");
});

test("301 /methods -> external Ghost Applied AI tag", async ({ request }) => {
  const res = await request.get("/methods", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toBe(
    "https://gnowledge-karden.ghost.io/tag/appliedai/"
  );
});

// The retired routes must not 404 (they redirect instead).
for (const from of [...toHome, "/engagement", "/methods"]) {
  test(`${from} does not 404`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBeGreaterThanOrEqual(300);
    expect(res.status()).toBeLessThan(400);
  });
}
