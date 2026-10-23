"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, type Ref } from "react";
import { games } from "@/lib/lab";
import FadeContent from "./vendor/FadeContent";
import styles from "./games-gallery.module.css";

export function GamesGallery({ selected, onSelect, reduced, headingRef }: { selected: number; onSelect: (index: number) => void; reduced: boolean; headingRef: Ref<HTMLHeadingElement> }) {
  const rail = useRef<HTMLDivElement>(null);
  const game = games[selected];

  function choose(index: number, focus = false) {
    onSelect(index);
    const card = rail.current?.querySelectorAll<HTMLButtonElement>("button")[index];
    if (focus) card?.focus({ preventScroll: true });
    if (card && rail.current) {
      const bounds = card.getBoundingClientRect();
      const viewport = rail.current.getBoundingClientRect();
      if (bounds.left < viewport.left || bounds.right > viewport.right) {
        card.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }

  return <>
    <section className={styles.spotlight} aria-label="Featured game">
      <div className={styles.heading}>
        <h1 id="lab-heading" ref={headingRef} tabIndex={-1}>Games<span>The ones that stayed with me.</span></h1>
        <span className={styles.count}>{String(selected + 1).padStart(2, "0")} / {String(games.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.hero}>
        {games.map((item, index) => <div key={item.title} className={styles.artwork} data-active={index === selected} aria-hidden={index !== selected}>
          <Image src={item.image} alt={item.imageAlt} fill loading="eager" sizes="(min-width: 1600px) 1400px, 92vw" />
        </div>)}
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.caption} aria-live="polite" aria-atomic="true"><FadeContent key={game.title} trigger="mount" effect="fade" duration={0.35} ease="power2.out">
          <p className={styles.genre}>{game.genre}</p>
          <h2>{game.title}</h2>
          <p className={styles.tag}>{game.tag}</p>
          <p className={styles.note}>{game.story}</p>
        </FadeContent></div>
        <a className={styles.credit} href={game.source} target="_blank" rel="noopener noreferrer">Artwork: {game.credit} ↗</a>
      </div>
    </section>
    <section className={styles.shelf} aria-label="Game collection">
      <div className={styles.shelfInner}>
        <div className={styles.shelfHeader}>
          <div><h2>On my shelf</h2><p>Scroll or swipe to explore · pick a game</p></div>
          <div className={styles.controls}>
            <button type="button" aria-label="Previous game" onClick={() => choose((selected - 1 + games.length) % games.length)}><ArrowLeft size={20} /></button>
            <button type="button" aria-label="Next game" onClick={() => choose((selected + 1) % games.length)}><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className={styles.rail} ref={rail} role="group" aria-label="Choose a game" onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const cards = Array.from(rail.current?.querySelectorAll("button") ?? []);
          const current = cards.indexOf(document.activeElement as HTMLButtonElement);
          const next = event.key === "Home" ? 0 : event.key === "End" ? games.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + games.length) % games.length;
          choose(next, true);
        }}>
          {games.map((item, index) => <button type="button" key={item.title} className={styles.card} aria-label={item.title} aria-pressed={selected === index} onClick={() => choose(index)}>
            <span className={styles.thumbnail}><Image src={item.image} alt="" fill loading="eager" sizes="(min-width: 1600px) 560px, 36vw" /></span>
            <span className={styles.cardLabel}><span>{item.title}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></span>
          </button>)}
        </div>
        <p className={styles.footnote}>A collection in progress. A few words for each world.</p>
      </div>
    </section>
  </>;
}
