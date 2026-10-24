import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3107");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `music-state-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);
const motion = () => evaluate(() => document.querySelector("[data-ink-motion]").dataset.inkMotion);
function ready() {
  browser(["tab", "t1"]);
  wait(`!!document.querySelector('[aria-label="Choose a record"]') && !document.querySelector('[data-phase]')`);
}
function openRecord() {
  browser(["focus", '[aria-label="Choose a record"]']);
  browser(["press", "Enter"]);
  wait("!!window.__spotifyTest");
}
function stubProvider() {
  // Test only the public controller contract. No audio, streams, credentials,
  // provider internals, or React state are accessed by this test double.
  evaluate(() => {
    window.__destroyed = 0;
    Object.defineProperty(window, "onSpotifyIframeApiReady", {
      configurable: true,
      set(callback) {
        queueMicrotask(() => callback({
          createController(target, options, ready) {
            const frame = document.createElement("iframe");
            frame.src = "about:blank";
            target.replaceWith(frame);
            const listeners = {};
            window.__spotifyTest = {
              url: options.url,
              emit(data) { listeners.playback_update?.({ data }); },
              error() { listeners.error?.({ data: {} }); },
            };
            ready({
              addListener(name, listener) { listeners[name] = listener; },
              destroy() { window.__destroyed++; frame.remove(); },
            });
          },
        }));
      },
    });
  });
}
function track() {
  return evaluate(() => {
    const path = document.getElementById("lab-ink-path");
    window.__inkObserver?.disconnect();
    window.__ink = { frames: [path.getAttribute("d")], changedAt: performance.now() };
    window.__inkObserver = new MutationObserver(() => {
      const next = path.getAttribute("d");
      if (window.__ink.frames.at(-1) !== next) {
        window.__ink.frames.push(next);
        window.__ink.changedAt = performance.now();
      }
    });
    window.__inkObserver.observe(path, { attributes: true, attributeFilter: ["d"] });
    return path.getAttribute("d");
  });
}
function stopped(base) {
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'resting' && performance.now() - window.__ink.changedAt > 200");
  assert.equal(evaluate(() => document.getElementById("lab-ink-path").getAttribute("d")), base);
}

try {
  browser(["--headed", "false", "open", new URL("/lab#music", origin).href]);
  browser(["set", "viewport", "1440", "900"]);
  browser(["network", "route", "https://open.spotify.com/embed/iframe-api/v1", "--abort"]);
  ready(); stubProvider(); openRecord();
  const base = track();
  assert.equal(motion(), "resting", "Opening a record never starts the motion.");
  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false, position: 0, duration: 30000 }));
  wait("window.__ink.frames.length > 5");
  assert.equal(motion(), "playing");
  assert.ok(evaluate(() => new Set(window.__ink.frames).size) > 5, "Playback morphs through intermediate shapes.");
  evaluate(() => window.__spotifyTest.emit({ isPaused: true }));
  stopped(base);

  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: true }));
  assert.equal(motion(), "resting", "Buffering keeps the shape still.");
  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false }));
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'playing'");
  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false, position: 30000, duration: 30000 }));
  stopped(base);

  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false }));
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'playing'");
  evaluate(() => window.__spotifyTest.error());
  stopped(base);
  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false }));
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'playing'");
  evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, value: true }); document.dispatchEvent(new Event("visibilitychange")); });
  stopped(base);
  evaluate(() => { delete document.hidden; document.dispatchEvent(new Event("visibilitychange")); });
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'playing'");

  evaluate(() => { window.__oldPlayer = window.__spotifyTest; });
  browser(["click", 'button[aria-label="Close record"]']);
  stopped(base);
  assert.equal(evaluate(() => window.__destroyed), 1);
  assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0);
  evaluate(() => window.__oldPlayer.emit({ isPaused: false }));
  assert.equal(motion(), "resting", "Late events from a closed record are ignored.");
  browser(["press", "Home"]); browser(["press", "ArrowDown"]); browser(["press", "Enter"]);
  wait("window.__spotifyTest !== window.__oldPlayer");
  assert.ok(evaluate(() => window.__spotifyTest.url.includes("/album/06CjF89lLSSiVWXujVVtQs")), "Popstar opens the full Tinashe album.");
  evaluate(() => window.__spotifyTest.emit({ isPaused: false }));
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'playing'");
  browser(["press", "Escape"]);
  wait(`!!document.querySelector('nav[aria-label="Explore the Lab"]')`);
  assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0);
  assert.equal(motion(), "resting");

  browser(["set", "media", "light", "reduced-motion"]);
  browser(["open", new URL("/lab#music", origin).href]); browser(["reload"]); ready(); stubProvider(); openRecord();
  track();
  evaluate(() => window.__spotifyTest.emit({ isPaused: false, isBuffering: false }));
  assert.equal(motion(), "resting", "Reduced motion disables playback morphing.");
  assert.equal(evaluate(() => window.__ink.frames.length), 1);
  browser(["click", 'button[aria-label="Close record"]']);

  // With the API blocked and no test controller, the ordinary visible widget
  // remains usable and never claims that playback has started.
  browser(["open", new URL("/lab#music", origin).href]); browser(["reload"]); ready();
  browser(["focus", '[aria-label="Choose a record"]']); browser(["press", "Enter"]);
  wait(`!!document.querySelector('iframe[src*="/embed/album/"]')`);
  assert.equal(motion(), "resting");
  browser(["click", 'button[aria-label="Close record"]']);
  assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0);
  assert.equal(browser(["errors"]), "");
  console.log("Music playback, pause, buffering, completion, errors, hidden tabs, cleanup, reduced motion, full album, and blocked-API fallback passed.");
} finally {
  browser(["close"]);
}
