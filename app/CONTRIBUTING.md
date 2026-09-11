## Enforced by tooling (for reference)

- TypeScript strict mode + `typescript-eslint`'s `strictTypeChecked` preset.
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
  rules via `gts`'s config: single quotes, semicolons, `eqeqeq`, no `var`, etc.

Run `bun run lint` before pushing — CI will catch anything these miss.

## Not enforced by tooling — read this instead

### Folder structure

Feature-based, under `src/pages/<feature>/`:

```
src/
├── common/            # shared components, hooks, utils used by 2+ features
│   ├── components/
│   └── hooks/
├── config/            # external service integration only (analytics, etc.)
├── constants/         # app-wide constants/utils used by 2+ features
├── pages/
│   └── profile/
│       ├── hooks/            # feature-only hooks
│       ├── common/           # feature-only shared sub-components
│       ├── Profile.tsx
│       ├── profileConstants.ts   # (if needed)
│       ├── profileUtils.ts       # (if needed)
│       └── types.ts              # (if needed)
```

- A component/hook/util used by exactly one feature lives inside that
  feature's folder. Move it to `common/` or `constants/` only once a second
  feature needs it.
- `index.ts` barrel files are fine for cleaner imports, but keep them
  feature-scoped — don't re-export everything from one app-wide barrel, and
  avoid wildcard (`import * as X`) imports (this part _is_ lint-enforced).

### Types vs. interfaces

- Component props: `interface`.
- Everything else (hook return values, utility types, API shapes): `type`.
- Use `Pick<>`/`Omit<>` to derive subsets rather than redeclaring fields.

ESLint can't tell "this type is props" from "this type is something else",
so this one's on code review.

### Component structure and ordering

Inside a component, keep this order:

1. Hooks (`useState`, `useParams`, data hooks, ...)
2. Plain variables / destructuring
3. `useEffect` calls
4. Functions (event handlers, derived values)
5. Early returns for loading/error states
6. `return (...)` — the JSX

Keep components under ~150 lines (lint warns) and split out a smaller
component when one is doing more than one job, or its JSX is nesting deeply.

### Comments

Favor a better name over a comment. When you do need one:

- `/** @todo ... */` (JSDoc form) for future work — not `// @todo`.
- `/** ... @see <link> */` when a workaround needs an external reference.
- Inline `//` only for non-obvious workarounds (browser quirks, API
  limitations) placed directly above the line — explain _why_, not _what_.

This matches the project default already in place: no comments unless the
_why_ isn't obvious from the code.

## References

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [gts](https://github.com/google/gts) — Google's reference ESLint/Prettier config
- [react-typescript-style-guide.com](https://react-typescript-style-guide.com)
