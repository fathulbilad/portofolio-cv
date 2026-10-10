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

## Content and assets

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
