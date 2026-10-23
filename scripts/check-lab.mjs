import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(url.hostname), "Use a local preview.");
const session = `cv-lab-${process.pid}`;
const directory = mkdtempSync(join(tmpdir(), "cv-lab-"));
const probePath = join(directory, "probe.js");
writeFileSync(probePath, `window.__labAudioContexts = 0; if (window.AudioContext) { const Original = window.AudioContext; window.AudioContext = class extends Original { constructor(...args) { super(...args); window.__labAudioContexts++; } }; }`);
function browser(args, input) {
  return execFileSync("agent-browser", ["--session", session, ...args], { encoding: "utf8", input, timeout: 45000 }).trim();
}
function evaluate(fn) { return JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`)); }
function wait(expression) { browser(["wait", "--fn", expression]); }
function foreground() { browser(["tab", "t1"]); wait("document.visibilityState === 'visible'"); }
function open(path) { browser(["open", new URL(path, url).href]); foreground(); }
function menuReady() { wait(`!!document.querySelector('nav[aria-label="Explore the Lab"]') && !document.querySelector('[data-phase]')`); }
function roomReady(id) { wait(`location.hash === '#${id}' && !!document.getElementById('lab-heading') && !document.querySelector('[data-phase]')`); }
function escaped() { browser(["press", "Escape"]); menuReady(); }
function layoutFits(label) {
  const state = evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    clippedLinks: [...document.querySelectorAll('nav[aria-label="Explore the Lab"] a')].some(link => {
      const box = link.getBoundingClientRect();
      return box.left < 0 || box.right > innerWidth + 2 || box.bottom > innerHeight + 2;
    }),
  }));
  assert.deepEqual(state, { horizontalOverflow: false, clippedLinks: false }, `${label}: ${JSON.stringify(state)}`);
}
try {
  browser(["--headed", "false", "open", new URL("/lab", url).href]);
  foreground();
  browser(["set", "viewport", "1440", "900"]);
  menuReady();
  browser(["eval", "--stdin"], readFileSync(probePath, "utf8"));
  wait(`!!document.querySelector('nav[aria-label="Explore the Lab"] canvas')`);
  assert.equal(evaluate(() => window.__labAudioContexts), 0, "No audio context before opting in.");
  assert.equal(evaluate(() => document.querySelector('button[aria-label="Turn interface sounds on"]').getAttribute("aria-pressed")), "false");
  assert.equal(evaluate(() => document.querySelector('nav[aria-label="Explore the Lab"]').querySelectorAll("a").length), 5);
  assert.equal(evaluate(() => document.querySelectorAll("audio, video").length), 0, "No hosted or autoplay music.");
  layoutFits("Desktop menu");

  const moods = { life: "rgb(234, 227, 210)", games: "rgb(240, 255, 0)", music: "rgb(39, 76, 255)", projects: "rgb(0, 213, 219)", odds: "rgb(255, 76, 120)" };
  for (const [id, color] of Object.entries(moods)) {
    console.log(`Checking ${id}...`);
    browser(["hover", `a[href="#${id}"]`]);
    wait(`document.querySelector('[data-lab-mood]').dataset.labMood === '${id}' && getComputedStyle(document.querySelector('[data-lab-mood]')).backgroundColor === '${color}'`);
    browser(["click", `a[href="#${id}"]`]);
    roomReady(id);
    assert.equal(evaluate(() => document.activeElement.id), "lab-heading", "Focus enters each section.");
    if (id !== "odds") wait(`Array.from(document.querySelectorAll('#lab-content img')).every(img => img.complete && img.naturalWidth > 0)`);
    if (id === "games") {
      browser(["find", "role", "button", "click", "--name", "Portal 2", "--exact"]);
      assert.ok(evaluate(() => document.getElementById("lab-content").textContent.includes("A room, an impossible-looking problem")));
    }
    if (id === "music") {
      browser(["find", "role", "button", "click", "--name", "All-time favorites", "--exact"]);
      assert.equal(evaluate(() => document.querySelector("figure strong").textContent), "In Rainbows");
      assert.ok(evaluate(() => document.querySelector('a[href*="open.spotify.com"]').href.includes("Radiohead")));
    }
    if (id === "projects") {
      browser(["find", "role", "button", "click", "--name", "Cardio — Experiment", "--exact"]);
      assert.equal(evaluate(() => !!document.querySelector('a[href="/side-projects"]')), true);
    }
    if (id === "odds") {
      browser(["find", "role", "button", "click", "--name", "A little list", "--exact"]);
      assert.ok(evaluate(() => document.getElementById("lab-content").textContent.includes("A few good ingredients.")));
    }
    escaped();
    assert.equal(evaluate(() => document.activeElement.getAttribute("href")), `#${id}`, "Focus returns to the opener.");
  }

  browser(["click", 'a[href="#games"]']); roomReady("games");
  evaluate(() => history.back()); menuReady();
  evaluate(() => history.forward()); roomReady("games");
  escaped();
  foreground();
  browser(["find", "role", "button", "click", "--name", "Turn interface sounds on", "--exact"]);
  wait(`window.__labAudioContexts > 0`);
  assert.equal(evaluate(() => document.querySelector('button[aria-label="Turn interface sounds off"]').getAttribute("aria-pressed")), "true");
  browser(["find", "role", "button", "click", "--name", "Turn interface sounds off", "--exact"]);

  for (const [width, height] of [[768, 1024], [1024, 768], [1280, 720]]) {
    browser(["set", "viewport", String(width), String(height)]);
    open("/lab"); menuReady(); layoutFits(`${width} × ${height} menu`);
    browser(["click", 'a[href="#music"]']); roomReady("music");
    assert.equal(evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
  }
  browser(["set", "viewport", "768", "1024"]);
  for (const id of Object.keys(moods)) {
    open(`/lab#${id}`); roomReady(id);
    assert.equal(evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Tablet ${id}`);
  }
  browser(["set", "viewport", "390", "844"]);
  open("/lab");
  assert.equal(evaluate(() => document.querySelector('nav[aria-label="Explore the Lab"]').getClientRects().length), 0, "The desktop Lab is hidden on phones.");
  assert.ok(evaluate(() => [...document.querySelectorAll("h1")].some(heading => heading.getClientRects().length > 0 && heading.textContent === "A little more room.")));
  assert.equal(evaluate(() => document.querySelectorAll("canvas").length), 0, "No Tech Text renderer on phones.");
  open("/");
  evaluate(() => { localStorage.setItem("cv-welcome-seen", "1"); });
  open("/");
  assert.equal(evaluate(() => document.querySelector('a[href="/lab"]').getClientRects().length), 0, "The CV entry is hidden on phones.");
  browser(["set", "viewport", "1024", "768"]);
  assert.ok(evaluate(() => document.querySelector('a[href="/lab"]').getClientRects().length) > 0, "The CV entry is visible on tablet.");
  browser(["click", ".lab-entry"]);
  assert.equal(evaluate(() => !!document.querySelector(".lab-route-transition")), true, "CV to Lab has a transition cover.");
  wait(`location.pathname === '/lab' && !document.querySelector('.lab-route-transition') && !!document.activeElement.closest('#lab-content')`);
  assert.equal(evaluate(() => !!document.querySelector("[inert]")), false, "The destination is interactive after the reveal.");
  browser(["set", "media", "light", "reduced-motion"]);
  open("/lab"); menuReady();
  assert.equal(evaluate(() => document.querySelectorAll("canvas").length), 0);
  browser(["click", 'a[href="#life"]']); roomReady("life");
  assert.equal(evaluate(() => !!document.querySelector("[data-phase]")), false, "Reduced motion skips the ink wipe.");
  escaped();
  foreground();
  browser(["click", 'header a[href="/"]']);
  assert.equal(evaluate(() => document.querySelector('.lab-route-transition')?.getAttribute('data-reduced')), "true", "Reduced motion gets the route fade.");
  wait(`location.pathname === '/' && !document.querySelector('.lab-route-transition')`);
  open("/lab#unknown"); menuReady();
  console.log("Lab passed: five hover palettes and sections; sample selections; images; keyboard focus; Back/Forward; opt-in sound; desktop/tablet layouts; phone entry hidden; CV/Lab route transition; reduced motion; invalid hash recovery.");
} catch (error) {
  try {
    console.error(evaluate(() => ({ url: location.href, hidden: document.hidden, active: document.activeElement?.outerHTML.slice(0, 200), routePhase: document.querySelector('.lab-route-transition')?.getAttribute('data-route-phase'), inert: document.querySelectorAll('[inert]').length, sound: document.querySelector('[aria-label*="interface sounds"]')?.outerHTML.slice(0, 200), contexts: window.__labAudioContexts, audio: window.AudioContext.name, mood: document.querySelector("[data-lab-mood]")?.getAttribute("data-lab-mood"), images: [...document.querySelectorAll("#lab-content img")].map(img => ({ src: img.currentSrc, complete: img.complete, width: img.naturalWidth, box: img.getBoundingClientRect().toJSON() })) })));
    browser(["screenshot", "/private/tmp/lab-check-failure.png"]);
    console.error(browser(["errors"]));
  } catch {}
  throw error;
} finally {
  try { browser(["close"]); } catch {}
  rmSync(directory, { recursive: true, force: true });
}
