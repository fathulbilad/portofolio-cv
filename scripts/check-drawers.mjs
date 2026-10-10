import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

// Requires agent-browser on PATH and a running production preview.
// Going offline after the overview loads catches accidental route requests.
const url = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(url.hostname), "Use a local preview for this offline check.");
const session = `cv-drawer-check-${process.pid}`;
function browser(args, input) {
  return execFileSync("agent-browser", ["--session", session, ...args], {
    encoding: "utf8", input, timeout: 30_000,
  }).trim();
}
function evaluate(fn, ...args) {
  return JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})(...${JSON.stringify(args)})`));
}

async function clickAndMeasure(href) {
  const previous = document.querySelector(".route-drawer h1")?.textContent;
  const link = document.querySelector(`.route-drawer a[href="${href}"]`)
    ?? document.querySelector(`.portfolio-home a[href="${href}"]`);
  if (!link) throw new Error(`Missing link: ${href}`);
  const start = performance.now();
  const opened = await new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const heading = document.querySelector(".route-drawer h1");
      if (location.pathname === href && heading && heading.textContent !== previous) {
        observer.disconnect(); clearTimeout(timeout); resolve(true);
      }
    });
    const timeout = setTimeout(() => { observer.disconnect(); resolve(false); }, 1500);
    observer.observe(document.body, {subtree:true, childList:true, characterData:true});
    link.click();
  });
  const drawer = document.querySelector(".route-drawer");
  const side = drawer?.dataset.side;
  return {
    opened, ms: performance.now() - start, side,
    edge: drawer && getComputedStyle(drawer)[side],
    path: location.pathname,
  };
}

function checkOpen(href, side) {
  const result = evaluate(clickAndMeasure, href);
  assert.ok(result.opened, `${href} must open with the network offline: ${JSON.stringify(result)}`);
  assert.equal(result.side, side);
  assert.equal(result.edge, "18px");
  assert.ok(result.ms < 200, `${href} took ${result.ms.toFixed(0)}ms`);
  console.log(`${href}: ${result.ms.toFixed(0)}ms, ${side} drawer, offline`);
}

function closeDrawer() {
  browser(["press", "Escape"]);
  browser(["wait", "--fn", "location.pathname === '/' && !document.querySelector('.route-drawer')"]);
}

async function navigateToPage(href) {
  document.documentElement.dataset.navigationProbe = "same-document";
  const link = document.querySelector(`a[href="${href}"]`);
  if (!link) throw new Error(`Missing page link: ${href}`);
  const arrived = await new Promise(resolve => {
    const observer = new MutationObserver(() => {
      if (location.pathname === href && document.querySelector(".section-page h1") && !document.querySelector(".route-drawer")) {
        observer.disconnect(); clearTimeout(timeout); resolve(true);
      }
    });
    const timeout = setTimeout(() => { observer.disconnect(); resolve(false); }, 3000);
    observer.observe(document.body, {subtree:true, childList:true});
    link.click();
  });
  const page = document.querySelector(".section-page");
  return { arrived, sameDocument: document.documentElement.dataset.navigationProbe === "same-document",
    animation: page && getComputedStyle(page).animationName, duration: page && getComputedStyle(page).animationDuration };
}

try {
  browser(["open", url.href]);
  browser(["set", "viewport", "1280", "900"]);
  browser(["wait", "--load", "networkidle"]);
  browser(["wait", "--fn", "!['pending', 'revealing'].includes(document.documentElement.dataset.cvWelcome)"]);
  browser(["set", "offline", "on"]);
  checkOpen("/experience", "left");
  checkOpen("/projects/bank-indonesia", "left");
  closeDrawer();
  assert.equal(evaluate(() => document.activeElement?.getAttribute("href")), "/experience");
  evaluate(() => window.history.forward());
  browser(["wait", "--fn", "location.pathname === '/projects/bank-indonesia' && !!document.querySelector('.route-drawer')"]);
  assert.equal(evaluate(() => document.querySelector(".route-drawer")?.dataset.side), "left");
  closeDrawer();
  checkOpen("/skills", "right");
  closeDrawer();
  assert.equal(evaluate(() => document.activeElement?.getAttribute("href")), "/skills");
  checkOpen("/certificates", "bottom");
  closeDrawer();
  console.log("Back, forward, nested details, and focus restoration passed.");
  browser(["set", "offline", "off"]);
  browser(["set", "viewport", "390", "844"]);
  for (const href of ["/side-projects", "/side-projects/dev"]) {
    const result = evaluate(navigateToPage, href);
    assert.ok(result.arrived && result.sameDocument, `${href} must use a standalone page without reloading the document`);
    assert.equal(result.animation, "rise-in", "Mobile sections should have a light entrance animation.");
    assert.equal(result.duration, "0.3s");
  }
  browser(["set", "media", "light", "reduced-motion"]);
  assert.equal(evaluate(() => getComputedStyle(document.querySelector(".section-page")).animationName), "none");
  browser(["set", "media", "light"]);
  browser(["reload"]);
  assert.equal(evaluate(() => !!document.querySelector(".section-page") && !document.querySelector(".route-drawer")), true);
  browser(["open", url.href]);
  const mobileCertificates = evaluate(clickAndMeasure, "/certificates");
  assert.ok(mobileCertificates.opened);
  assert.equal(mobileCertificates.side, "bottom");
  assert.equal(mobileCertificates.edge, "0px");
  assert.equal(evaluate(() => document.querySelectorAll(".certificate-fan-card").length), 5);
  evaluate(() => document.querySelector('.certificate-fan-card[aria-label*="Introduction to Model Context Protocol"]').click());
  browser(["wait", "--fn", "!!document.querySelector('.certificate-viewer')"]);
  browser(["wait", "--fn", "document.querySelector('.certificate-viewer img')?.naturalWidth > 0"]);
  assert.equal(evaluate(() => document.querySelector('.certificate-controls a')?.getAttribute('href')), "/certificates/anthropic-introduction-to-mcp.pdf");
  browser(["press", "Escape"]);
  browser(["wait", "--fn", "!document.querySelector('.certificate-viewer')"]);
  assert.equal(evaluate(() => !!document.querySelector(".route-drawer") && document.activeElement?.classList.contains("certificate-fan-card")), true);
  closeDrawer();
  console.log("Desktop/mobile bottom certificate drawers and nested popup focus passed.");
  browser(["set", "viewport", "1280", "900"]);
  browser(["open", new URL("/experience", url).href]);
  assert.equal(evaluate(() => !!document.querySelector(".section-page") && !document.querySelector(".route-drawer")), true);
  console.log("Mobile client navigation and standalone refresh/direct links passed.");
} finally {
  try { browser(["set", "offline", "off"]); } catch {}
  try { browser(["close"]); } catch {}
}
