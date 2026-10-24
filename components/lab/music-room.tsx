"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type Ref } from "react";
import { musicRecords } from "@/lib/lab";
import AnimatedContent from "./vendor/AnimatedContent";
import OptionWheel from "./vendor/OptionWheel";
import { SpotifyPlayer } from "./spotify-player";
import styles from "./music-room.module.css";

const recordTitles = musicRecords.map(record => record.title);

export function MusicRoom({ reduced, headingRef, onSelectSound, onAlbumOpenChange, onPlaybackChange }: {
  reduced: boolean;
  headingRef: Ref<HTMLHeadingElement>;
  onSelectSound: () => void;
  onAlbumOpenChange: (open: boolean) => void;
  onPlaybackChange: (playing: boolean) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const wheel = useRef<HTMLDivElement>(null);
  const album = musicRecords[selected];

  useEffect(() => () => onAlbumOpenChange(false), [onAlbumOpenChange]);

  function openAlbum(index: number) {
    if (opened && selected === index) return;
    onSelectSound();
    onPlaybackChange(false);
    setCoverFailed(false);
    setSelected(index);
    setOpened(true);
    onAlbumOpenChange(true);
  }

  function browseAlbum(index: number) {
    onPlaybackChange(false);
    setSelected(index);
    setCoverFailed(false);
    setOpened(false);
    onAlbumOpenChange(false);
  }

  function closeAlbum() {
    onPlaybackChange(false);
    setOpened(false);
    onAlbumOpenChange(false);
    wheel.current?.querySelector<HTMLElement>('[role="listbox"]')?.focus({ preventScroll: true });
  }

  return <>
    <div className={styles.intro}>
      <h1 id="lab-heading" ref={headingRef} tabIndex={-1}>Music</h1>
      <p className={styles.subtitle}>On repeat, forever.</p>
    </div>

    <div className={styles.browser}>
      <p className={styles.browserLabel}>From my rotation</p>
      <AnimatedContent trigger="mount" distance={32} scale={0.94} duration={0.68} ease="back.out(1.35)" delay={reduced ? 0 : 0.12} className={styles.wheelEntrance}>
        <div className={styles.wheel} ref={wheel}>
          <OptionWheel items={recordTitles} defaultSelected={0} onChange={browseAlbum} onSelect={openAlbum}
            ariaLabel="Choose a record" reducedMotion={reduced}
            textColor="#b8c9ff" activeColor="#fff9e9" fontSize={2} spacing={2.8}
            inset={12} curve={1} tilt={6} blur={0.5} fade={0.24} minOpacity={0.2}
            smoothing={60} draggable={musicRecords.length > 1}
            renderItem={(index, title) => <><span>{title}<span className={styles.openArrow} aria-hidden="true"> ↗</span></span><small>{musicRecords[index].artist} · {musicRecords[index].year}</small></>}
          />
        </div>
        <p className={styles.hint}>{musicRecords.length > 1 ? "Scroll / drag to browse · click to open" : "Click or press Enter to open"}</p>
      </AnimatedContent>
    </div>
    <p className={styles.collection}>{String(musicRecords.length).padStart(2, "0")} records.<br />A small listening room.</p>

    <div className={styles.detail} aria-live="polite">
      <AnimatedContent key={album.spotifyId} trigger="mount" distance={20} scale={0.95} duration={0.52} ease="back.out(1.2)" className={styles.record}>
        <article aria-label={`${album.title} ${album.type} detail`} data-player-open={opened}>
          <button type="button" className={styles.cover} onClick={() => openAlbum(selected)} aria-label={`Open ${album.title} by ${album.artist} on the player`} aria-expanded={opened} aria-controls="music-album-player">
            {coverFailed ? <span className={styles.coverFallback}>{album.title}<br /><small>{album.artist} · listen on Spotify ↗</small></span> : <Image src={album.cover} alt={`${album.title} album cover`} width={300} height={300} unoptimized loading="eager" onError={() => setCoverFailed(true)} />}
          </button>
          <h2>{album.title}</h2>
          <p className={styles.artist}>{album.artist} · {album.year}</p>
          <div id="music-album-player" hidden={!opened}>
            {opened && <AnimatedContent trigger="mount" distance={14} duration={0.4}>
              <div className={styles.recordHeader}><span>On the player · {String(selected + 1).padStart(2, "0")}</span><button type="button" onClick={closeAlbum} aria-label="Close record">Close player ×</button></div>
              <SpotifyPlayer record={album} onPlaybackChange={onPlaybackChange} />
              <a className={styles.spotify} href={album.url} target="_blank" rel="noopener noreferrer">Open {album.type === "track" ? "song" : "album"} on Spotify ↗</a>
              <p className={styles.provider}>Music and artwork provided by Spotify.</p>
            </AnimatedContent>}
          </div>
          {!opened && <p className={styles.coverHint}>Click the cover to open the player.</p>}
        </article>
      </AnimatedContent>
    </div>
  </>;
}
