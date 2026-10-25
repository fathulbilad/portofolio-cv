import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `lab-score-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);
const state = () => evaluate(() => document.querySelector("[data-lab-music]")?.dataset.labMusic ?? null);
const clickMusic = name => browser(["find", "role", "button", "click", "--name", name, "--exact"]);
const foreground = () => { browser(["tab", "t1"]); wait("!document.hidden"); };
const songSources = () => evaluate(() => window.__scoreProbe.sources.filter(item => item.node.buffer?.duration === 120).map(item => ({ duration: item.node.buffer.duration, loop: item.node.loop, loopEnd: item.node.loopEnd, starts: item.starts, stopped: item.stopped })));

function installProbe() {
  evaluate(() => {
    const probe = window.__scoreProbe = { contexts: [], sources: [], requests: [] };
    const originalFetch = window.fetch.bind(window);
    window.fetch = (...args) => {
      if (String(args[0]).includes("/lab/audio/")) probe.requests.push(String(args[0]));
      return originalFetch(...args);
    };
    const Original = window.AudioContext;
    window.AudioContext = class extends Original {
      constructor(...args) { super(...args); probe.contexts.push(this); }
      createBufferSource() {
        const node = super.createBufferSource();
        const item = { node, starts: [], stopped: false };
        probe.sources.push(item);
        const start = node.start.bind(node), stop = node.stop.bind(node);
        node.start = (...args) => { item.starts.push(args); return start(...args); };
        node.stop = (...args) => { item.stopped = true; return stop(...args); };
        return node;
      }
    };
  });
}

try {
  browser(["--headed", "false", "open", new URL("/lab", origin).href]);
  browser(["set", "viewport", "1440", "900"]);
  browser(["tab", "t1"]);
  wait("!!document.querySelector('[data-lab-music]') && !document.querySelector('[data-phase]')");
  installProbe();
  console.log("Checking opt-in, loading cancellation, and independent controls...");
  assert.equal(state(), "off");
  assert.deepEqual(evaluate(() => [window.__scoreProbe.contexts.length, window.__scoreProbe.requests.length]), [0, 0], "No audio initialization or request before opt-in.");
  assert.equal(evaluate(() => {
    const sound = document.querySelector('[aria-label="Turn interface sounds on"]').getBoundingClientRect();
    const music = document.querySelector('[data-lab-music]').getBoundingClientRect();
    return music.left > sound.right && Math.abs(music.top - sound.top) < 1;
  }), true, "Sound sits on the left and Music on the right, on the same row.");

  // Changing the user's intent before decoding finishes must not start audio.
  evaluate(() => { const button = document.querySelector('[data-lab-music]'); button.click(); button.click(); });
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'off' && document.querySelector('[data-lab-music]').getAttribute('aria-busy') === 'false'");
  assert.equal(songSources().filter(item => !item.stopped).length, 0, "Turning off during loading cancels the intent to play.");
  clickMusic("Music off");
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  const first = songSources().at(-1);
  assert.equal(first.duration, 120);
  assert.equal(first.loop, true);
  assert.equal(first.loopEnd, 120);
  assert.equal(evaluate(() => document.querySelector('[aria-label="Turn interface sounds on"]').getAttribute('aria-pressed')), "false", "Music does not enable interface sounds.");
  assert.equal(evaluate(() => window.__scoreProbe.requests.length), 1, "Decoded score is cached for subsequent toggles.");

  browser(["find", "role", "button", "click", "--name", "Turn interface sounds on", "--exact"]);
  browser(["find", "role", "button", "click", "--name", "Turn interface sounds off", "--exact"]);
  assert.equal(state(), "playing", "Sound control is independent of Music.");
  browser(["click", 'a[href="#projects"]']);
  wait("location.hash === '#projects' && !document.querySelector('[data-phase]')");
  assert.equal(songSources().at(-1).starts.length, 1, "Room navigation keeps the same buffer source.");
  assert.equal(evaluate(() => document.querySelector('[data-ink-motion]').dataset.inkMotion), "soundtrack");
  evaluate(() => {
    window.__scoreFrames = new Set();
    const path = document.getElementById('lab-ink-path');
    window.__scoreObserver = new MutationObserver(() => window.__scoreFrames.add(path.getAttribute('d')));
    window.__scoreObserver.observe(path, { attributes: true, attributeFilter: ['d'] });
  });
  wait("window.__scoreFrames.size > 8");
  browser(["press", "Escape"]);
  wait("!location.hash && !document.querySelector('[data-phase]')");
  console.log("Checking room continuity and audio-clock motion...");
  browser(["click", 'a[href="#music"]']);
  wait("location.hash === '#music' && !!document.querySelector('[aria-label=\"Choose a record\"]') && !document.querySelector('[data-phase]')");
  foreground();
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  assert.equal(evaluate(() => document.querySelector('[data-ink-motion]').dataset.inkMotion), "soundtrack");
  browser(["network", "route", "https://open.spotify.com/embed/iframe-api/v1", "--abort"]);
  browser(["focus", '[aria-label="Choose a record"]']);
  browser(["press", "Enter"]);
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'paused'");
  assert.equal(songSources().at(-1).stopped, true, "Opening a record stops the background source.");
  browser(["find", "role", "button", "click", "--name", "Close record", "--exact"]);
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  assert.ok(songSources().at(-1).starts[0][1] > 0, "Closing the player resumes its saved playhead.");
  console.log("Checking Spotify handoff, tab visibility, and reduced motion...");

  evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'paused'");
  evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");

  browser(["set", "media", "light", "reduced-motion"]);
  wait("document.querySelector('[data-ink-motion]').dataset.inkMotion === 'resting'");
  assert.equal(state(), "playing", "Reduced motion leaves audio under user control.");
  assert.equal(evaluate(() => document.querySelector('[data-lab-music] svg').classList.contains('lucide-music-2')), true, "Reduced motion uses a static music icon.");
  browser(["set", "media", "light", "no-preference"]);

  browser(["set", "viewport", "768", "1024"]);
  assert.equal(evaluate(() => {
    const box = document.querySelector('[data-lab-music]').getBoundingClientRect();
    return box.left >= 0 && box.right <= innerWidth && box.bottom <= innerHeight && document.documentElement.scrollWidth <= innerWidth + 1;
  }), true, "Tablet controls fit without horizontal overflow.");
  browser(["set", "viewport", "390", "844"]);
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'paused'");
  browser(["set", "viewport", "1440", "900"]);
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  clickMusic("Music on");
  assert.equal(state(), "off");
  evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  assert.equal(state(), "off", "Music off prevents automatic resumption.");
  clickMusic("Music off");
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  browser(["press", "Escape"]);
  wait("!location.hash && !document.querySelector('[data-phase]')");
  browser(["click", 'header a[href="/"]']);
  wait("location.pathname === '/' && !document.querySelector('.lab-route-transition')");
  wait("window.__scoreProbe.contexts[0].state === 'closed'");
  assert.equal(songSources().every(item => item.stopped), true, "Leaving /lab stops every background source.");
  browser(["open", new URL("/lab", origin).href]);
  foreground();
  wait("!!document.querySelector('[data-lab-music]') && !document.querySelector('[data-phase]')");
  installProbe();
  console.log("Checking MP3 fallback...");
  evaluate(() => {
    // Fail the public fetch boundary rather than relying on browser cache or
    // network interception behavior to simulate an unavailable Opus asset.
    const savedFetch = window.fetch;
    window.fetch = (...args) => {
      if (String(args[0]).endsWith('/off-duty-fm.ogg')) {
        window.__scoreProbe.requests.push(String(args[0]));
        return Promise.resolve(new Response(null, { status: 503 }));
      }
      return savedFetch(...args);
    };
  });
  clickMusic("Music off");
  wait("document.querySelector('[data-lab-music]').dataset.labMusic === 'playing'");
  assert.deepEqual(evaluate(() => window.__scoreProbe.requests), ['/lab/audio/off-duty-fm.ogg', '/lab/audio/off-duty-fm.mp3'], "An unavailable Opus file falls back to the original MP3.");
  assert.equal(songSources().at(-1).duration, 120);
  clickMusic("Music on");
  console.log("Lab background music passed: original 120-second loop; no autoplay or eager fetch; independent side-by-side controls; loading cancellation; cached decoding; room continuity; audio-clock ink motion; Spotify handoff; visibility; reduced motion; tablet/phone behavior; route cleanup; MP3 fallback.");
} catch (error) {
  try {
    console.error(evaluate(() => ({ url: location.href, hidden: document.hidden, width: innerWidth, state: document.querySelector('[data-lab-music]')?.outerHTML, status: [...document.querySelectorAll('[role="status"]')].map(node => node.textContent), contexts: window.__scoreProbe?.contexts.map(context => context.state) })));
    browser(["screenshot", "/private/tmp/lab-background-music-failure.png"]);
    console.error(browser(["errors"]));
  } catch {}
  throw error;
} finally {
  try { browser(["close"]); } catch {}
}
