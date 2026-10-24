Official React Bits Tech Text, Fade Content, Animated Content, Option Wheel, Folder, and Sound Lab sources, downloaded from DavidHDev/react-bits.

Tech Text: https://reactbits.dev/text-animations/tech-text
Sound Lab: https://reactbits.dev/tools/sound-lab
Fade Content: https://reactbits.dev/animations/fade-content
Animated Content: https://reactbits.dev/animations/animated-content
Option Wheel: https://reactbits.dev/components/option-wheel

FadeContent.tsx is the unmodified TypeScript source from the official FadeContent-TS-CSS registry, retrieved October 23, 2026. The Games gallery uses its mount-triggered fade for game captions. The gallery's overlapping image crossfade and navigation pattern also reference https://reactbits.dev/components/carousel, adapted to a native horizontal shelf.

AnimatedContent.tsx is the unmodified source from AnimatedContent-TS-CSS,
retrieved October 23, 2026. Music uses its mount trigger, upward distance,
scale, and back easing for the wheel entrance and album reveal.
The Record room keeps those entrances, adds a 400ms player reveal, and uses
Option Wheel's onChange callback to preview covers without mounting Spotify.
Its custom closed ink island retains the shared Motion path transition and
playback-only eight-second cycle. Grooves are decorative and carry no audio data.

OptionWheel.tsx and OptionWheel.css come from OptionWheel-TS-CSS, retrieved
October 23, 2026. The adapter adds an explicit onSelect callback, album label
rendering, a named listbox with active-descendant IDs, Enter/Space activation,
Home/End navigation, and immediate positioning for reduced motion. A one-item
collection lets native scroll pass through. Its optional audio URL is unused;
Lab selection sounds continue to use Sound Lab's existing opt-in engine.

See LICENSE.md for the MIT + Commons Clause terms. These files are vendored, with a small playback mute guard in the sound engine.

Folder.tsx and Folder.css come from the official Folder-TS-CSS registry at
https://reactbits.dev/r/Folder-TS-CSS.json, retrieved October 24, 2026.
Reference: https://reactbits.dev/components/folder?tilt=1.05&size=1.8&speed=0.75.
The Projects room uses the matte flap mode with click opening, a spread of
custom ivory pages, tilt 1.05, speed 0.75, and responsive size up to 1.8.
The adapter adds front-cover content and page labels, a workspace bounds ref,
a reset signal for filing all pages, conservative live/drop/resize constraints,
an 8px drag threshold, and Escape consumption before Lab navigation (including
when outside-click closing is disabled). Reduced
motion snaps springs immediately and responds to preference changes. Folder
zoom is disabled in favor of the room's accessible paper dialog with focus
restoration. Glass mode is unused and creates no WebGL context. Source CSS is
unchanged; archive presentation is scoped in projects-room.module.css. Sounds
still use the existing opt-in Sound Lab engine.

Projects retains the same Folder, Animated Content reader entrance, and opt-in
Sound Lab cues in its full-width sweep layout. The shared Motion path controls
finish the room transition before starting the Music-style eight-second idle
cycle. The custom sweep is bounded above the drag workspace so interactive
content stays stationary and readable throughout.

Odds & Ends uses the existing AnimatedContent source for its contact entrance
and each read-only message bubble. The contact marker and Arrow/Home/End
navigation reference https://reactbits.dev/components/animated-list, adapted
to five native buttons; AnimatedList itself is not vendored. Motion's
AnimatePresence supplies a non-blocking conversation exit alongside the new
staggered entrance, including when selection returns to a voice mid-transition.
A custom closed speech contour retains the shared eight-cubic path
contract for menu transitions and a tail measured against the selected contact.
No reply/composer, model service, or hosted chat audio is used. Contact selection
continues to use the existing opt-in Sound Lab engine.
