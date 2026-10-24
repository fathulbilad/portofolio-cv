# Music room sources

The collection contains nine full albums chosen by the site owner. Album titles,
artists, release years, and artwork are verified against the official Spotify
album pages and oEmbed metadata. The original two records were verified October
23, 2026; the seven additions were verified October 24, 2026.

| Album | Artist | Spotify release year | Official album | oEmbed metadata |
| --- | --- | --- | --- | --- |
| Getting Killed | Geese | 2025 | [Album](https://open.spotify.com/album/0eeXb23yMW6EaIgm63xxPC) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F0eeXb23yMW6EaIgm63xxPC) |
| Popstar | Tinashe | 2026 | [Album](https://open.spotify.com/album/06CjF89lLSSiVWXujVVtQs) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F06CjF89lLSSiVWXujVVtQs) |
| MAN BITES DOG | femtanyl | 2026 | [Album](https://open.spotify.com/album/4GRPvwkbXfKXNGfrIJAGCE) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F4GRPvwkbXfKXNGfrIJAGCE) |
| IGOR | Tyler, The Creator | 2019 | [Album](https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5zi7WsKlIiUXv09tbGLKsE) |
| The Money Store | Death Grips | 2012 | [Album](https://open.spotify.com/album/1PQDjdBpHPikAodJqjzm6a) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F1PQDjdBpHPikAodJqjzm6a) |
| Imaginal Disk | Magdalena Bay | 2024 | [Album](https://open.spotify.com/album/4HTy9WFTYooRjE9giTmzAF) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F4HTy9WFTYooRjE9giTmzAF) |
| Heavy Metal | Cameron Winter | 2024 | [Album](https://open.spotify.com/album/7mOrnQqDad3RgYQsJGaaqk) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F7mOrnQqDad3RgYQsJGaaqk) |
| Faces | Mac Miller | 2021 | [Album](https://open.spotify.com/album/5SKnXCvB4fcGSZu32o3LRY) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5SKnXCvB4fcGSZu32o3LRY) |
| I Love My Computer | Ninajirachi | 2025 | [Album](https://open.spotify.com/album/77CZUF57sYqgtznUe3OikQ) | [Metadata](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F77CZUF57sYqgtznUe3OikQ) |

Faces uses the 2021 Spotify streaming edition.

- Cover URL is the `thumbnail_url` supplied by that response, displayed directly
  from Spotify without downloading, proxying, caching locally, or altering it.
- The official album player uses the supported compact height and dark theme.
  Its Spotify branding and controls remain visible and unmodified.

Spotify serves playback. There is no autoplay, locally hosted audio, custom
5–10 second excerpt, beat detector, audio capture, or time-synchronized visuals.
The black contour runs an independent eight-second morph only while Spotify's
official `playback_update` event reports `isPaused: false` and no buffering.
Position and duration are compared only to detect the end of a preview, since
Spotify can leave its paused flag unset at completion. No audio timing, waveform,
spectrum, or beat data drives the shape.
Pause, completion, playback errors, closing, switching records, or leaving the room end the
animation and smoothly return to the resting contour. Hidden tabs and reduced
motion disable the contour cycle. The dot mask shares the same path as the fill.
If Spotify's controller is blocked or slow to load, an ordinary iframe fallback
preserves playback and leaves the boundary still.
The player is unmounted on Close, section changes, or phone layouts; this ends
its in-page playback. External album links remain available if embedding fails.

The Record room shows the selected cover on a closed black record island,
surrounded by blue negative space, with Music below the back-to-menu link.
Faint decorative grooves are clipped to the same morphing contour. The original
Odds & Ends silhouette is independent of the record contour.
The React Bits Option Wheel previews covers while browsing; clicking a cover
or activating an item opens the Spotify player below it. Changing the wheel
selection closes the previous player and ends playback. The nine albums remain
available, including on desktop and tablet; the room does not mount on phones.

Selecting a record loads its cover from Spotify's image CDN. Opening its player
loads the Spotify embed,
which can use cookies and other data under [Spotify's privacy policy](https://www.spotify.com/legal/privacy-policy/).
No Spotify account data, credentials, OAuth tokens, or playback history are
requested or stored by this site. Full playback is not guaranteed for every
listener; Spotify determines the available experience.

References:

- [Spotify Embeds](https://developer.spotify.com/documentation/embeds)
- [Spotify widget terms](https://developer.spotify.com/documentation/embeds/terms)
- [Spotify embed troubleshooting](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting)
- [Official iFrame API and playback events](https://developer.spotify.com/documentation/embeds/references/iframe-api)
- [React Bits Option Wheel](https://reactbits.dev/components/option-wheel)
- [React Bits Animated Content](https://reactbits.dev/animations/animated-content)

Album artwork, music, and trademarks belong to their respective rightsholders.
