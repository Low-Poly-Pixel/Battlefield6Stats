# About Battlefield6Stats

[![Live Demo](https://img.shields.io/badge/live-demo-blue)](https://low-poly-pixel.github.io/Battlefield6Stats/)

Currently a work in progress, I am resolving the data model before expanding out the UI functionality*

This is a fan made weapon and ballistics stats reference for Battlefield 6.

In-game weapon stats are hidden behind vague UI bars that don't really describe what they do. This project turns the raw numbers into an interactive site: pick a weapon, stack attachments, and see the effect on damage range, hip-fire spread, ADS mobility, and more, plotted rather than guessed!

Deployed live on GitHub Pages:

https://low-poly-pixel.github.io/Battlefield6Stats/

## Features

- Full weapon list with per-category stat breakdowns (core, accuracy, hip-fire, mobility, reload, stealth, ammo modifiers)
- Damage-falloff chart across engagement range, redrawn live as attachments change
- Attachment loadout selection across all weapon categories, with per-weapon quirks (dual optics, combined attachments, etc.) modeled individually
- Signature weapon variant toggle
- Dark-only, accessible (WCAG 2.1 AA target) component library built on Mantine, documented in Storybook

## Tech Stack

- TypeScript (strict mode)
- React
- Vite
- Mantine (core, charts, hooks)
- Storybook
- Bun
- GitHub Pages (static hosting), server-side rendered and prerendered at build time

## Development

This project uses [Bun](https://bun.sh) — not npm or yarn — as the package manager and script runner, since the lockfile (`bun.lock`) is Bun-specific.

```bash
bun install
bun run dev
```

This starts the Vite dev server and prints a local URL to open in your browser.

### Data

`src/data/` holds the raw weapon, attachment, ammo, and ballistics stats (as TypeScript modules) that back every number shown in the app.

## Scripts

- `bun run dev` — local dev server
- `bun run build` — type-check, build, and prerender for production
- `bun run preview` — preview the production build locally
- `bun run lint` — run ESLint
- `bun run format` / `bun run format:check` — Prettier, write or check
- `bun run storybook` — component library docs and Accessibility panel
- `bun run build-storybook` — build the static Storybook site

## Roadmap

- **UI Cleanup** - The page needs a cleanup of its UI and missing stats added to it 
- **Sight/optic attachments** — no underlying data exists yet for this category; currently excluded rather than shown incomplete.
- **Shotgun reload timing** — per-shell (tactical) reload isn't modeled yet, so reload time is left blank for shotguns rather than shown incorrectly.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for coding standards and project structure conventions.

## License

MIT — see [LICENSE](LICENSE).
