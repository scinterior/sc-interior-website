// Temporary local-only route. Never publish test fixtures as company projects.
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const route = path.join(process.cwd(), "src/app/portfolio-test-fixture");
const declaration = fs.readFileSync("next-env.d.ts");
const port = 3002;
const source = `"use client";
import { Gallery, Comparison } from "@/components/portfolio";
import { projects } from "@/lib/projects";
const image = projects[0].coverImage;
const gallery = Array.from({length:20},(_,i)=>({...image,alt:{th:'ภาพทดสอบ '+i,en:'Test image '+i}}));
const fixture = {...projects[0], gallery3D:gallery,galleryOnSite:gallery,galleryCompleted:gallery};
export default function Page(){return <main id="main"><h1>TEST FIXTURE ONLY — NOT COMPANY WORK</h1><Gallery project={fixture}/><Comparison pair={{design:image,completed:image,sameAngle:true}}/><Comparison pair={{design:image,completed:image,sameAngle:false}}/></main>}
`;
(async () => {
  assert.equal(
    fs.existsSync(route),
    false,
    "Do not overwrite an existing route",
  );
  fs.mkdirSync(route);
  fs.writeFileSync(path.join(route, "page.tsx"), source);
  const server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "dev",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  let logs = "";
  server.stdout.on("data", (d) => (logs += d));
  server.stderr.on("data", (d) => (logs += d));
  let browser;
  try {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await fetch(
          "http://127.0.0.1:" + port + "/portfolio-test-fixture",
        );
        if (r.ok) break;
      } catch {}
      if (i === 59) throw Error(logs);
      await new Promise((r) => setTimeout(r, 500));
    }
    browser = await chromium.launch({
      headless: true,
      executablePath: process.env.SC_CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage({
      viewport: { width: 1200, height: 900 },
    });
    await page.goto("http://127.0.0.1:" + port + "/portfolio-test-fixture");
    await page.getByRole("button", { name: "EN", exact: true }).click();
    assert.equal(await page.locator(".gallery-image").count(), 60);
    assert.equal(
      await page.locator('.gallery-image img[loading="lazy"]').count(),
      60,
    );
    await page.locator(".gallery-image").nth(49).click();
    await page.getByRole("dialog").waitFor();
    assert.match(await page.locator(".lightbox-top").innerText(), /50 \/ 60/);
    await page.keyboard.press("ArrowRight");
    assert.match(await page.locator(".lightbox-top").innerText(), /51 \/ 60/);
    await page.keyboard.press("ArrowLeft");
    assert.match(await page.locator(".lightbox-top").innerText(), /50 \/ 60/);
    await page.locator(".lightbox").evaluate((el) => {
      el.dispatchEvent(
        new TouchEvent("touchstart", {
          bubbles: true,
          changedTouches: [
            new Touch({
              identifier: 1,
              target: el,
              clientX: 300,
              clientY: 200,
            }),
          ],
        }),
      );
      el.dispatchEvent(
        new TouchEvent("touchend", {
          bubbles: true,
          changedTouches: [
            new Touch({
              identifier: 1,
              target: el,
              clientX: 100,
              clientY: 200,
            }),
          ],
        }),
      );
    });
    assert.match(await page.locator(".lightbox-top").innerText(), /51 \/ 60/);
    await page.keyboard.press("Escape");
    for (const name of ["3D Design", "On-site Progress", "Completed Work"]) {
      await page.getByRole("button", { name, exact: true }).click();
      assert.equal(await page.locator(".gallery-image").count(), 20);
    }
    await page.getByLabel("Comparison position", { exact: true }).fill("75");
    assert.match(
      await page.locator(".comparison-design").getAttribute("style"),
      /25%/,
    );
    await page.getByLabel("Comparison position", { exact: true }).focus();
    await page.keyboard.press("ArrowLeft");
    assert.equal(
      await page
        .getByLabel("Comparison position", { exact: true })
        .inputValue(),
      "74",
    );
    const frame = page.locator(".comparison-frame");
    await frame.scrollIntoViewIfNeeded();
    const rect = await frame.boundingBox();
    await page.mouse.move(
      rect.x + rect.width * 0.25,
      rect.y + rect.height * 0.5,
    );
    await page.mouse.down();
    await page.mouse.move(
      rect.x + rect.width * 0.75,
      rect.y + rect.height * 0.5,
    );
    await page.mouse.up();
    assert.equal(
      await page
        .getByLabel("Comparison position", { exact: true })
        .inputValue(),
      "75",
    );
    assert.equal(await page.locator(".comparison-pair figure").count(), 2);
    await page.setViewportSize({ width: 375, height: 812 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    console.log(
      "PASS 60 images, lazy loading, image 50 navigation, swipe, category filtering, keyboard comparison, mismatched-angle fallback, mobile width",
    );
  } finally {
    await browser?.close();
    server.kill("SIGTERM");
    if (server.exitCode === null && server.signalCode === null)
      await new Promise((r) => server.once("exit", r));
    fs.rmSync(route, { recursive: true });
    fs.rmSync(path.join(process.cwd(), ".next/dev"), {
      recursive: true,
      force: true,
    });
    fs.writeFileSync("next-env.d.ts", declaration);
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
