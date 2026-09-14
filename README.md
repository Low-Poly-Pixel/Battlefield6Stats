# Battlefield 6 Stats

Weapon and ballistics stats reference for Battlefield 6.

## Repo layout

```
.
├── app/    # React + TypeScript + Vite front end (this folder)
└── data/   # Source weapon/attachment/ballistics data (JSON)
```

## Prerequisites

This project uses [Bun](https://bun.sh) — not npm or yarn — as the package
manager and script runner. The dependency lockfile (`bun.lock`) is
Bun-specific, so installs must go through Bun to stay reproducible.

Install it if you don't have it:

```
curl -fsSL https://bun.sh/install | bash
```

(See [bun.sh](https://bun.sh) for Windows/other install methods.) Verify with:

```
bun --version
```

## Running the app

From this folder (`app/`):

```
bun install
bun run dev
```

This starts the Vite dev server and prints a local URL to open in your browser.

### Other scripts

| Command                | Purpose                              |
| ---------------------- | ------------------------------------ |
| `bun run dev`          | Start the dev server with hot reload |
| `bun run build`        | Type-check and build for production  |
| `bun run preview`      | Preview the production build locally |
| `bun run lint`         | Run ESLint                           |
| `bun run format`       | Format files with Prettier           |
| `bun run format:check` | Check formatting without writing     |

## Data

`../data/` holds the raw weapon, attachment, ammo, and ballistics stats
(JSON) that back the app's numbers.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for coding standards and project
structure conventions.
