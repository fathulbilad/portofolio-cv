"use client";

import { useEffect, useRef, useState } from "react";
import { loadSpotifyIframeApi, type SpotifyController } from "@/lib/spotify-embed";
import type { musicRecords } from "@/lib/lab";
import styles from "./music-room.module.css";

export function SpotifyPlayer({ record, onPlaybackChange }: { record: (typeof musicRecords)[number]; onPlaybackChange: (playing: boolean) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const title = `Spotify ${record.type} player: ${record.title} by ${record.artist}`;

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let alive = true;
    let controller: SpotifyController | undefined;
    const target = document.createElement("div");
    element.append(target);

    const useFallback = () => {
      if (!alive) return;
      alive = false;
      controller?.destroy();
      onPlaybackChange(false);
      setFallback(true);
    };
    const deadline = setTimeout(useFallback, 10000);

    void loadSpotifyIframeApi().then(api => {
      if (!alive) return;
      clearTimeout(deadline);
      api.createController(target, { url: `${record.url}?utm_source=iframe-api&theme=0`, width: "100%", height: 152 }, created => {
        controller = created;
        if (!alive) { created.destroy(); return; }
        const iframe = element.querySelector("iframe");
        if (iframe) iframe.title = title;
        created.addListener("playback_update", event => {
          // Spotify previews can finish without updating isPaused. Treat the
          // terminal position as stopped, without timing the motion to audio.
          const { isPaused, isBuffering, position, duration } = event.data;
          const finished = typeof duration === "number" && duration > 0 && typeof position === "number" && position >= duration;
          if (alive) onPlaybackChange(isPaused === false && isBuffering !== true && !finished);
        });
        created.addListener("error", () => { if (alive) onPlaybackChange(false); });
      });
    }).catch(useFallback);

    return () => {
      alive = false;
      clearTimeout(deadline);
      controller?.destroy();
      element.replaceChildren();
      onPlaybackChange(false);
    };
  }, [record.url, title, onPlaybackChange]);

  // A blocked controller never prevents ordinary Spotify playback; its fallback
  // remains visible and keeps the shape still because no playback state is known.
  return fallback ? <iframe className={styles.player} title={title}
    src={`https://open.spotify.com/embed/${record.type}/${record.spotifyId}?utm_source=oembed&theme=0`}
    width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
    : <div ref={host} className={styles.playerHost} aria-label={title} />;
}
