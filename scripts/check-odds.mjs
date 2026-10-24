import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `odds-room-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);
const contact = index => `nav[aria-label="Five sides of my mind"] button[data-voice="${index}"]`;
const voices = ["thinker", "yapper", "memer", "schizofriends", "larper"];
function selected(id) {
  wait(`document.querySelectorAll('[data-chat-voice]').length === 1 && !!document.querySelector('[data-chat-voice="${id}"]') && document.querySelectorAll('[data-odds-message]').length === 3`);
}
function fits() {
  return evaluate(async () => {
    await new Promise(resolve => {
      let previous = "", stable = 0;
      const sample = () => {
        const path = document.getElementById("lab-ink-path");
        const values = [...document.querySelectorAll('[data-odds-message] > div')].map(el => `${getComputedStyle(el).opacity}|${getComputedStyle(el).transform}`);
        const next = path.getAttribute("d") + values.join();
        stable = next === previous ? stable + 1 : 0; previous = next;
        if (stable > 10) resolve(); else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const nav = document.querySelector('nav[aria-label="Five sides of my mind"]');
    const buttons = [...nav.querySelectorAll("button")].map(el => el.getBoundingClientRect());
    const messages = document.querySelector('[data-odds-message]').parentElement;
    const heading = document.getElementById("lab-heading").getBoundingClientRect();
    const path = document.getElementById("lab-ink-path"), inverse = path.getScreenCTM().inverse();
    const captions = [...document.querySelectorAll('#odds-thread h2, #odds-thread header p, #odds-thread header button, #odds-thread [class*="chatNote"]')];
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      contactsFit: buttons.every((box,i) => box.left >= 0 && box.right < innerWidth && box.bottom <= innerHeight && (!i || box.top >= buttons[i-1].bottom)),
      headingClear: heading.bottom + 10 < nav.getBoundingClientRect().top,
      messagesFit: messages.scrollHeight <= messages.clientHeight + 1 && messages.scrollWidth <= messages.clientWidth + 1,
      captionsOnInk: captions.every(el => {
        const range = document.createRange(); range.selectNodeContents(el);
        return [...range.getClientRects()].every(box => [0.1, 0.5, 0.9].every(f => path.isPointInFill(new DOMPoint(box.x + box.width * f, box.y + box.height / 2).matrixTransform(inverse))));
      }),
    };
  });
}
try {
  browser(["--headed", "false", "open", new URL("/lab#odds", origin).href]);
  browser(["tab", "t1"]); browser(["set", "viewport", "1440", "900"]);
  wait(`document.fonts.status === 'loaded' && !!document.querySelector('[data-odds-room]')`);
  selected("thinker");
  const names = evaluate(() => [...document.querySelectorAll('nav[aria-label="Five sides of my mind"] button')].map(el => el.textContent));
  ["Thinker", "Yapper", "Memer", "Schizofriends", "Larper"].forEach((name,i) => assert.ok(names[i].includes(name)));
  assert.equal(names.length, 5);
  assert.equal(evaluate(() => document.querySelectorAll("#lab-content input, #lab-content textarea, #lab-content form").length), 0);
  assert.equal(evaluate(() => /your reply|choose a reply/i.test(document.getElementById("lab-content").textContent)), false);
  assert.equal(evaluate(() => document.querySelectorAll('[data-odds-message][data-from="me"]').length), 1);

  evaluate(() => {
    const start = performance.now(); window.__oddsMotion = { frames: [], done: false };
    const sample = () => {
      const pane = document.querySelector('[data-chat-voice="yapper"]');
      if (pane) window.__oddsMotion.frames.push([...pane.querySelectorAll('[data-odds-message] > div')].map(el => ({ opacity: Number(getComputedStyle(el).opacity), transform: getComputedStyle(el).transform })));
      if (performance.now() - start < 1100) requestAnimationFrame(sample); else window.__oddsMotion.done = true;
    };
    requestAnimationFrame(sample);
  });
  browser(["click", contact(1)]); selected("yapper"); wait("window.__oddsMotion.done");
  const frames = evaluate(() => window.__oddsMotion.frames);
  for (let i = 0; i < 3; i++) assert.ok(new Set(frames.map(frame => JSON.stringify(frame[i]))).size > 5, `Message ${i+1} visibly animates through intermediate states.`);
  assert.ok(frames.some(frame => frame[0]?.opacity > 0.2 && frame[2]?.opacity < 0.1), "Message entrances are staggered.");
  const paths = new Set();
  for (let i = 0; i < voices.length; i++) {
    browser(["click", contact(i)]); selected(voices[i]);
    assert.deepEqual(fits(), { overflow: false, contactsFit: true, headingClear: true, messagesFit: true, captionsOnInk: true });
    paths.add(evaluate(() => document.getElementById("lab-ink-path").getAttribute("d")));
  }
  assert.equal(paths.size, 5, "The speech-bubble tail follows every contact.");
  browser(["click", contact(2)]); browser(["click", contact(0)]); browser(["click", contact(4)]); selected("larper");
  browser(["focus", contact(4)]); browser(["press", "Home"]); selected("thinker"); browser(["press", "End"]); selected("larper");

  for (const [width,height] of [[1440,900],[1024,768],[768,1024],[1024,600],[1440,520]]) {
    browser(["set", "viewport", String(width), String(height)]);
    browser(["click", contact(3)]); selected("schizofriends");
    assert.deepEqual(fits(), { overflow: false, contactsFit: true, headingClear: true, messagesFit: true, captionsOnInk: true }, `${width} × ${height}`);
    console.log(`Odds & Ends ${width} × ${height}: all contacts, messages, and captions fit.`);
  }
  browser(["press", "Escape"]); wait(`!!document.querySelector('[data-chat-voice="closed"]')`);
  assert.equal(evaluate(() => location.hash), "#odds");
  assert.equal(evaluate(() => document.activeElement.dataset.voice), "3");
  browser(["press", "Escape"]); wait(`!!document.querySelector('nav[aria-label="Explore the Lab"]') && !document.querySelector('[data-phase]')`);
  assert.equal(evaluate(() => document.activeElement.getAttribute("href")), "#odds");

  browser(["set", "media", "light", "reduced-motion"]);
  browser(["open", new URL("/lab#odds", origin).href]); browser(["tab", "t1"]);
  wait(`document.visibilityState === 'visible' && !!document.querySelector('[data-odds-room]')`);
  browser(["click", contact(1)]); selected("yapper");
  assert.equal(evaluate(() => [...document.querySelectorAll('[data-odds-message] > div')].every(el => getComputedStyle(el).opacity === "1" && getComputedStyle(el).transform === "none")), true, "Reduced motion shows the bubbles immediately.");
  browser(["set", "viewport", "390", "844"]); wait("!document.querySelector('[data-odds-room]')");
  assert.equal(browser(["errors"]), "");
  console.log("Five read-only voices, bubble exit/entrance/stagger, rapid changes, moving tail, keyboard/focus, reduced motion, and phone gating passed.");
} catch (error) {
  console.error(evaluate(() => ({ url: location.href, width: innerWidth, visible: document.visibilityState, large: matchMedia('(min-width: 768px) and (min-height: 501px), (min-width: 768px) and (pointer: fine)').matches, mounted: !!document.querySelector('[data-odds-room]') })));
  throw error;
} finally {
  browser(["close"]);
}
