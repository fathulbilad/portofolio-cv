import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3107");
assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Use a local preview.");
const session = `music-scroll-${process.pid}`;
const browser = (args, input) => execFileSync("agent-browser", ["--session", session, ...args], { input, encoding: "utf8", timeout: 45000 }).trim();

try {
  browser(["open", new URL("/lab#music", origin).href]);
  browser(["set", "viewport", "1440", "900"]);
  browser(["wait", "--fn", `!!document.querySelector('[aria-label="Choose a record"]') && !document.querySelector('[data-phase]') && document.fonts.status === 'loaded'`]);

  const measure = () => {
    const wheel = document.querySelector('[aria-label="Choose a record"]');
    const record = wheel.querySelector('[role="option"]');
    const originalFrame = window.requestAnimationFrame;
    const originalCancel = window.cancelAnimationFrame;
    const originalNow = Object.getOwnPropertyDescriptor(performance, "now");
    let now = performance.now();
    let id = 0;
    const pending = new Map();

    // Control frame delivery and input timing, while exercising the rendered
    // wheel's real event handlers and measuring its visible position.
    window.requestAnimationFrame = callback => { pending.set(++id, callback); return id; };
    window.cancelAnimationFrame = frameId => pending.delete(frameId);
    Object.defineProperty(performance, "now", { configurable: true, value: () => now });
    const frame = time => {
      now = time;
      const callbacks = [...pending.values()];
      pending.clear();
      callbacks.forEach(callback => callback(now));
    };
    const settle = () => {
      const start = now;
      for (let step = 1; step <= 180; step++) frame(start + step * 1000 / 60);
    };
    const reset = () => {
      wheel.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }));
      settle();
    };
    const scroll = deltaY => wheel.dispatchEvent(new WheelEvent("wheel", { deltaY, bubbles: true, cancelable: true }));
    const top = () => record.getBoundingClientRect().top;

    try {
      reset();
      const initial = top();
      const start = now;
      scroll(120);
      const samples = [];
      for (let step = 1; step <= 180; step++) {
        frame(start + step * 1000 / 60);
        samples.push({ elapsed: now - start, top: top() });
      }
      const destination = top();
      const distance = Math.abs(destination - initial);
      const response = samples.find(sample => Math.abs(destination - sample.top) <= distance * 0.1)?.elapsed;

      reset();
      const coarseStart = top();
      const coarseTime = now;
      scroll(30);
      frame(coarseTime + 1000 / 60);
      const coarseMovement = Math.abs(top() - coarseStart);

      reset();
      const denseStart = top();
      const denseTime = now;
      for (let event = 1; event <= 30; event++) {
        now = denseTime + event * 0.5;
        scroll(1);
      }
      frame(denseTime + 1000 / 60);
      const denseMovement = Math.abs(top() - denseStart);
      reset();
      return { distance, responseMs: response, coarseMovement, denseMovement };
    } finally {
      window.requestAnimationFrame = originalFrame;
      window.cancelAnimationFrame = originalCancel;
      if (originalNow) Object.defineProperty(performance, "now", originalNow);
      else delete performance.now;
    }
  };

  const result = JSON.parse(browser(["eval", "--stdin"], `(${measure.toString()})()`));
  console.log(JSON.stringify(result));
  assert.ok(result.distance > 20, "A wheel gesture must visibly move the albums.");
  assert.ok(result.responseMs <= 200, `Album scrolling takes ${result.responseMs.toFixed(0)} ms to cover 90% of a step; expected at most 200 ms.`);
  assert.ok(result.coarseMovement > 0, "Scrolling starts on the next frame.");
  assert.ok(result.denseMovement >= result.coarseMovement * 0.85, "Frequent trackpad events must not delay the next animation frame.");
  console.log("Album scroll response and high-frequency trackpad input passed.");
} finally {
  browser(["close"]);
}
