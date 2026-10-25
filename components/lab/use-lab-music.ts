"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export const labMusicTiming = { beat: 0.5, phrase: 8, duration: 120 } as const;
const musicVolume = 0.3;
const sources = ["/lab/audio/off-duty-fm.ogg", "/lab/audio/off-duty-fm.mp3"];

type Playback = {
  context: AudioContext;
  gain: GainNode;
  buffer: AudioBuffer | null;
  pending: Promise<AudioBuffer> | null;
  abort: AbortController;
  source: AudioBufferSourceNode | null;
  offset: number;
  startedAt: number;
};

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}
const readVisible = () => !document.hidden;
const serverVisible = () => true;

async function decodeTrack(playback: Playback) {
  for (const url of sources) {
    try {
      const response = await fetch(url, { signal: playback.abort.signal });
      if (!response.ok) throw new Error("Track unavailable");
      const buffer = await playback.context.decodeAudioData(await response.arrayBuffer());
      if (Math.abs(buffer.duration - labMusicTiming.duration) > 0.1) throw new Error("Incomplete track");
      return buffer;
    } catch (error) {
      if (playback.abort.signal.aborted) throw error;
    }
  }
  throw new Error("Track unavailable");
}

/** Owns the Lab-only loop and exposes its audible position to the visuals. */
export function useLabMusic({ available, blocked }: { available: boolean; blocked: boolean }) {
  const visible = useSyncExternalStore(subscribeVisibility, readVisible, serverVisible);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const requested = useRef(false);
  const allowed = useRef(false);
  const mounted = useRef(false);
  const playback = useRef<Playback | null>(null);

  const readPosition = useCallback((): number | null => {
    const current = playback.current;
    if (!current?.source || !current.buffer) return null;
    // Output time accounts for the device's audio latency rather than using
    // a separate visual timer that would drift after pauses or loop restarts.
    const outputTime = current.context.getOutputTimestamp?.().contextTime;
    const clock = typeof outputTime === "number" && outputTime > 0 ? outputTime : current.context.currentTime;
    return (current.offset + Math.max(0, clock - current.startedAt)) % current.buffer.duration;
  }, []);

  const pause = useCallback(() => {
    const current = playback.current;
    if (current?.source) {
      current.offset = readPosition() ?? current.offset;
      const now = current.context.currentTime;
      current.gain.gain.cancelScheduledValues(now);
      current.gain.gain.setValueAtTime(current.gain.gain.value, now);
      current.gain.gain.linearRampToValueAtTime(0, now + 0.02);
      const source = current.source;
      current.source = null;
      source.onended = () => source.disconnect();
      source.stop(now + 0.02);
    }
    if (mounted.current) setPlaying(false);
  }, [readPosition]);

  const resume = useCallback(async () => {
    if (!requested.current || !mounted.current) return;
    let current = playback.current;
    try {
      if (!current) {
        const Context = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Context) throw new Error("Audio unavailable");
        const context = new Context({ latencyHint: "interactive" });
        const gain = context.createGain();
        gain.gain.value = 0;
        gain.connect(context.destination);
        current = { context, gain, buffer: null, pending: null, abort: new AbortController(), source: null, offset: 0, startedAt: 0 };
        playback.current = current;
      }
      // Called directly by the opt-in click, including when a record is open,
      // so browsers can unlock audio before any fetch or decoding awaits.
      const unlocked = current.context.resume();
      if (!allowed.current) { await unlocked; return; }
      if (current.source) { await unlocked; return; }
      if (!current.buffer) {
        setLoading(true);
        current.pending ??= decodeTrack(current);
        const [buffer] = await Promise.all([current.pending, unlocked]);
        current.buffer = buffer;
        current.pending = null;
      } else {
        await unlocked;
      }
      if (playback.current !== current || !requested.current || !allowed.current || !mounted.current || current.source) return;
      const source = current.context.createBufferSource();
      source.buffer = current.buffer;
      source.loop = true;
      source.loopStart = 0;
      source.loopEnd = current.buffer.duration;
      source.connect(current.gain);
      current.source = source;
      current.startedAt = current.context.currentTime;
      current.gain.gain.cancelScheduledValues(current.startedAt);
      current.gain.gain.setValueAtTime(0, current.startedAt);
      current.gain.gain.linearRampToValueAtTime(musicVolume, current.startedAt + 0.04);
      source.start(current.startedAt, current.offset);
      setPlaying(true);
    } catch {
      if (mounted.current && playback.current === current && requested.current) {
        if (current) current.pending = null;
        requested.current = false;
        setEnabled(false);
        pause();
        setMessage("Music is unavailable right now. Try turning it on again.");
      }
    } finally {
      if (mounted.current && playback.current === current) setLoading(false);
    }
  }, [pause]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      const current = playback.current;
      pause();
      playback.current = null;
      current?.abort.abort();
      if (current && current.context.state !== "closed") void current.context.close().catch(() => undefined);
    };
  }, [pause]);

  useEffect(() => {
    allowed.current = available && visible && !blocked;
    if (allowed.current) void resume();
    else pause();
  }, [available, visible, blocked, pause, resume]);

  const toggle = useCallback(() => {
    requested.current = !requested.current;
    setEnabled(requested.current);
    setMessage("");
    if (requested.current) void resume();
    else { setLoading(false); pause(); }
  }, [pause, resume]);

  return { enabled, playing, loading, message, toggle, readPosition };
}
