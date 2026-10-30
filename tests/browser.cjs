const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.SC_TEST_URL || "http://127.0.0.1:3001";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.SC_CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  const internalLinks = new Set();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.getByRole("button", { name: "Pause slides" }).click();
  await page.screenshot({ path: "/tmp/sc-home-desktop.png", fullPage: true });
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  await page.getByRole("heading", { name: "CRAFTED TO PERFECTION" }).waitFor();
  await page
    .getByRole("button", { name: "Previous slide", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "DESIGNING SPACES, DEFINING LIFESTYLES" })
    .waitFor();
  await page.getByRole("button", { name: "Play slides" }).click();
  await page.waitForTimeout(6800);
  await page.getByRole("heading", { name: "CRAFTED TO PERFECTION" }).waitFor();
  await page.getByRole("button", { name: "Pause slides" }).click();
  console.log("PASS hero next, previous, pause, play and 6.5s autoplay");
  await page.goto(base + "/projects");
  assert.equal(await page.locator(".project-card").count(), 4);
  await page
    .getByRole("button", { name: "Completed Projects", exact: true })
    .click();
  assert.equal(await page.locator(".project-card").count(), 0);
  await page
    .getByRole("heading", { name: "A new story is on its way." })
    .waitFor();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page
    .getByLabel("Project type", { exact: true })
    .selectOption("condominium");
  assert.equal(await page.locator(".project-card").count(), 1);
  await page
    .getByLabel("Design style", { exact: true })
    .selectOption("modern-luxury");
  assert.equal(await page.locator(".project-card").count(), 0);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.locator(".project-card").first().click();
  await page
    .getByRole("heading", { name: "Concept study 01", exact: true })
    .waitFor();
  const opener = page.locator(".gallery-image").first();
  await opener.click();
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page
      .locator(".lightbox-image img")
      .evaluate((e) => getComputedStyle(e).objectFit),
    "contain",
  );
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").isVisible(), false);
  assert.equal(
    await opener.evaluate((e) => document.activeElement === e),
    true,
  );
  await page
    .getByRole("button", { name: "Completed Work", exact: true })
    .click();
  await page
    .getByText("Approved images for this category are pending.", {
      exact: true,
    })
    .waitFor();
  console.log(
    "PASS combined filters, empty states, project route, lightbox, ESC and focus restore",
  );
  await page.goto(base + "/contact");
  await page
    .getByRole("button", { name: "Prepare quotation message", exact: true })
    .click();
  assert.equal(await page.locator(".prepared-message").count(), 0);
  assert.ok((await page.locator("input:invalid").count()) > 0);
  await page.getByLabel("Name *", { exact: true }).fill("Test customer");
  await page.getByLabel("Phone number *", { exact: true }).fill("abcdefgh");
  assert.equal(
    await page
      .getByLabel("Phone number *", { exact: true })
      .evaluate((el) => el.checkValidity()),
    false,
  );
  await page.getByLabel("Phone number *", { exact: true }).fill("081-234-5678");
  assert.equal(
    await page
      .getByLabel("Phone number *", { exact: true })
      .evaluate((el) => el.checkValidity()),
    true,
  );
  await page
    .getByLabel("Installation location *", { exact: true })
    .fill("Test location");
  await page
    .getByLabel("Work type *", { exact: true })
    .selectOption("Interior Design");
  await page.getByLabel("Area (m²)", { exact: true }).fill("80");
  await page
    .getByLabel("Estimated budget (THB)", { exact: true })
    .fill("500000");
  await page
    .getByLabel("Project details *", { exact: true })
    .fill("Test quotation preparation only");
  let requests = 0;
  page.on("request", (r) => {
    if (r.method() === "POST") requests++;
  });
  await page
    .getByRole("button", { name: "Prepare quotation message", exact: true })
    .click();
  const message = await page
    .getByLabel("Prepared message — not sent", { exact: true })
    .inputValue();
  for (const text of [
    "Test customer",
    "081-234-5678",
    "Test location",
    "Interior Design",
    "80",
    "500000",
    "Test quotation preparation only",
  ])
    assert.ok(message.includes(text));
  assert.equal(requests, 0);
  console.log("PASS quotation prepares all fields with no POST");
  for (const url of [
    "/",
    "/projects",
    "/expertise",
    "/about",
    "/contact",
    "/projects/concept-example-1",
  ]) {
    const res = await page.goto(base + url);
    assert.equal(res.status(), 200);
    assert.ok(await page.title());
    assert.ok(
      await page.locator('meta[name="description"]').getAttribute("content"),
    );
    assert.ok(
      await page.locator('meta[property="og:image"]').getAttribute("content"),
    );
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")))) {
      if (href.startsWith("/") || href.startsWith("#"))
        internalLinks.add(href.startsWith("#") ? url + href : href);
    }
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${url} overflows ${width}`,
      );
    }
  }
  for (const href of internalLinks) {
    const response = await page.request.get(base + href.split("#")[0]);
    assert.equal(response.status(), 200, href);
    await page.goto(base + href);
    assert.equal(
      await page.evaluate(() => localStorage.getItem("sc-language")),
      "en",
      "Hard navigation must preserve selected language",
    );
    if (href.includes("#"))
      assert.equal(
        await page.locator('[id="' + href.split("#")[1] + '"]').count(),
        1,
        href,
      );
  }
  console.log(
    "PASS " + internalLinks.size + " internal links and anchor targets",
  );
  assert.equal(
    (await page.goto(base + "/projects/missing-project")).status(),
    404,
  );
  console.log(
    "PASS all pages HTTP, metadata, 375/768/1440 widths, unknown project 404",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Our Projects", exact: true })
    .click();
  await page.waitForURL("**/projects");
  assert.ok(page.url().endsWith("/projects"));
  await page.getByRole("button", { name: "TH", exact: true }).click();
  assert.equal(await page.locator("html").getAttribute("lang"), "th");
  await page.goto(base + "/contact");
  assert.equal(await page.locator("html").getAttribute("lang"), "th");
  await page.screenshot({ path: "/tmp/sc-contact-mobile.png", fullPage: true });
  console.log("PASS mobile navigation and persisted TH/EN language");
  const reduced = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const rp = await reduced.newPage();
  await rp.goto(base);
  const heading = await rp.locator("h1").innerText();
  await rp.waitForTimeout(6800);
  assert.equal(await rp.locator("h1").innerText(), heading);
  assert.equal(
    await rp.locator(".slider-controls button").last().isDisabled(),
    true,
  );
  console.log("PASS reduced motion stops autoplay");
  assert.deepEqual(errors, []);
  console.log("PASS no browser runtime errors");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
