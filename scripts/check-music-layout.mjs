import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3105");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `record-room-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();
const evaluate = fn => JSON.parse(browser(["eval", "--stdin"], `(${fn.toString()})()`));
const wait = expression => browser(["wait", "--fn", expression]);
const wheel = '[aria-label="Choose a record"]';

function layout() {
  return evaluate(async () => {
    await document.fonts.ready;
    // Measure after the real entrance and selection animations settle.
    await new Promise(resolve => {
      let previous = "", stable = 0;
      const sample = () => {
        const article = document.querySelector("article[data-player-open]");
        const box = article.getBoundingClientRect();
        const next = [box.x, box.y, box.width, box.height, getComputedStyle(article.parentElement).opacity, document.getElementById("lab-ink-path").getAttribute("d")].join();
        stable = next === previous ? stable + 1 : 0;
        previous = next;
        if (stable > 10) resolve(); else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const room = document.getElementById("lab-content");
    const heading = document.getElementById("lab-heading").getBoundingClientRect();
    const menu = document.querySelector("header button:first-child").getBoundingClientRect();
    const album = room.querySelector("article[data-player-open]").getBoundingClientRect();
    const selector = room.querySelector('[role="listbox"]').getBoundingClientRect();
    const cover = room.querySelector('button[aria-controls="music-album-player"]').getBoundingClientRect();
    const path = document.getElementById("lab-ink-path");
    const inverse = path.getScreenCTM().inverse();
    const captionsOnInk = [...room.querySelectorAll("article h2, article p, article a, article button[aria-label='Close record']")].filter(el => el.getClientRects().length).every(el => {
      const range = document.createRange(); range.selectNodeContents(el);
      return [...range.getClientRects()].every(box => [0.1, 0.5, 0.9].every(fraction => path.isPointInFill(new DOMPoint(box.x + box.width * fraction, box.y + box.height / 2).matrixTransform(inverse))));
    });
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      headingBelowMenu: heading.top > menu.bottom && Math.abs(heading.left - menu.left) < 16,
      wheelBesideCover: selector.right + 8 < cover.left,
      albumFits: album.left >= 0 && album.right <= innerWidth && album.bottom <= innerHeight - 8,
      captionsOnInk,
    };
  });
}

try {
  browser(["--headed", "false", "open", new URL("/lab#music", origin).href]);
  browser(["tab", "t1"]);
  browser(["set", "viewport", "1440", "900"]);
  browser(["network", "route", "https://open.spotify.com/embed/iframe-api/v1", "--abort"]);
  wait(`!!document.querySelector('${wheel}')`);
  assert.equal(evaluate(() => document.querySelectorAll('[role="option"]').length), 9);
  assert.equal(evaluate(() => document.querySelector("article h2").textContent), "Getting Killed");
  assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0, "The initial cover never mounts or autoplays a player.");
  evaluate(() => {
    Object.defineProperty(window, "onSpotifyIframeApiReady", { configurable: true, set(callback) {
      queueMicrotask(() => callback({ createController(target, options, ready) {
        const frame = document.createElement("iframe"); frame.src = "about:blank"; target.replaceWith(frame);
        ready({ addListener() {}, destroy() { frame.remove(); } });
      } }));
    } });
  });

  for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [1024, 600], [1440, 520]]) {
    browser(["set", "viewport", String(width), String(height)]);
    browser(["focus", wheel]); browser(["press", "End"]);
    wait(`document.querySelector('article h2').textContent === 'I Love My Computer'`);
    assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0, "Browsing closes the previous player.");
    assert.equal(evaluate(() => document.querySelector('[data-ink-motion]').dataset.inkMotion), "resting");
    browser(["click", 'button[aria-controls="music-album-player"]']);
    wait("!!document.querySelector('iframe')");
    assert.deepEqual(layout(), { overflow: false, headingBelowMenu: true, wheelBesideCover: true, albumFits: true, captionsOnInk: true }, `${width} × ${height}`);
    browser(["click", 'button[aria-label="Close record"]']);
    assert.equal(evaluate(() => document.activeElement.getAttribute("role")), "listbox", "Closing restores album-wheel focus.");
    assert.equal(evaluate(() => document.querySelectorAll("iframe").length), 0);
    browser(["press", "Home"]);
    console.log(`Record room ${width} × ${height}: heading, spacing, player bounds, and caption contrast passed.`);
  }
  browser(["set", "viewport", "390", "844"]);
  wait(`!document.querySelector('${wheel}')`);
  assert.equal(evaluate(() => document.querySelectorAll("iframe, #music-album-player").length), 0, "Music and Spotify stay unmounted on phones.");
  assert.equal(browser(["errors"]), "");
  console.log("Nine-album preview, player opening/cleanup, focus, desktop/tablet layout, and phone gating passed.");
} finally {
  browser(["close"]);
}
