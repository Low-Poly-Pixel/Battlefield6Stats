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
layer, built on Mantine) ships as three co-located files:

```
Button/
├── Button.tsx           # the component
├── Button.stories.tsx   # CSF3 stories — also its usage examples
└── Button.mdx           # design rationale + accessibility notes
```

- **Props reference is JSDoc, not a hand-written table.** Add a doc comment
  to the component function and to each prop in its `Props` interface.
  Storybook's autodocs reads these straight from the TypeScript types into
  the generated ArgTypes/Controls tables, so the reference can't drift from
  the code the way a manually maintained table can. This is a deliberate
  exception to the "no comments unless the why isn't obvious" rule above —
  it applies only to this shared component layer, where the comment _is_
  the documentation artifact, not narration of the code.
- **Stories are the usage examples.** Every meaningful way to use the
  component (variants, states, edge cases) gets its own named story rather
  than a separate "usage" write-up — the autodocs page renders each story
  live in its Canvas.
- **The `.mdx` file is for what JSDoc can't carry**: why the component
  looks/behaves the way it does (tie back to the source reference, e.g. a
  screenshot or an agreed decision), explicit do's/don'ts, and which WCAG
  behaviors are guaranteed (keyboard nav, ARIA roles, focus handling).
- Run `bun run storybook` to review docs pages and check the Accessibility
  panel (`@storybook/addon-a11y`) for violations before considering a
  component done — this project treats WCAG 2.1 AA as a hard constraint,
  not best-effort.

## References

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [gts](https://github.com/google/gts) — Google's reference ESLint/Prettier config
- [react-typescript-style-guide.com](https://react-typescript-style-guide.com)
