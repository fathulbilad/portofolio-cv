// Official Spotify iFrame API: playback state only; no audio or beat analysis.
// https://developer.spotify.com/documentation/embeds/references/iframe-api
export type SpotifyPlaybackEvent = { data: { isPaused?: boolean; isBuffering?: boolean; position?: number; duration?: number } };
export type SpotifyController = {
  addListener: (event: "playback_update" | "error", listener: (event: SpotifyPlaybackEvent) => void) => void;
  destroy: () => void;
};
type SpotifyIframeApi = {
  createController: (element: HTMLElement, options: { url: string; width: string; height: number }, callback: (controller: SpotifyController) => void) => void;
};

declare global {
  interface Window { onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void; }
}

let apiPromise: Promise<SpotifyIframeApi> | undefined;

export function loadSpotifyIframeApi() {
  if (!apiPromise) {
    apiPromise = new Promise<SpotifyIframeApi>((resolve, reject) => {
      const previousReady = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = api => {
        resolve(api);
        previousReady?.(api);
      };
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.addEventListener("error", () => {
        script.remove();
        reject(new Error("Spotify iFrame API is unavailable."));
      }, { once: true });
      document.head.append(script);
    }).catch(error => {
      apiPromise = undefined;
      throw error;
    });
  }
  return apiPromise;
}
