import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3107");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const sections = process.argv[3] ? [process.argv[3]] : ["life", "games", "music", "projects", "odds"];
const viewport = [process.argv[4] ?? "1440", process.argv[5] ?? "900"];
const session = `lab-return-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);

try {
  browser(["--headed", "false", "open", new URL("/lab", origin).href]);
  browser(["tab", "t1"]);
  browser(["set", "viewport", ...viewport]);
  wait(`document.fonts.status === 'loaded' && !!document.querySelector('nav[aria-label="Explore the Lab"]')`);
  const failures = [];
  for (const id of sections) {
    browser(["hover", `a[href="#${id}"]`]);
    browser(["click", `a[href="#${id}"]`]);
    wait(`location.hash === '#${id}' && !document.querySelector('[data-phase]')`);
    evaluate(() => {
      const start = performance.now();
      const frames = [];
      window.__labReturn = { frames, done: false };
      function sample() {
        const svg = document.querySelector("[data-ink-shape]");
        const path = document.getElementById("lab-ink-path");
        if (document.querySelector('nav[aria-label="Explore the Lab"]') && !document.querySelector("[data-phase]")) {
          // Only count boundary movement the visitor can see after the wipe.
          const frame = `${path.getAttribute("d")}|${getComputedStyle(svg).transform}`;
          if (frames.at(-1) !== frame) frames.push(frame);
        }
        if (performance.now() - start < 1500) requestAnimationFrame(sample);
        else window.__labReturn.done = true;
      }
      requestAnimationFrame(sample);
    });
    browser(["click", "header button:first-child"]);
    wait("window.__labReturn.done");
    const frames = evaluate(() => window.__labReturn.frames.length);
    console.log(`${id}: ${frames} visible boundary frames after returning to the menu`);
    if (frames <= 4) failures.push(id);
    assert.equal(evaluate(() => document.activeElement.getAttribute("href")), `#${id}`, "Return restores focus.");
  }
  assert.deepEqual(failures, [], "Every detail page must animate the boundary back after the wipe clears.");
  assert.equal(browser(["errors"]), "");
  console.log("All detail-to-menu boundary animations passed.");
} finally {
  browser(["close"]);
}
