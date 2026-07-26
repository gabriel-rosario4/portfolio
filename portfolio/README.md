# Portfolio — Gabriel Rosario

Personal site and engineering writing. Next.js App Router, TypeScript,
Tailwind v4, MDX, Framer Motion.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Before this goes live

These are placeholders, and they read as real claims. Replace them.

| What | Where | Note |
| --- | --- | --- |
| Project metrics | `content/case-studies/*.mdx` frontmatter | Every file carries a `NOTE:` comment. Figures like `18.7%` and `120ms` are invented. |
| Résumé | `public/resume.pdf` | Currently a 636-byte stub that says "PLACEHOLDER". |
| Social URLs | `lib/site.ts` → `socials` | Guessed handle. |
| Site URL | `lib/site.ts` → `site.url`, or `NEXT_PUBLIC_SITE_URL` | Used for canonicals, sitemap, RSS and OG. |
| Portrait | `public/portraits/gabriel.jpg` | See below. |

### Adding your portrait

The hero ships with an illustrated landscape rather than a placeholder avatar.
To use a photo, drop a square image at `public/portraits/gabriel.jpg` and set
`portrait.enabled` to `true` in `lib/site.ts`. It gets clipped into the same
organic shape the illustration uses.

## Structure

```
app/             routes; [slug] pages import MDX from content/
components/
  ui/            design-system primitives (Button, Card, TechPill, …)
  illustrations/ hand-authored SVG scenes and doodles
  motion/        client wrappers so pages stay server components
  content/       blocks usable inside MDX
  home/ projects/ writing/ layout/
content/
  case-studies/  one MDX file per project — frontmatter drives the cards
  blog/          articles
lib/
  site.ts        identity, nav, socials
  content.ts     reads MDX off disk (server-only)
  about.ts       About page copy
  now.ts         "What I'm up to" cards
  motion.ts      shared animation rules
```

### Content is the source of truth

There is no separate project registry. A case study's frontmatter drives its
card, the projects index, the filters and its own page. Adding a project means
adding one `.mdx` file.

Set `hasCaseStudy: false` for a project that should appear as a card but link
straight to source instead of getting a page.

## Design system

All tokens live in the `@theme` block of `app/globals.css` — surfaces, brand
colors, the type scale, elevation and easing. Components reference semantic
names (`bg-surface`, `text-ink-muted`, `ease-soft`), never literal values, so
a theme change is one file.

Two rules worth knowing before editing:

- **Warm colors are illustration-only.** `--color-sun`, `--color-coral` and
  `--color-ember` never appear on UI chrome or text.
- **Text pairs are verified against WCAG AA.** `--color-ink-faint` in
  particular is tuned to clear 4.5:1 on `surface-raised`, the darkest
  background it lands on. Darkening it breaks small meta text.

## Motion

Everything decelerates; nothing bounces. `Reveal`, `Stagger` and `Entrance`
(`components/motion/reveal.tsx`) wrap Framer Motion and return plain elements
under `prefers-reduced-motion`, so reduced motion is a genuine no-op rather
than a fast animation.

## MDX

Configured in `next.config.ts`. Turbopack can't accept JS functions across the
Rust boundary, so **remark/rehype plugins must be referenced by name with
serializable options only** — adding a plugin as an imported function will
fail the build.

Available inside any MDX file without importing: `Callout`, `MetricGrid`,
`TechPillGroup`, `Figure`, `Gallery`, `ArchitectureDiagram`.

## Known gaps

- Only one case study and one article ship as templates; add more by dropping
  a new `.mdx` file into the matching `content/` folder.
- Project thumbnails and article covers use `PlaceholderArt` — seeded abstract
  compositions, meant to be replaced with bespoke illustrations.
- Per-page OG images aren't implemented; every route falls back to the site
  card in `app/opengraph-image.tsx`.
- The site has not been visually reviewed in a browser.
