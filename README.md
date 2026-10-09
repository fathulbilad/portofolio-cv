# Fathul Bilad — CV & Portfolio

A bilingual portfolio built with Next.js, React, and TypeScript. The pastel cards and illustrations come from the Rick and Morty frontend project, adapted around professional experience, skills, education, certifications, contact details, and side projects, currently featuring the six Cardio projects.

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

At widths of 900px and above, overview cards open a route-backed drawer. Client and side project detail links replace its contents; closing returns to the overview and restores the originating card's focus and scroll position. Direct links and page refreshes show standalone pages.

Below 900px, section and detail links use standalone pages. Certificate images open in an accessible Radix dialog on both screen sizes, with zoom and an original-image link. The Anthropic certification stays listed without a preview until an image is supplied.

The hero's ID badge button and About section reuse the draggable 3D lanyard from the Rick and Morty frontend. Three.js and the physics engine load only when the badge is shown. Pause and reset controls are available, reduced-motion preferences start it paused, and animation stops when the browser tab is hidden. The homepage illustrations use Next.js image optimization.

## Content and assets

- `lib/portfolio.ts`: section copy, project metadata, side project descriptions, repository links, and certificate images.
- `lib/translations.ts`: existing bilingual client case studies, skills, and education.
- `components/portfolio/`: overview, shared section content, navigation, drawers, and certificate previews.
- `app/(main)/[section]/`: standalone section and detail routes.
- `app/(main)/@drawer/`: intercepted desktop routes and empty fallback slots.
- `public/illustrations/`: reused illustrations and the matching Cardio illustration.
- `public/lanyard/`: the original Fathul/MII badge model and strap texture.
- `cvFolderUrl` in `lib/portfolio.ts`: the permanent Google Drive folder for the CV. Every CV button opens it in a new tab, so updating the folder requires no website change.

The site uses static CV content and does not depend on the Rick and Morty backend. Cardio descriptions cover the projects' curricula and workflows without implying that every exercise is complete.
