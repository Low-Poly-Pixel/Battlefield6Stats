## Enforced by tooling (for reference)

- TypeScript strict mode + `typescript-eslint`'s `strictTypeChecked` preset.
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
  rules via `gts`'s config: single quotes, semicolons, `eqeqeq`, no `var`, etc.
- **Arrow functions everywhere, including components** (`const Button = () =>
  {}`, not `function Button() {}`), via `eslint-plugin-prefer-arrow-functions`.
  There's no technical "right answer" here — React itself doesn't care, and
  it's a team-convention call — but this repo picked arrow for consistency.
  The "unless there's a good reason" exceptions are exactly the cases the
  rule itself declines to touch, because converting them would change
  behavior: functions that use `this`, functions that use `arguments`,
  generator functions, and functions that rely on hoisting (e.g. a helper
  component referenced before its own definition further down the file). If
  ESLint doesn't flag it, it's arrow; if it does, that's a bug to fix, not a
  reason to disable the rule.

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

### Prop ordering

Within a `Props` interface (and its destructured parameters), required
props come first, optional (`?`) ones last. TypeScript doesn't enforce
this for object types — unlike function parameters, props are accessed
by name, not position — so it's a readability convention, not a
type-safety one: it puts what a consumer _must_ supply before what they
can opt into.

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

### Documenting shared/styled components

Every component under `src/common/components/` (the shared design-system
layer, built on Mantine) ships as two co-located files — no hand-written
`.mdx`:

```
Button/
├── Button.tsx           # the component
└── Button.stories.tsx   # CSF3 stories — also its usage examples
```

These components are simple enough to be self-describing; code and types
are the documentation, not prose written about the code.

- **No mandatory per-prop JSDoc.** The "no comments unless the why isn't
  obvious" rule applies here too — a well-named prop doesn't need a doc
  comment restating its type. Storybook's autodocs still generates the
  ArgTypes/Controls table straight from the TypeScript types (names,
  types, required/optional) with no manual upkeep; it just won't show a
  description column. Add a one-line comment only when a prop's behavior
  genuinely isn't obvious from its name and type.
- **Stories are the usage examples.** Every meaningful way to use the
  component (variants, states, edge cases) gets its own named story rather
  than a separate "usage" write-up. `tags: ['autodocs']` (set project-wide
  in `.storybook/preview.tsx`) turns that into a full docs page for free —
  title, the args table, and a live Canvas of the default story that
  anyone can already plug custom values into, with zero extra files.
- **No `.mdx` file.** Design rationale, do's/don'ts, and WCAG notes go in
  the PR description or a commit message if they need to exist in writing
  at all — not in a permanent prose file that has to be kept in sync with
  the component by hand.
- Run `bun run storybook` to review docs pages and check the Accessibility
  panel (`@storybook/addon-a11y`) for violations before considering a
  component done — this project treats WCAG 2.1 AA as a hard constraint,
  not best-effort.

## References

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [gts](https://github.com/google/gts) — Google's reference ESLint/Prettier config
- [react-typescript-style-guide.com](https://react-typescript-style-guide.com)
