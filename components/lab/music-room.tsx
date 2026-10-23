"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type Ref } from "react";
import { musicAlbums } from "@/lib/lab";
import AnimatedContent from "./vendor/AnimatedContent";
import OptionWheel from "./vendor/OptionWheel";
import styles from "./music-room.module.css";

const albumTitles = musicAlbums.map(album => album.title);

export function MusicRoom({ reduced, headingRef, onSelectSound, onAlbumOpenChange }: {
  reduced: boolean;
  headingRef: Ref<HTMLHeadingElement>;
  onSelectSound: () => void;
  onAlbumOpenChange: (open: boolean) => void;
}) {
  const [opened, setOpened] = useState<number | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const wheel = useRef<HTMLDivElement>(null);
  const album = opened === null ? null : musicAlbums[opened];

  useEffect(() => () => onAlbumOpenChange(false), [onAlbumOpenChange]);

  function openAlbum(index: number) {
    if (opened !== index) onSelectSound();
    setCoverFailed(false);
    setOpened(index);
    onAlbumOpenChange(true);
  }

  function closeAlbum() {
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
          <OptionWheel items={albumTitles} defaultSelected={0} onSelect={openAlbum}
            ariaLabel="Choose an album" reducedMotion={reduced}
            textColor="#b8c9ff" activeColor="#fff9e9" fontSize={2.4} spacing={1.75}
            inset={12} curve={1} tilt={6} blur={0.5} fade={0.24} minOpacity={0.2}
            smoothing={180} draggable={musicAlbums.length > 1}
            renderItem={(index, title) => <><span>{title}<span className={styles.openArrow} aria-hidden="true"> ↗</span></span><small>{musicAlbums[index].artist} · {musicAlbums[index].year}</small></>}
          />
        </div>
        <p className={styles.hint}>{musicAlbums.length > 1 ? "Scroll / drag to browse · click to open" : "Click or press Enter to open"}</p>
      </AnimatedContent>
      <p className={styles.collection}>{String(musicAlbums.length).padStart(2, "0")} {musicAlbums.length === 1 ? "record" : "records"} · a collection in progress</p>
    </div>

    <div className={styles.detail} aria-live="polite">
      {album ? <AnimatedContent key={album.spotifyId} trigger="mount" distance={20} scale={0.95} duration={0.52} ease="back.out(1.2)" className={styles.record}>
        <article aria-label={`${album.title} album detail`}>
          <div className={styles.recordHeader}><span>Selected record · {String((opened ?? 0) + 1).padStart(2, "0")}</span><button type="button" onClick={closeAlbum} aria-label="Close album">Close ×</button></div>
          <a className={styles.cover} href={album.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${album.title} by ${album.artist} on Spotify`}>
            {coverFailed ? <span className={styles.coverFallback}>{album.title}<br /><small>{album.artist} · listen on Spotify ↗</small></span> : <Image src={album.cover} alt={`${album.title} album cover`} width={300} height={300} unoptimized loading="eager" onError={() => setCoverFailed(true)} />}
          </a>
          <h2>{album.title}</h2>
          <p className={styles.artist}>{album.artist} · {album.year}</p>
          <iframe key={album.spotifyId} className={styles.player} title={`Spotify album player: ${album.title} by ${album.artist}`}
            src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=oembed&theme=0`}
            width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
          <a className={styles.spotify} href={album.url} target="_blank" rel="noopener noreferrer">Open album on Spotify ↗</a>
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
