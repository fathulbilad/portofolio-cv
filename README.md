# Fathul Bilad — CV & Portfolio

A bilingual portfolio built with Next.js, React, and TypeScript. English is the default regardless of browser language; a visitor's explicit language choice is remembered. The pastel cards and illustrations come from the Rick and Morty frontend project, adapted around professional experience, skills, education, certifications, contact details, and side projects, currently featuring the six Cardio projects.

## Development

Use Node.js 20.9 or newer (Node.js 24 recommended).

```sh
bun install
bun run dev
```

Open http://localhost:3000. Before committing, run:

```sh
bun run lint
bun run typecheck
bun run build
```

## Browsing

The first homepage visit in a browser shows the original badge artwork with a gentle swing, followed by a pastel pixel reveal inspired by [React Bits Pixel Swap](https://reactbits.dev/animations/pixel-swap). The welcome remains visible for about four seconds, and the full intro finishes within five seconds. A prominent View my CV button beneath the name starts the pixel reveal immediately; Escape dismisses the intro instantly. The first visit is remembered in local storage, so refreshes and future visits skip it. Direct section links, homepage anchors, and reduced-motion preferences bypass it. The CV remains accessible without JavaScript, and an independent five-second deadline opens it if the intro fails. Desktop card entrance animations start when the pixel reveal begins; mobile cards stay still. Mobile uses fewer pixel tiles. The welcome uses a 36KB preview extracted from the existing badge model; the interactive 3D badge still loads on demand on desktop inside the CV.

At widths of 900px and above, Certificates, Education, and Contact open bottom drawers. The other overview sections open from their side of the screen. The CV card opens the selected Google Drive CV file directly. The shared CV content is already loaded; opening a drawer updates browser history without requesting a new page. Client and side project detail links replace its contents and keep the original side. Closing returns to the overview and restores the originating card's focus and scroll position; Back and Forward work too. Direct links and page refreshes show standalone pages.

Below 900px, the welcome, pixel reveal, page entrances, and popup transitions remain animated. Section and detail links use prefetched standalone pages with client navigation and a brief 300ms fade and rise. Decorative homepage card entrances and hover movement are disabled, as are JavaScript animations of section content. Resizing an open desktop drawer to mobile opens its standalone page. Certificates remain a bottom popup with a static card fan on mobile and the original elastic bounce on desktop. Individual previews still slide up from the bottom and keep zoom and an original-image link. The Anthropic MCP certificate includes a preview and its original PDF.

After the welcome, keyboard and assistive navigation resumes at the CV heading without a visible outline on the heading. Links and buttons retain their keyboard focus outlines.

On desktop, the homepage entrance, card hover effects, layered left/right and bottom drawer slides, and section animations reuse the Rick and Morty frontend's timing and easing. Reduced-motion preferences disable these animations. The hero developer illustration now wears glasses.

On desktop, the hero's ID badge button and About section reuse the draggable 3D lanyard from the Rick and Morty frontend. The badge hangs higher to leave room beneath it. Three.js and the physics engine load only when the desktop badge is shown. Pause and reset controls are available, reduced-motion preferences start it paused, and animation stops when the browser tab is hidden. Mobile uses the original badge artwork as a static preview without loading the 3D model or physics engine. The homepage illustrations use Next.js image optimization.

## Off duty / Lab

`/lab` is the personal side of the site. Its five destinations are Life Lately,
Games, Music, Projects, and Odds & Ends. The entrance leaves the left side open
around “off duty. / a little corner / of my own.” Hover and keyboard focus change
the palette and morph the black contour over 650ms: soft ink for Life Lately,
angular cuts for Games, a long wave for Music, folded planes for Projects, and
uneven lobes for Odds & Ends. The halftone border follows the same animated path.
Rapid hovers retarget the current shape; reduced motion changes shapes directly.
Selecting a destination opens its content through an ink wipe.
Games uses a large featured preview above a horizontally scrollable image-and-title
shelf, with Bloodborne, ULTRAKILL, Terraria, Darkest Dungeon 1,
Resident Evil 4 Remake, and Hollow Knight. Cards, previous/next
buttons, and Left/Right/Home/End keys update the preview with a 500ms crossfade.
The shelf supports native trackpad and touch scrolling. Reduced motion changes
the artwork and scroll position immediately. Each active game has a curated
650ms palette transition: smoky blue and bone for Bloodborne, oxblood and coral
for ULTRAKILL, forest green and sage for Terraria, charcoal and torch amber for
Darkest Dungeon, cold teal for Resident Evil 4 Remake, and twilight violet for
Hollow Knight. The entrance uses a softer
blue-grey Games palette. Source links accompany the official
screenshots; [game artwork credits](docs/lab-game-artwork.md) record their origins.

Music keeps its cobalt-blue, ivory, and pale-blue palette. Its black halftone
boundary slowly morphs only while the official Spotify controller reports active,
non-buffering playback. It settles back on pause, completion, close, record changes, or exit;
reduced motion and hidden tabs keep it still. This is a fixed eight-second contour
cycle that acts as playback feedback, independent of the song's beat or loudness.
The left-hand React Bits Option Wheel contains Geese's Getting Killed album and
Tinashe's full Popstar album. Click a record or press Enter/Space to open its official
cover and Spotify album or track embed on the right. React Bits Animated Content provides a
680ms upward wheel entrance and a 520ms album pop. The wheel supports scrolling,
dragging, arrow keys, and Home/End. There are two real records and no placeholders.
Reduced motion skips the pops
and wheel easing. The desktop/tablet Music room is not mounted on phones.

Spotify and its cover image load only when an album is opened. The cover is
served directly from Spotify without local caching, editing, tinting, or proxying.
The official iFrame API player stays visible, retains encrypted-media permission, and starts
music only through its own controls. Closing an album or leaving Music removes
the player. Interface sounds are suppressed while the album is open to avoid
overlapping music. No song files, custom snippets, audio capture, beat analysis,
or time-synchronized visuals are used. If the controller cannot load, a normal
Spotify iframe remains available and the boundary stays still. Playback availability is determined by Spotify.
See [Music sources and playback notes](docs/lab-music.md).

Projects uses the full-width sweep layout: a cyan heading area above a wide
black workspace, with one centered matte cyan [React Bits Folder](https://reactbits.dev/components/folder?tilt=1.05&size=1.8&speed=0.75)
on the black workspace. Its persistent ink path turns from the menu's vertical
boundary into the horizontal sweep over 850ms, then follows the same gentle
eight-second cycle used for Music playback. The edge and halftone dots move
together; the heading, folder, reader, and drag bounds stay still. The cycle
stops on exit, hidden tabs, or reduced motion. The project reader is centered
in the lower workspace, and Sound stays dark against the cyan header.
Click or press Enter/Space to open the folder; its
three ivory project pages fan out. Drag a page onto the desk, click it to read,
and drop it back over the folder to file it. Loose pages stay inside the black
workspace, including after resizing. File everything away returns all pages.
The reader uses a native non-modal dialog, restores focus to its page, and preserves
the project links. Escape first puts down a reader, then closes an open folder,
then returns to the Lab menu. The header Menu button always exits directly.
React Bits Animated Content reveals the reader, Sound Lab provides opt-in cues,
and reduced motion snaps the folder into position. This room mounts only on
desktop and tablet.

React Bits is the reference for Lab components, animation, and interface sounds.
The gallery uses the official [Fade Content](https://reactbits.dev/animations/fade-content)
component for captions and the [Carousel](https://reactbits.dev/components/carousel)
fade/selection pattern for the preview and shelf. Menu labels use broken marker
highlights in the same color as their left-hand background. Every pointer entry
or keyboard focus generates fresh irregular strokes with gaps; pointer movement
within a label keeps its pattern stable. Letters over a stroke use its contrasting
ink color, while uncovered portions remain ivory. React Bits
[Animated Content](https://reactbits.dev/animations/animated-content) reveals the
strokes with short staggered wipes; reduced motion shows them immediately.
This replaces the previous Tech Text glyph effect. Interface sounds
come from [Sound Lab](https://reactbits.dev/tools/sound-lab). Music uses
[Option Wheel](https://reactbits.dev/components/option-wheel) and
[Animated Content](https://reactbits.dev/animations/animated-content). Keep these references
and their source/license notes when extending the Lab.

The CV's Playground link uses a roughly two-second layered pink-and-black wipe
that covers the outgoing page and waits for the Lab and its font before revealing
it. Returning to the CV uses the same handoff; reduced motion uses a short opacity fade.
Escape and the Menu button return to the entrance. URL fragments support direct
links, refresh, and browser Back/Forward. Reduced motion skips the wipes and morphs.
The first menu mood is pink.
The menu and detail views share one persistent ink path with matching curve
segments. Returning from any section morphs the solid fill and halftone edge
together, with visible movement continuing after the page wipe clears. Life
Lately also retains its existing slide to the right.

The header's Playground link appears on desktop and tablet. Below 768px, and on
short touch-only landscape screens, the entry is hidden and a direct Lab visit
offers a return to the CV. Mobile can receive its own design later.

- `lib/lab.ts`: game and record picks, starter personal notes, colors, and project
  links. The selected games, Geese album, and Tinashe album were requested by the site owner;
  other starter content remains editable demonstration copy.
- `components/lab/`: interface, scoped styles, and the official vendored React
  Bits Tech Text, Fade Content, Animated Content, Option Wheel, Folder, and Sound Lab
  sources, with their license. Interface audio is opt-in on each visit. Music uses
  visible official Spotify embeds; commercial tracks are not hosted or autoplayed.
- `public/lab/`: original generated artwork and official game screenshots,
  optimized to WebP. Prompts and output paths for the original illustrations are
  recorded in [the artwork notes](docs/lab-artwork.md).

With a local preview running, check the Lab with:

```sh
node scripts/check-lab.mjs http://127.0.0.1:3105
node scripts/check-music.mjs http://127.0.0.1:3105
node scripts/check-lab-return.mjs http://127.0.0.1:3105
node scripts/check-projects.mjs http://127.0.0.1:3105
```

The check exercises palettes, animated contours, rapid hovering, matching label
highlights, fresh patterns on re-entry, stable patterns during pointer movement, menu contrast,
sections, selections, artwork loading, focus restoration, browser history,
opt-in sound, tablet layouts, hidden phone entry, reduced motion, and invalid URL
fragment recovery.
The Projects check also samples a full sweep cycle for movement, contrast, stable
folder placement, visibility pausing, and reduced motion.
The focused Music check uses a test controller to exercise playback, pause,
buffering, completion, error recovery, hidden tabs, cleanup, reduced motion,
the full album selection, and a blocked-API iframe fallback without streaming audio.
The return check measures actual shape movement after the wipe clears for every
detail page, catching instant replacement even when the page wipe still works.

## CV content and assets

- `lib/portfolio.ts`: section copy, project metadata, side project descriptions, repository links, and certificate images.
- `lib/translations.ts`: existing bilingual client case studies, skills, and education.
- `components/portfolio/`: overview, shared section content, navigation, drawers, and certificate previews.
- `app/(main)/[section]/`: standalone section and detail routes.
- `lib/portfolio-paths.ts`: shared section and detail URL validation.
- `public/illustrations/`: reused illustrations and the matching Cardio illustration.
- `public/lanyard/`: the original Fathul/MII badge model and strap texture.
- `cvUrl` in `lib/portfolio.ts`: the shared Google Drive CV file. Every CV button opens this file directly in a new tab.

The site uses static CV content and does not depend on the Rick and Morty backend. Cardio descriptions cover the projects' curricula and workflows without implying that every exercise is complete.

## Glasses illustration

Saved asset: `public/illustrations/Bento1-glasses.png`. Edited with the built-in image generation tool, preserving transparency.

Final prompt: "Use case: precise-object-edit. Edit the supplied transparent hero illustration. Add simple thin black-framed glasses to the developer's face. Change only the glasses; preserve his face, hair, hoodie, pose, laptop, little doodles, original hand-drawn ink style, colors, composition, and transparent background."

## Drawer regression check

With `agent-browser` installed on your PATH and a production preview running, run:

```sh
node scripts/check-drawers.mjs http://127.0.0.1:3105
node scripts/check-welcome.mjs http://127.0.0.1:3105
node scripts/check-mobile-motion.mjs http://127.0.0.1:3105
```

This local-only check loads the overview, switches the browser offline, and verifies left/right and bottom drawers, nested details, Back/Forward, and keyboard focus. It also checks mobile navigation and the nested MCP certificate preview and PDF link. Drawer content must appear within 200ms while offline, so a new route request fails the check.

The welcome check verifies first-paint visibility, the five-second limit, the entry button's pixel reveal and repeated clicks, persisted return visits, mobile layout, reduced motion, direct links, keyboard focus, Escape, and recovery when application scripts fail to load.

The mobile motion check verifies the welcome button and pixel reveal, retained page and popup transitions, static homepage cards and certificate fan, no GSAP style updates on mobile section content, and a static badge without 3D resource requests. It checks portrait, landscape, and the 899px breakpoint, then confirms desktop card motion and certificate bounce are retained. This checks the requested motion policy in the local browser; it does not reproduce or diagnose Safari's rendering performance.
