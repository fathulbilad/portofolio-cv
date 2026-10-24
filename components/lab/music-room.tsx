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
  const [opened, setOpened] = useState<number | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const wheel = useRef<HTMLDivElement>(null);
  const album = opened === null ? null : musicRecords[opened];

  useEffect(() => () => onAlbumOpenChange(false), [onAlbumOpenChange]);

  function openAlbum(index: number) {
    if (opened === index) return;
    onSelectSound();
    onPlaybackChange(false);
    setCoverFailed(false);
    setOpened(index);
    onAlbumOpenChange(true);
  }

  function closeAlbum() {
    onPlaybackChange(false);
    setOpened(null);
    onAlbumOpenChange(false);
    wheel.current?.querySelector<HTMLElement>('[role="listbox"]')?.focus({ preventScroll: true });
  }

  return <>
    <div className={styles.intro}>
      <h1 id="lab-heading" ref={headingRef} tabIndex={-1}>Music</h1>
      <p className={styles.subtitle}>On repeat, forever.</p>
      <AnimatedContent trigger="mount" distance={32} scale={0.94} duration={0.68} ease="back.out(1.35)" delay={reduced ? 0 : 0.12} className={styles.wheelEntrance}>
        <div className={styles.wheel} ref={wheel}>
          <OptionWheel items={recordTitles} defaultSelected={0} onSelect={openAlbum}
            ariaLabel="Choose a record" reducedMotion={reduced}
            textColor="#b8c9ff" activeColor="#fff9e9" fontSize={2.4} spacing={2.4}
            inset={12} curve={1} tilt={6} blur={0.5} fade={0.24} minOpacity={0.2}
            smoothing={60} draggable={musicRecords.length > 1}
            renderItem={(index, title) => <><span>{title}<span className={styles.openArrow} aria-hidden="true"> ↗</span></span><small>{musicRecords[index].artist} · {musicRecords[index].year}</small></>}
          />
        </div>
        <p className={styles.hint}>{musicRecords.length > 1 ? "Scroll / drag to browse · click to open" : "Click or press Enter to open"}</p>
      </AnimatedContent>
      <p className={styles.collection}>{String(musicRecords.length).padStart(2, "0")} {musicRecords.length === 1 ? "record" : "records"} · a collection in progress</p>
    </div>

    <div className={styles.detail} aria-live="polite">
      {album ? <AnimatedContent key={album.spotifyId} trigger="mount" distance={20} scale={0.95} duration={0.52} ease="back.out(1.2)" className={styles.record}>
        <article aria-label={`${album.title} ${album.type} detail`}>
          <div className={styles.recordHeader}><span>Selected record · {String((opened ?? 0) + 1).padStart(2, "0")}</span><button type="button" onClick={closeAlbum} aria-label="Close record">Close ×</button></div>
          <a className={styles.cover} href={album.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${album.title} by ${album.artist} on Spotify`}>
            {coverFailed ? <span className={styles.coverFallback}>{album.title}<br /><small>{album.artist} · listen on Spotify ↗</small></span> : <Image src={album.cover} alt={`${album.title} album cover`} width={300} height={300} unoptimized loading="eager" onError={() => setCoverFailed(true)} />}
          </a>
          <h2>{album.title}</h2>
          <p className={styles.artist}>{album.artist} · {album.year}</p>
          <SpotifyPlayer record={album} onPlaybackChange={onPlaybackChange} />
          <a className={styles.spotify} href={album.url} target="_blank" rel="noopener noreferrer">Open {album.type === "track" ? "song" : "album"} on Spotify ↗</a>
          <p className={styles.provider}>Music and artwork provided by Spotify.</p>
        </article>
      </AnimatedContent> : <AnimatedContent trigger="mount" distance={14} duration={0.42} className={styles.invitation}>
        <span>A small listening room</span>
        <h2>Pick a<br />record.</h2>
        <p>A cover. A few words.<br />Something worth another listen.</p>
      </AnimatedContent>}
    </div>
  </>;
}
