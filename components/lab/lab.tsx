"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { games, isLabSection, labSections, lifeEntries, oddNotes, type LabSection } from "@/lib/lab";
import pebble from "./vendor/pebble";
import notch from "./vendor/notch";
import { playSound, setSoundMuted, setSoundVolume } from "./vendor/react-bits-sound";
import styles from "./lab.module.css";
import { LabInk } from "./lab-ink";
import { GamesGallery } from "./games-gallery";
import { MusicRoom } from "./music-room";
import { ProjectsRoom } from "./projects-room";
import { LabRouteLink } from "@/components/portfolio/lab-route-transition";
import { LabMenuLabel, createMenuHighlight, type MenuHighlight } from "./lab-menu-label";

const navigationEvent = "lab:navigate";
const largeScreenQuery = "(min-width: 768px) and (min-height: 501px), (min-width: 768px) and (pointer: fine)";

function subscribeNavigation(notify: () => void) {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  window.addEventListener(navigationEvent, notify);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
    window.removeEventListener(navigationEvent, notify);
  };
}
function readSection(): LabSection | null {
  const hash = window.location.hash.slice(1);
  return isLabSection(hash) ? hash : null;
}
function subscribeMedia(query: string, notify: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const subscribeLarge = (notify: () => void) => subscribeMedia(largeScreenQuery, notify);
const subscribeReduced = (notify: () => void) => subscribeMedia("(prefers-reduced-motion: reduce)", notify);
const noSection = () => null;
const serverFalse = () => false;
const serverTrue = () => true;
const readLarge = () => window.matchMedia(largeScreenQuery).matches;
const readReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Picks({ labels, selected, onSelect, label }: { labels: readonly string[]; selected: number; onSelect: (index: number) => void; label: string }) {
  return <div className={styles.picks} role="group" aria-label={label}>
    {labels.map((name, index) => <button type="button" key={name} className={styles.pick} aria-pressed={selected === index} onClick={() => onSelect(index)}><span>{name}</span></button>)}
  </div>;
}

export function Lab() {
  const section = useSyncExternalStore(subscribeNavigation, readSection, noSection);
  const large = useSyncExternalStore(subscribeLarge, readLarge, serverFalse);
  const reduced = useSyncExternalStore(subscribeReduced, readReduced, serverTrue);
  const [mood, setMood] = useState<LabSection>("odds");
  const [highlights, setHighlights] = useState<Partial<Record<LabSection, MenuHighlight>>>({});
  const highlightVersion = useRef(0);
  const [sound, setSound] = useState(false);
  const [soundMessage, setSoundMessage] = useState("");
  const [wipe, setWipe] = useState<"cover" | "reveal" | null>(null);
  const [game, setGame] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [note, setNote] = useState(0);
  const soundEnabled = useRef(false);
  const musicIsOpen = useRef(false);
  const transitioning = useRef(false);
  const lastSound = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const menu = useRef<HTMLElement>(null);
  const opener = useRef<LabSection | null>(null);
  const theme = labSections.find(item => item.id === (section ?? mood)) ?? labSections[4];

  useEffect(() => {
    const scheduled = timers.current;
    setSoundMuted(true);
    const onVisibility = () => setSoundMuted(document.hidden || musicIsOpen.current || !soundEnabled.current);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      setSoundMuted(true);
      scheduled.forEach(clearTimeout);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const play = useCallback((kind: "hover" | "select" = "select") => {
    if (!soundEnabled.current || musicIsOpen.current || document.hidden) return;
    const now = performance.now();
    if (kind === "hover" && now - lastSound.current < 90) return;
    lastSound.current = now;
    void playSound(kind === "hover" ? notch : pebble, { volume: -8 }).catch(() => {
      soundEnabled.current = false;
      setSoundMuted(true);
      setSound(false);
      setSoundMessage("Sound is unavailable in this browser.");
    });
  }, []);

  const go = useCallback((next: LabSection | null) => {
    if (transitioning.current) return;
    play();
    const change = () => {
      window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${next ? `#${next}` : ""}`);
      window.dispatchEvent(new Event(navigationEvent));
    };
    if (reduced) { change(); return; }
    transitioning.current = true;
    setWipe("cover");
    timers.current.push(setTimeout(() => {
      change();
      setWipe("reveal");
      timers.current.push(setTimeout(() => {
        setWipe(null);
        transitioning.current = false;
      }, 450));
    }, 230));
  }, [play, reduced]);

  useEffect(() => {
    if (section) {
      opener.current = section;
      heading.current?.focus({ preventScroll: true });
    } else if (opener.current) {
      menu.current?.querySelector<HTMLAnchorElement>(`a[href="#${opener.current}"]`)?.focus({ preventScroll: true });
    }
    const onKey = (event: KeyboardEvent) => {
      if (!event.defaultPrevented && event.key === "Escape" && section) go(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [section, go, large]);

  const onAlbumOpenChange = useCallback((open: boolean) => {
    musicIsOpen.current = open;
    setSoundMuted(document.hidden || open || !soundEnabled.current);
  }, []);

  function choose<T>(setter: (value: T) => void, value: T) { play(); setter(value); }
  function preview(id: LabSection, refreshHighlight = false) {
    if (mood !== id) { setMood(id); play("hover"); }
    if (refreshHighlight) {
      const next = createMenuHighlight(++highlightVersion.current);
      setHighlights(previous => ({ ...previous, [id]: next }));
    }
  }
  function open(event: MouseEvent<HTMLAnchorElement>, id: LabSection) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener.current = id;
    go(id);
  }
  function toggleSound() {
    const next = !soundEnabled.current;
    soundEnabled.current = next;
    setSound(next);
    setSoundMessage("");
    setSoundMuted(!next || musicIsOpen.current || document.hidden);
    setSoundVolume(0.4);
    if (next) play();
  }

  const gamePalette = section === "games" ? games[game].palette : null;
  const currentNote = oddNotes[note];

  return <div className={styles.root} style={{ "--lab-paper": gamePalette?.paper ?? theme.color, "--lab-accent": gamePalette?.accent ?? theme.accent, "--lab-text": gamePalette?.text ?? theme.text, "--game-surface": gamePalette?.surface, "--game-muted": gamePalette?.muted } as CSSProperties} data-lab-mood={theme.id}>
    <div className={styles.phone}>
      <p className={styles.phoneEyebrow}>off duty.</p>
      <h1>A little more room.</h1>
      <p>This corner is made for desktop and tablet.<br />The phone-sized version is a story for another day.</p>
      <Link href="/">← Back to my CV</Link>
    </div>
    <div className={`${styles.desktop} ${section ? styles.inRoom : ""} ${section === "games" ? styles.gamesScene : ""} ${section === "projects" ? styles.projectsScene : ""}`}>
      <LabInk section={section} mood={mood} animated={large && !reduced} musicPlaying={section === "music" && musicPlaying} />
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.utilities}>
        {section ? <button type="button" onClick={() => go(null)}>← <span>Menu</span></button> : <LabRouteLink href="/">← <span>CV</span></LabRouteLink>}
        <button type="button" className={styles.sound} onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Turn interface sounds off" : "Turn interface sounds on"}><span>Sound {sound ? "on" : "off"}</span>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
      </header>
      <p className={styles.srOnly} role="status">{soundMessage}</p>

      {!section ? <main className={styles.entrance} id="lab-content">
        <h1 className={styles.offDuty}>off duty.<span>a little corner<br />of my own.</span></h1>
        <nav className={styles.menu} ref={menu} aria-label="Explore the Lab" onKeyDown={event => {
          const links = Array.from(menu.current?.querySelectorAll("a") ?? []);
          const index = links.indexOf(document.activeElement as HTMLAnchorElement);
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
            links[next]?.focus();
          }
        }}>
          {labSections.map((item, index) => <a key={item.id} href={`#${item.id}`} className={styles.menuLink} data-active={mood === item.id} style={{ "--menu-index": index } as CSSProperties} aria-label={item.title} onPointerEnter={() => preview(item.id, true)} onPointerMove={() => preview(item.id)} onFocus={event => preview(item.id, !highlights[item.id] || !event.currentTarget.matches(":hover"))} onClick={event => open(event, item.id)}>
            <LabMenuLabel text={item.title} active={mood === item.id} color={item.color} ink={item.text} highlight={large ? highlights[item.id] : undefined} />
          </a>)}
        </nav>
      </main> : <main key={section} className={`${styles.room} ${section === "life" ? styles.lifeRoom : ""} ${section === "games" ? styles.gamesRoom : ""} ${section === "music" ? styles.musicRoom : ""} ${section === "projects" ? styles.projectsRoom : ""}`} id="lab-content" aria-labelledby="lab-heading">
        {section === "games" ? <GamesGallery selected={game} onSelect={index => choose(setGame, index)} reduced={reduced} headingRef={heading} /> : section === "music" ? (large && <MusicRoom reduced={reduced} headingRef={heading} onSelectSound={play} onAlbumOpenChange={onAlbumOpenChange} onPlaybackChange={setMusicPlaying} />) : section === "projects" ? (large && <ProjectsRoom headingRef={heading} onSelectSound={play} onExplore={() => go("odds")} />) : <>
        <div className={styles.roomIntro}>
          <h1 id="lab-heading" ref={heading} tabIndex={-1}>{theme.title}</h1>
          <p className={styles.subtitle}>{theme.subtitle}</p>
          {section === "life" && <div className={styles.lifePhoto}><Image src="/lab/life.webp" alt="Afternoon light falling across a quiet wall." width={900} height={600} loading="eager" sizes="(max-width: 1100px) 32vw, 380px" /></div>}
          {section === "odds" && <Picks label="Choose a note" labels={oddNotes.map(item => item.label)} selected={note} onSelect={index => choose(setNote, index)} />}
          <span className={styles.sample}>Starter collection · a work in progress</span>
        </div>

        <div className={styles.roomBody}>
          {section === "life" && <div className={styles.journal}>{lifeEntries.map(entry => <article key={entry.label}><h2>{entry.label}</h2><h3>{entry.title}</h3><p>{entry.body}</p></article>)}</div>}
          {section === "odds" && <article className={styles.paperNote} key={currentNote.label} aria-live="polite"><p className={styles.noteLabel}>{currentNote.label}</p><h2>{currentNote.title}</h2><p>{currentNote.body}</p><span className={styles.noteSignoff}>a little something, saved.</span></article>}
        </div>
        </>}
      </main>}
      {wipe && <div className={styles.wipe} data-phase={wipe} aria-hidden="true"><span>off duty.</span></div>}
    </div>
  </div>;
}
