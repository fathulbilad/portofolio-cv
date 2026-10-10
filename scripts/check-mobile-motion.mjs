import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(url.hostname), "Use a local preview.");
const session = `cv-mobile-motion-${process.pid}`;
const directory = mkdtempSync(join(tmpdir(), "cv-mobile-motion-"));
const probePath = join(directory, "probe.js");
function probe() {
  window.__mobileMotion = { pixelAnimations: 0, styleWrites: 0 };
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (...args) {
    if (this.classList.contains("welcome-pixel")) window.__mobileMotion.pixelAnimations++;
    return animate.apply(this, args);
  };
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "attributes" && record.target.matches(".certificate-fan-card, .section-intro, .education-list > article, .contact-list > a > div")) {
        window.__mobileMotion.styleWrites++;
      }
    }
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ["style"] });
}
writeFileSync(probePath, `(${probe.toString()})();`);
function browser(args, input) {
  return execFileSync("agent-browser", ["--session", session, ...args], { encoding: "utf8", input, timeout: 30000 }).trim();
}
function evaluate(fn) { return JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`)); }
function assertDecorativeMotionOff(label) {
  const state = evaluate(() => ({
    effects: [...document.querySelectorAll(".portfolio-home .bento-card, .certificate-fan-card, .lanyard-static .welcome-badge")]
      .filter(element => getComputedStyle(element).animationName !== "none" || getComputedStyle(element).transitionDuration.split(",").some(value => parseFloat(value) > 0)).length,
    styleWrites: window.__mobileMotion.styleWrites,
  }));
  assert.deepEqual(state, { effects: 0, styleWrites: 0 }, `${label} must have no decorative motion: ${JSON.stringify(state)}`);
}
try {
  browser(["--init-script", probePath, "open", "about:blank"]);
  browser(["set", "viewport", "390", "844"]);
  browser(["open", url.href]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".welcome-badge")).animationName), "welcome-swing", "Mobile must retain the badge welcome.");
  browser(["wait", "--fn", "document.getElementById('cv-site').inert"]);
  browser(["click", ".welcome-enter"]);
  browser(["wait", "--fn", "document.documentElement.dataset.cvWelcome === 'done' && !document.getElementById('cv-site').inert"]);
  assert.ok(evaluate(() => window.__mobileMotion.pixelAnimations) > 0, "The mobile entry button must use the pixel reveal.");
  assert.equal(evaluate(() => getComputedStyle(document.getElementById("cv-site")).visibility), "visible");
  assertDecorativeMotionOff("Mobile homepage");
  browser(["wait", "--load", "networkidle"]);
  evaluate(() => document.querySelector('a[href="/certificates"]').click());
  browser(["wait", "--fn", "!!document.querySelector('.route-drawer')"]);
  assert.equal(evaluate(() => document.querySelectorAll(".certificate-fan-card").length), 5);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".route-drawer")).animationName), "drawer-in");
  assertDecorativeMotionOff("Mobile certificate drawer");
  browser(["click", '.certificate-fan-card[aria-label*="Introduction to Model Context Protocol"]']);
  browser(["wait", "--fn", "document.querySelector('.certificate-viewer img')?.naturalWidth > 0"]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".certificate-viewer")).animationName), "certificate-up");
  assertDecorativeMotionOff("Mobile certificate preview");
  browser(["press", "Escape"]);
  browser(["wait", "--fn", "!document.querySelector('.certificate-viewer')"]);
  browser(["press", "Escape"]);
  browser(["wait", "--fn", "!document.querySelector('.route-drawer')"]);
  browser(["open", new URL("/about", url).href]);
  browser(["wait", "--fn", "!!document.querySelector('.lanyard-static')"]);
  assert.equal(evaluate(() => !!document.querySelector(".lanyard-stage canvas")), false);
  assert.equal(evaluate(() => performance.getEntriesByType("resource").some(entry => /\.glb|\.wasm/.test(entry.name))), false);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".section-page")).animationName), "rise-in");
  assertDecorativeMotionOff("Mobile About and static badge");
  browser(["set", "viewport", "844", "390"]);
  browser(["open", new URL("/contact", url).href]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".section-page")).animationName), "rise-in");
  assertDecorativeMotionOff("Landscape mobile contact page");
  browser(["set", "viewport", "899", "900"]);
  browser(["open", url.href]);
  assertDecorativeMotionOff("Mobile breakpoint");
  browser(["set", "viewport", "1280", "900"]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".portfolio-home .bento-card")).animationName), "rise-in");
  evaluate(() => document.querySelector('a[href="/certificates"]').click());
  browser(["wait", "--fn", "window.__mobileMotion.styleWrites > 0"]);
  console.log("Mobile keeps the welcome, pixel reveal, and navigation transitions; cards, certificates, and badge remain still without 3D requests. Portrait, landscape, breakpoint, and retained desktop motion passed.");
} finally {
  try { browser(["close"]); } catch {}
  rmSync(directory, { recursive: true, force: true });
}
