import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(url.hostname), "Use a local preview.");
const session = `cv-welcome-check-${process.pid}`;
const directory = mkdtempSync(join(tmpdir(), "cv-welcome-"));
const probePath = join(directory, "probe.js");
function probe() {
  window.__welcomeFrames = [];
  const start = performance.now();
  let previous;
  function frame() {
    const state = document.documentElement.dataset.cvWelcome || "bypassed";
    if (state !== previous) {
      const site = document.getElementById("cv-site");
      const card = document.querySelector(".portfolio-home .bento-card");
      window.__welcomeFrames.push({ state, ms: performance.now() - start,
        visibility: site && getComputedStyle(site).visibility,
        cardMotion: card && getComputedStyle(card).animationPlayState,
        pixels: document.querySelectorAll(".welcome-pixel").length });
      previous = state;
    }
    if (performance.now() - start < 6000) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
writeFileSync(probePath, `(${probe.toString()})();`);
function browser(args, input) {
  return execFileSync("agent-browser", ["--session", session, ...args], {
    encoding: "utf8", input, timeout: 30_000,
  }).trim();
}
function evaluate(fn) {
  return JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
}
function clearVisit() { evaluate(() => localStorage.removeItem("cv-welcome-seen")); }
function waitDone() { browser(["wait", "--fn", "document.documentElement.dataset.cvWelcome === 'done' && !document.getElementById('cv-site').inert"]); }
function assertBypassed() {
  browser(["wait", "--load", "networkidle"]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".welcome-intro")).display), "none");
  assert.equal(evaluate(() => getComputedStyle(document.getElementById("cv-site")).visibility), "visible");
}

try {
  browser(["--init-script", probePath, "open", url.href]);
  waitDone();
  const frames = evaluate(() => window.__welcomeFrames);
  assert.deepEqual(frames.map(frame => frame.state), ["pending", "revealing", "done"]);
  assert.equal(frames[0].visibility, "hidden", "The homepage must not flash before the welcome.");
  assert.equal(frames[0].cardMotion, "paused");
  assert.equal(frames[1].cardMotion, "running", "Home card motion begins with the reveal.");
  assert.ok(frames[1].ms >= 4000, `The badge disappeared too early: ${frames[1].ms}ms`);
  assert.ok(frames[2].ms < 5250, `Intro exceeded the five-second maximum: ${frames[2].ms}ms`);
  assert.equal(evaluate(() => localStorage.getItem("cv-welcome-seen")), "1");
  assert.equal(evaluate(() => performance.getEntriesByType("resource").some(entry => /\.glb|\.wasm/.test(entry.name))), false);
  assert.equal(evaluate(() => document.activeElement.tagName), "H1");
  assert.equal(evaluate(() => getComputedStyle(document.activeElement).outlineStyle), "none", "The CV heading must not show an outline after the reveal.");
  browser(["press", "Tab"]);
  assert.equal(evaluate(() => document.activeElement.matches("a, button") && getComputedStyle(document.activeElement).outlineStyle === "solid"), true, "Keyboard users must still see focus on controls.");
  assert.equal(evaluate(() => document.querySelector(".hero-copy h1").hasAttribute("data-welcome-focus")), false);
  console.log(`First visit: ${frames[2].ms.toFixed(0)}ms, no homepage flash or 3D model request.`);

  browser(["reload"]);
  assertBypassed();
  browser(["tab", "new", url.href]);
  assertBypassed();
  console.log("Refresh and a new tab both bypass the welcome.");

  browser(["set", "viewport", "390", "844"]);
  clearVisit();
  browser(["reload"]);
  browser(["wait", "--fn", "document.getElementById('cv-site').inert"]);
  evaluate(probe); // The new tab needs its own frame observer.
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".welcome-badge")).animationName), "welcome-swing");
  waitDone();
  const mobileFrames = evaluate(() => window.__welcomeFrames);
  const mobileReveal = mobileFrames.find(frame => frame.state === "revealing");
  assert.ok(mobileReveal?.pixels > 0 && mobileReveal.pixels < frames[1].pixels, "Mobile keeps the pixel animation with fewer tiles.");
  assert.equal(evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  browser(["set", "media", "light", "reduced-motion"]);
  clearVisit();
  browser(["reload"]);
  assertBypassed();
  console.log("Mobile first visit and reduced-motion bypass passed.");

  browser(["set", "media", "light"]);
  clearVisit();
  browser(["open", new URL("/contact", url).href]);
  assertBypassed();
  browser(["open", new URL("/#main-content", url).href]);
  assertBypassed();
  console.log("Direct section and homepage anchor links bypass the welcome.");

  browser(["open", url.href]);
  assert.equal(evaluate(() => document.documentElement.dataset.cvWelcome), "pending");
  browser(["press", "Tab"]);
  assert.equal(evaluate(() => document.activeElement.classList.contains("welcome-enter")), true);
  browser(["press", "Shift+Tab"]);
  assert.equal(evaluate(() => document.activeElement.classList.contains("welcome-enter")), true);
  browser(["press", "Escape"]);
  waitDone();
  clearVisit();
  browser(["reload"]);
  browser(["wait", "--fn", "document.getElementById('cv-site').inert"]);
  const entered = evaluate(async () => {
    const button = document.querySelector(".welcome-enter");
    const root = document.documentElement;
    const start = performance.now();
    return await new Promise(resolve => {
      const states = [root.dataset.cvWelcome];
      let pixelCount;
      const observer = new MutationObserver(() => {
        states.push(root.dataset.cvWelcome);
        if (root.dataset.cvWelcome === "done") complete();
      });
      function complete() {
        observer.disconnect();
        clearTimeout(timeout);
        resolve({ ms: performance.now() - start, pixelCount, states, state: root.dataset.cvWelcome });
      }
      const timeout = setTimeout(complete, 1500);
      observer.observe(root, { attributes: true, attributeFilter: ["data-cv-welcome"] });
      button.click();
      button.click(); // A repeated click must not restart or duplicate the reveal.
      pixelCount = document.querySelectorAll(".welcome-pixel").length;
    });
  });
  assert.equal(entered.state, "done", "The entry button must finish the reveal without waiting for auto-entry.");
  waitDone();
  assert.ok(entered.ms < 1200, `The entry button took ${entered.ms}ms`);
  assert.ok(entered.pixelCount > 0 && entered.pixelCount <= 250, "The button must trigger one pixel reveal.");
  assert.ok(entered.states.includes("revealing"), "Entering must preserve the pixel transition.");
  assert.equal(evaluate(() => document.activeElement.tagName), "H1");
  console.log(`Escape bypass and keyboard focus passed; View my CV reveals in ${entered.ms.toFixed(0)}ms.`);

  clearVisit();
  browser(["network", "route", "**/_next/static/**", "--abort", "--resource-type", "script"]);
  browser(["reload"]);
  waitDone();
  assert.equal(evaluate(() => getComputedStyle(document.getElementById("cv-site")).visibility), "visible");
  assert.equal(evaluate(() => document.getElementById("cv-site").hasAttribute("aria-hidden")), false);
  console.log("The independent deadline opens the CV when application scripts fail.");
} finally {
  try { browser(["close"]); } catch {}
  rmSync(directory, { recursive: true, force: true });
}
