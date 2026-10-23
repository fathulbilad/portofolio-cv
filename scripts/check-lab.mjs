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
function trackInk() {
  evaluate(() => {
    window.__labInkObserver?.disconnect();
    const path = document.getElementById("lab-ink-path");
    window.__labInk = { frames: [path.getAttribute("d")], changedAt: performance.now() };
    window.__labInkObserver = new MutationObserver(() => {
      const ink = window.__labInk;
      const next = path.getAttribute("d");
      if (ink.frames.at(-1) !== next) { ink.frames.push(next); ink.changedAt = performance.now(); }
    });
    window.__labInkObserver.observe(path, { attributes: true, attributeFilter: ["d"] });
  });
}
function settledInk() {
  wait("performance.now() - window.__labInk.changedAt > 150");
  return evaluate(() => window.__labInk.frames);
}
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

  const moods = { life: "rgb(234, 227, 210)", games: "rgb(164, 184, 196)", music: "rgb(39, 76, 255)", projects: "rgb(0, 213, 219)", odds: "rgb(255, 76, 120)" };
  const contours = [];
  for (const [id, color] of Object.entries(moods)) {
    console.log(`Checking ${id}...`);
    foreground();
    trackInk();
    browser(["hover", `a[href="#${id}"]`]);
    wait(`document.querySelector('[data-lab-mood]').dataset.labMood === '${id}' && getComputedStyle(document.querySelector('[data-lab-mood]')).backgroundColor === '${color}'`);
    const frames = settledInk();
    assert.ok(frames.length > 4, `${id} morphs through intermediate contours instead of jumping.`);
    contours.push(frames.at(-1));
    assert.equal(evaluate(() => {
      const path = document.getElementById("lab-ink-path");
      const inverse = path.getScreenCTM().inverse();
      return [...document.querySelectorAll('nav[aria-label="Explore the Lab"] a')].every(link => {
        const box = link.getBoundingClientRect();
        return [[box.left, box.top], [box.right, box.top], [box.left, box.bottom], [box.right, box.bottom]].every(([x, y]) => path.isPointInFill(new DOMPoint(x, y).matrixTransform(inverse)));
      });
    }), true, "The whole menu remains over solid black.");
    browser(["click", `a[href="#${id}"]`]);
    roomReady(id);
    assert.equal(evaluate(() => document.activeElement.id), "lab-heading", "Focus enters each section.");
    if (id !== "odds") wait(`Array.from(document.querySelectorAll('#lab-content img')).every(img => img.complete && img.naturalWidth > 0)`);
    if (id === "games") {
      const gameTitles = ["Bloodborne", "ULTRAKILL", "Terraria", "Darkest Dungeon 1", "Resident Evil 4 Remake", "Hollow Knight"];
      assert.deepEqual(evaluate(() => [...document.querySelectorAll('[aria-label="Choose a game"] button')].map(button => button.getAttribute("aria-label"))), gameTitles);
      assert.equal(evaluate(() => document.querySelector('[aria-label="Featured game"] h2').textContent), "Bloodborne");
      assert.equal(evaluate(() => document.querySelector('[aria-label="Featured game"]').getBoundingClientRect().bottom < document.querySelector('[aria-label="Choose a game"]').getBoundingClientRect().top), true, "The game preview sits above the horizontal shelf.");
      assert.equal(evaluate(() => { const rail = document.querySelector('[aria-label="Choose a game"]'); return rail.scrollWidth > rail.clientWidth; }), true, "The shelf scrolls horizontally.");
      const gameColors = [evaluate(() => getComputedStyle(document.querySelector('[aria-label="Game collection"]')).backgroundColor)];
      for (const title of gameTitles.slice(1)) {
        browser(["find", "role", "button", "click", "--name", "Next game", "--exact"]);
        assert.equal(evaluate(() => document.querySelector('[aria-label="Featured game"] h2').textContent), title);
        wait(`document.querySelector('[aria-label="Game collection"]').getAnimations().length === 0`);
        gameColors.push(evaluate(() => getComputedStyle(document.querySelector('[aria-label="Game collection"]')).backgroundColor));
      }
      assert.equal(new Set(gameColors).size, gameTitles.length, "Every active game has its own shelf palette.");
      wait(`document.querySelector('[aria-label="Choose a game"]').scrollLeft > 0`);
      browser(["focus", 'button[aria-label="Hollow Knight"]']);
      browser(["press", "Home"]);
      assert.equal(evaluate(() => document.activeElement.getAttribute("aria-label")), "Bloodborne");
      assert.equal(evaluate(() => document.querySelector('[aria-label="Featured game"] h2').textContent), "Bloodborne");
    }
    if (id === "music") {
      assert.equal(evaluate(() => document.querySelectorAll('iframe[src*="open.spotify.com"]').length), 0, "Spotify loads only after opening an album.");
      const musicContour = evaluate(() => document.getElementById("lab-ink-path").getAttribute("d"));
      assert.equal(evaluate(() => [...document.querySelectorAll('[role="option"]')].some(option => option.textContent.includes("Popstar") && option.textContent.includes("Tinashe"))), true);
      browser(["focus", '[role="listbox"][aria-label="Choose a record"]']);
      browser(["press", "Enter"]);
      wait(`!!document.querySelector('iframe[title="Spotify album player: Getting Killed by Geese"]')`);
      wait(`Array.from(document.querySelectorAll('#lab-content img')).every(img => img.complete && img.naturalWidth > 0)`);
      assert.equal(evaluate(() => document.querySelector('[aria-label="Getting Killed album detail"] h2').textContent), "Getting Killed");
      assert.equal(evaluate(() => {
        const frame = document.querySelector('iframe[src*="open.spotify.com"]');
        return frame.src.includes('/album/0eeXb23yMW6EaIgm63xxPC') && frame.allow.includes('encrypted-media') && !frame.src.includes('autoplay=1');
      }), true, "The visible official album embed retains encrypted playback and does not autoplay.");
      assert.equal(evaluate(() => document.getElementById("lab-ink-path").getAttribute("d")), musicContour, "Opening an album keeps the black contour still.");
      browser(["find", "role", "button", "click", "--name", "Close record", "--exact"]);
      assert.equal(evaluate(() => document.querySelectorAll('iframe[src*="open.spotify.com"]').length), 0, "Closing an album unloads Spotify playback.");
      assert.equal(evaluate(() => document.activeElement.getAttribute("aria-label")), "Choose a record", "Close returns focus to the wheel.");
      browser(["press", "End"]);
      browser(["press", "Enter"]);
      wait(`!!document.querySelector('iframe[title="Spotify track player: Popstar by Tinashe"]')`);
      assert.equal(evaluate(() => document.querySelector('[aria-label="Popstar track detail"] h2').textContent), "Popstar");
      assert.ok(evaluate(() => document.querySelector('iframe').src.includes('/track/7aF0puGulyEEJkOQZNKNyu')));
      browser(["find", "role", "button", "click", "--name", "Close record", "--exact"]);
      browser(["press", "Home"]);
      browser(["click", '[role="option"][aria-selected="true"]']);
      wait(`!!document.querySelector('iframe[src*="open.spotify.com"]')`);
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
    if (id === "music") assert.equal(evaluate(() => document.querySelectorAll('iframe[src*="open.spotify.com"]').length), 0, "Leaving Music unloads its player.");
    assert.equal(evaluate(() => document.activeElement.getAttribute("href")), `#${id}`, "Focus returns to the opener.");
  }
  assert.equal(new Set(contours).size, 5, "Every menu has a distinct silhouette.");
  foreground();
  trackInk();
  for (const id of Object.keys(moods)) browser(["hover", `a[href="#${id}"]`]);
  assert.equal(settledInk().at(-1), contours.at(-1), "Rapid hovers settle on the final selection.");

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
  open("/lab#music");
  assert.equal(evaluate(() => document.querySelectorAll('[aria-label="Choose a record"], iframe[src*="open.spotify.com"]').length), 0, "The Music wheel and player are not mounted on phones.");
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
  trackInk();
  browser(["focus", 'a[href="#music"]']);
  wait("document.querySelector('[data-lab-mood]').dataset.labMood === 'music'");
  assert.ok(settledInk().length <= 2, "Reduced motion changes contour without intermediate animation frames.");
  browser(["click", 'a[href="#life"]']); roomReady("life");
  assert.equal(evaluate(() => !!document.querySelector("[data-phase]")), false, "Reduced motion skips the ink wipe.");
  escaped();
  foreground();
  browser(["click", 'header a[href="/"]']);
  assert.equal(evaluate(() => document.querySelector('.lab-route-transition')?.getAttribute('data-reduced')), "true", "Reduced motion gets the route fade.");
  wait(`location.pathname === '/' && !document.querySelector('.lab-route-transition')`);
  open("/lab#unknown"); menuReady();
  console.log("Lab passed: five animated silhouettes and palettes; rapid hover changes; menu contrast; sections; sample selections; images; keyboard focus; Back/Forward; opt-in sound; desktop/tablet layouts; phone entry hidden; CV/Lab route transition; reduced motion; invalid hash recovery.");
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
