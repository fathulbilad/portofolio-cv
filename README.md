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

The first homepage visit in a browser shows the original badge artwork with a gentle swing, followed by a pastel pixel reveal inspired by [React Bits Pixel Swap](https://reactbits.dev/animations/pixel-swap). The welcome remains visible for about four seconds, and the full intro finishes within five seconds. A prominent View my CV button beneath the name starts the pixel reveal immediately; Escape dismisses the intro instantly. The first visit is remembered in local storage, so refreshes and future visits skip it. Direct section links, homepage anchors, and reduced-motion preferences bypass it. The CV remains accessible without JavaScript, and an independent five-second deadline opens it if the intro fails. Card entrance animations start when the pixel reveal begins. The welcome uses a 36KB preview extracted from the existing badge model; the interactive 3D badge still loads on demand inside the CV.

At widths of 900px and above, overview cards open a drawer from their side of the screen. The shared CV content is already loaded; opening a drawer updates browser history without requesting a new page. Client and side project detail links replace its contents and keep the original side. Closing returns to the overview and restores the originating card's focus and scroll position; Back and Forward work too. Direct links and page refreshes show standalone pages.

Below 900px, section and detail links use prefetched standalone pages with client navigation and a brief 300ms fade and rise. The welcome keeps the badge swing and pixel reveal, with fewer pixel tiles on smaller screens. Reduced-motion preferences disable this motion. Resizing an open desktop drawer to mobile opens its standalone page. Certificates are the exception: the section opens from the bottom on desktop and mobile, with the original elastic bouncing card fan. Individual previews also slide up from the bottom, with zoom and an original-image link. The Anthropic MCP certificate includes a preview and its original PDF.

After the welcome, keyboard and assistive navigation resumes at the CV heading without a visible outline on the heading. Links and buttons retain their keyboard focus outlines.

The homepage entrance, card hover effects, layered left/right drawer slides, and section animations reuse the Rick and Morty frontend's timing and easing. Reduced-motion preferences disable these animations. The hero developer illustration now wears glasses.

The hero's ID badge button and About section reuse the draggable 3D lanyard from the Rick and Morty frontend. The badge hangs higher to leave room beneath it. Three.js and the physics engine load only when the badge is shown. Pause and reset controls are available, reduced-motion preferences start it paused, and animation stops when the browser tab is hidden. The homepage illustrations use Next.js image optimization.

## Content and assets

- `lib/portfolio.ts`: section copy, project metadata, side project descriptions, repository links, and certificate images.
- `lib/translations.ts`: existing bilingual client case studies, skills, and education.
- `components/portfolio/`: overview, shared section content, navigation, drawers, and certificate previews.
- `app/(main)/[section]/`: standalone section and detail routes.
- `lib/portfolio-paths.ts`: shared section and detail URL validation.
- `public/illustrations/`: reused illustrations and the matching Cardio illustration.
- `public/lanyard/`: the original Fathul/MII badge model and strap texture.
- `cvFolderUrl` in `lib/portfolio.ts`: the permanent Google Drive folder for the CV. Every CV button opens it in a new tab, so updating the folder requires no website change.

The site uses static CV content and does not depend on the Rick and Morty backend. Cardio descriptions cover the projects' curricula and workflows without implying that every exercise is complete.

## Glasses illustration

Saved asset: `public/illustrations/Bento1-glasses.png`. Edited with the built-in image generation tool, preserving transparency.

Final prompt: "Use case: precise-object-edit. Edit the supplied transparent hero illustration. Add simple thin black-framed glasses to the developer's face. Change only the glasses; preserve his face, hair, hoodie, pose, laptop, little doodles, original hand-drawn ink style, colors, composition, and transparent background."

## Drawer regression check

With `agent-browser` installed on your PATH and a production preview running, run:

```sh
node scripts/check-drawers.mjs http://127.0.0.1:3105
node scripts/check-welcome.mjs http://127.0.0.1:3105
```

This local-only check loads the overview, switches the browser offline, and verifies left/right and bottom drawers, nested details, Back/Forward, and keyboard focus. It also checks mobile navigation and the nested MCP certificate preview and PDF link. Drawer content must appear within 200ms while offline, so a new route request fails the check.

The welcome check verifies first-paint visibility, the five-second limit, the entry button's pixel reveal and repeated clicks, persisted return visits, mobile layout, reduced motion, direct links, keyboard focus, Escape, and recovery when application scripts fail to load.
