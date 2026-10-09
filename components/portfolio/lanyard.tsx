"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useState, useSyncExternalStore, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { IdCard, MousePointer2, Pause, Play, RotateCcw, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

function BadgeStill() {
  return <div className="badge-still"><span>Full Stack Software Engineer</span><Image src="/illustrations/Bento7.png" alt="" width={100} height={115} unoptimized /><strong>Fathul Bilad</strong><small>PT Mitra Integrasi Informatika</small></div>;
}

const LanyardScene = dynamic(() => import("./lanyard-scene"), { ssr: false, loading: () => <BadgeStill /> });

class BadgeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <BadgeStill /> : this.props.children; }
}

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function LanyardView({ compact = false }: { compact?: boolean }) {
  const { lang } = useLanguage();
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const hidden = useSyncExternalStore(subscribeToVisibility, () => document.hidden, () => false);
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [reset, setReset] = useState(0);
  const paused = playing === null ? reducedMotion : !playing;
  return <div className={`lanyard-view ${compact ? "is-compact" : ""}`}>
    <div className="lanyard-stage" role="img" aria-label={lang === "en" ? "Interactive Fathul Bilad ID badge on a lanyard" : "ID badge Fathul Bilad interaktif dengan lanyard"}>
      <BadgeBoundary key={reset}><LanyardScene paused={paused || hidden} /></BadgeBoundary>
    </div>
    <div className="lanyard-controls"><p><MousePointer2 size={15} />{lang === "en" ? "Drag the badge and let go." : "Tarik badge, lalu lepaskan."}</p><div>
      <button className="icon-button" type="button" onClick={() => setPlaying(paused)} aria-label={lang === "en" ? paused ? "Play badge animation" : "Pause badge animation" : paused ? "Jalankan animasi badge" : "Jeda animasi badge"}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
      <button className="icon-button" type="button" onClick={() => setReset((value) => value + 1)} aria-label={lang === "en" ? "Reset badge" : "Atur ulang badge"}><RotateCcw size={16} /></button>
    </div></div>
  </div>;
}

export function LanyardDialog() {
  const { lang } = useLanguage();
  return <Dialog.Root><Dialog.Trigger className="button badge-trigger"><IdCard size={18} />{lang === "en" ? "My ID badge" : "ID badge saya"}</Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className="certificate-overlay" /><Dialog.Content className="lanyard-dialog" aria-describedby={undefined}>
      <header className="lanyard-dialog-header"><Dialog.Title><IdCard size={20} />{lang === "en" ? "A little something to play with." : "Sedikit interaksi dengan badge saya."}</Dialog.Title><Dialog.Close className="icon-button" aria-label={lang === "en" ? "Close" : "Tutup"}><X size={21} /></Dialog.Close></header>
      <LanyardView />
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}
