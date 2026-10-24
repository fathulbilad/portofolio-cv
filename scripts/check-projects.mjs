import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3107");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `projects-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);
const box = selector => JSON.parse(browser(["eval", "--stdin"], `document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().toJSON()`));
const page = index => `[data-folder-item="${index}"]`;
const isOpen = () => evaluate(() => !!document.querySelector(".folder-root[data-open]"));
function ready() { wait(`document.fonts.status==='loaded' && !!document.querySelector('.folder-stage') && !document.querySelector('[data-phase]') && document.visibilityState==='visible'`); }
function open() {
  browser(["open", new URL("/lab#projects", origin).href]);
  browser(["tab", "t1"]);
  ready();
}
function settled() {
  // Track the real transforms; springs are not Web Animations.
  evaluate(() => {
    const nodes = [...document.querySelectorAll(".folder-layer")];
    let previous = "";
    let stable = 0;
    window.__archiveSettled = false;
    const sample = () => {
      const next = nodes.map(node => node.style.transform).join("|");
      stable = next === previous ? stable + 1 : 0;
      previous = next;
      if (stable >= 5) window.__archiveSettled = true;
      else requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  wait("window.__archiveSettled");
}
function drag(index, x, y) {
  const rect = box(page(index));
  const from = [rect.left + rect.width / 2, rect.top + rect.height / 2];
  browser(["mouse", "move", ...from.map(value => String(Math.round(value)))]);
  browser(["mouse", "down"]);
  for (let step = 1; step <= 8; step++) browser(["mouse", "move", String(Math.round(from[0] + (x - from[0]) * step / 8)), String(Math.round(from[1] + (y - from[1]) * step / 8))]);
  browser(["mouse", "up"]);
  browser(["mouse", "move", "30", "90"]);
  settled();
}
function fits(selector) {
  const item = box(selector);
  const desk = box('[aria-label="Draggable project workspace"]');
  assert.ok(item.left >= desk.left - 2 && item.top >= desk.top - 2 && item.right <= desk.right + 2 && item.bottom <= desk.bottom + 2, `Page fits workspace: ${JSON.stringify({ item, desk })}`);
}
try {
  browser(["--headed", "false", "open", new URL("/lab", origin).href]);
  browser(["set", "viewport", "1440", "900"]);
  browser(["tab", "t1"]);
  wait(`document.fonts.status==='loaded' && !!document.querySelector('a[href="#projects"]')`);
  browser(["hover", 'a[href="#projects"]']);
  evaluate(() => { window.__originalInk = document.getElementById("lab-ink-path"); window.__menuInk = window.__originalInk.getAttribute("d"); });
  browser(["click", 'a[href="#projects"]']);
  ready();
  settled();
  assert.equal(evaluate(() => document.getElementById("lab-ink-path") === window.__originalInk), true, "Entering Projects keeps one persistent path.");
  assert.notEqual(evaluate(() => document.getElementById("lab-ink-path").getAttribute("d")), evaluate(() => window.__menuInk), "The menu contour turns into a horizontal sweep.");
  const workspace = box('[aria-label="Draggable project workspace"]');
  const heading = box('#lab-heading');
  assert.ok(workspace.left < 1440 * .1 && workspace.right > 1440 * .9 && workspace.top > heading.bottom, "Projects has a wide workspace below its heading.");
  assert.equal(evaluate(() => getComputedStyle(document.querySelector('header button[aria-label*="interface sounds"]')).color), "rgb(17, 16, 17)", "Sound control remains readable on cyan.");
  evaluate(() => {
    const start = performance.now();
    const path = document.getElementById("lab-ink-path");
    const folder = document.querySelector('.folder-root').getBoundingClientRect();
    window.__sweep = { frames: new Set(), safe: true, stableFolder: true, done: false };
    function sample() {
      const probe = window.__sweep;
      probe.frames.add(path.getAttribute("d"));
      const inverse = path.getScreenCTM().inverse();
      const inInk = (x, y) => path.isPointInFill(new DOMPoint(x, y).matrixTransform(inverse));
      const desk = document.querySelector('[aria-label="Draggable project workspace"]').getBoundingClientRect();
      const intro = document.getElementById('lab-heading').parentElement.getBoundingClientRect();
      const corners = rect => [[rect.left + 1, rect.top + 1], [rect.right - 1, rect.top + 1], [rect.left + 1, rect.bottom - 1], [rect.right - 1, rect.bottom - 1]];
      // Ignore the last part of the entry morph, then check a whole idle cycle.
      if (performance.now() - start > 400) probe.safe &&= corners(desk).every(([x, y]) => inInk(x, y)) && corners(intro).every(([x, y]) => !inInk(x, y));
      const nextFolder = document.querySelector('.folder-root').getBoundingClientRect();
      probe.stableFolder &&= Math.abs(nextFolder.x - folder.x) < 1 && Math.abs(nextFolder.y - folder.y) < 1;
      if (performance.now() - start < 9000) requestAnimationFrame(sample);
      else probe.done = true;
    }
    requestAnimationFrame(sample);
  });
  wait("window.__sweep.done");
  assert.ok(evaluate(() => window.__sweep.frames.size) > 60, "The sweep keeps morphing after entry.");
  assert.equal(evaluate(() => window.__sweep.safe), true, "Cyan intro and black workspace stay clear during a whole cycle.");
  assert.equal(evaluate(() => window.__sweep.stableFolder), true, "Only the background moves; folder placement is stable.");
  assert.equal(evaluate(() => document.querySelector('[data-ink-motion]').dataset.inkMotion), "sweeping");
  // Hidden tabs must stop the cycle, and returning resumes it.
  evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: true }); document.dispatchEvent(new Event("visibilitychange")); });
  wait(`document.querySelector('[data-ink-motion]').dataset.inkMotion === 'resting'`);
  const hiddenPath = evaluate(() => document.getElementById('lab-ink-path').getAttribute('d'));
  evaluate(() => { window.__pauseDone = false; setTimeout(() => window.__pauseDone = true, 180); });
  wait("window.__pauseDone");
  assert.equal(evaluate(() => document.getElementById('lab-ink-path').getAttribute('d')), hiddenPath, "Hidden-tab motion stops.");
  evaluate(() => { delete document.hidden; document.dispatchEvent(new Event("visibilitychange")); });
  wait(`document.querySelector('[data-ink-motion]').dataset.inkMotion === 'sweeping'`);
  console.log("Full-width layout, entry morph, complete idle cycle, contrast, stable folder, and visibility pause passed.");
  assert.equal(isOpen(), false, "The archive starts closed.");
  assert.equal(evaluate(() => document.querySelectorAll(".folder-root").length), 1);
  assert.equal(evaluate(() => document.querySelectorAll("audio,video,canvas").length), 0, "Matte folder uses no WebGL or autoplay media.");
  assert.equal(evaluate(() => getComputedStyle(document.querySelector("[data-lab-mood]")).backgroundColor), "rgb(0, 213, 219)");
  browser(["click", ".folder-stage"]);
  settled();
  for (const index of [0, 1, 2]) fits(page(index));
  const desk = box('[aria-label="Draggable project workspace"]');
  drag(0, desk.left + desk.width * .22, desk.bottom - 155);
  assert.equal(evaluate(() => document.querySelector('[data-folder-item="0"]').dataset.folderOutside), "true", "A real pointer drag leaves a page out.");
  assert.equal(evaluate(() => !!document.querySelector("dialog[open]")), false, "Dragging never opens the reader.");
  fits(page(0));
  browser(["click", page(0)]);
  wait(`!!document.querySelector('dialog[open]')`);
  assert.equal(evaluate(() => document.querySelector("dialog h2").textContent), "This little lab");
  browser(["press", "Escape"]);
  wait(`!document.querySelector('dialog[open]')`);
  assert.equal(evaluate(() => document.activeElement.dataset.folderItem), "0", "Put-down restores focus to the same page.");
  assert.equal(isOpen(), true, "Escape in the reader does not close the folder.");
  browser(["click", page(0)]);
  wait(`!!document.querySelector('dialog[open]')`);
  browser(["find", "role", "button", "click", "--name", "Put down ×", "--exact"]);
  wait(`!document.querySelector('dialog[open]')`);
  assert.equal(isOpen(), true, "Clicking Put down preserves the open folder.");
  // Put the loose page back using the real folder pocket.
  const pocket = box(".folder-root");
  drag(0, pocket.left + pocket.width / 2, pocket.top + pocket.height * .75);
  assert.equal(evaluate(() => !!document.querySelector('[data-folder-item="0"][data-folder-outside]')), false, "Drop over the folder files the page.");
  // Throw toward both screen edges: each release must remain inside the black desk.
  drag(1, 20, 25);
  fits(page(1));
  drag(1, 1425, 885);
  fits(page(1));
  assert.equal(evaluate(() => !!document.querySelector("dialog[open]")), false);
  browser(["set", "viewport", "768", "1024"]);
  settled();
  fits(page(1));
  browser(["find", "role", "button", "click", "--name", "File everything away ↙", "--exact"]);
  settled();
  assert.equal(isOpen(), false);
  assert.equal(evaluate(() => document.querySelectorAll("[data-folder-outside]").length), 0);
  assert.equal(evaluate(() => document.activeElement.classList.contains("folder-stage")), true);
  console.log("Desktop: closed default, fan, real drag, reader, focus, drop-back, bounds, resize, and file-all passed.");

  for (const [width, height] of [[768, 1024], [1024, 768], [1280, 600]]) {
    browser(["set", "viewport", String(width), String(height)]);
    open(); settled();
    browser(["focus", ".folder-stage"]);
    browser(["press", "Enter"]);
    settled();
    for (const index of [0, 1, 2]) fits(page(index));
    browser(["focus", page(1)]);
    browser(["press", "Enter"]);
    wait(`!!document.querySelector('dialog[open]')`);
    assert.equal(evaluate(() => !!document.querySelector('dialog a[href="/side-projects"]')), true);
    const reader = box("dialog[open]");
    assert.ok(reader.top >= 70 && reader.bottom <= height && reader.left > 0 && reader.right < width && Math.abs((reader.left + reader.right) / 2 - width / 2) < 2, "Reader is centered and fits the screen.");
    browser(["press", "Tab"]);
    assert.equal(evaluate(() => document.activeElement.tagName), "A");
    browser(["press", "Escape"]);
    wait(`!document.querySelector('dialog[open]')`);
    browser(["press", "Escape"]);
    wait(`!document.querySelector('.folder-root[data-open]')`);
    assert.equal(evaluate(() => location.hash), "#projects");
    browser(["press", "Escape"]);
    wait(`!location.hash && !document.querySelector('[data-phase]')`);
    assert.equal(evaluate(() => document.activeElement.getAttribute("href")), "#projects");
    console.log(`${width} × ${height}: pages, reader, keyboard, Escape hierarchy, and menu focus passed.`);
  }
  browser(["set", "media", "light", "reduced-motion"]);
  open();
  browser(["focus", ".folder-stage"]);
  assert.equal(evaluate(() => document.querySelector('[data-ink-motion]').dataset.inkMotion), "resting", "Reduced motion has no idle sweep.");
  const reducedPath = evaluate(() => document.getElementById('lab-ink-path').getAttribute('d'));
  browser(["press", "Space"]);
  settled();
  assert.equal(evaluate(() => document.getElementById('lab-ink-path').getAttribute('d')), reducedPath, "Folder interaction leaves the reduced-motion boundary still.");
  assert.equal(isOpen(), true);
  browser(["focus", page(2)]);
  browser(["press", "Space"]);
  wait(`!!document.querySelector('dialog[open]')`);
  browser(["click", "header button:first-child"]);
  wait(`!location.hash && !document.querySelector('dialog[open]')`);
  assert.equal(evaluate(() => !!document.querySelector('.folder-root')), false, "Leaving Projects unmounts the folder and reader.");
  browser(["set", "viewport", "390", "844"]);
  browser(["open", new URL("/lab#projects", origin).href]);
  assert.equal(evaluate(() => document.querySelectorAll('.folder-root, dialog').length), 0, "Archive does not mount on phones.");
  assert.equal(browser(["errors"]), "");
  console.log("Reduced motion, direct Menu exit from reader, phone exclusion, and browser errors passed.");
} catch (error) {
  browser(["screenshot", "/private/tmp/projects-check-failure.png"]);
  console.error(browser(["errors"]));
  throw error;
} finally {
  browser(["close"]);
}
