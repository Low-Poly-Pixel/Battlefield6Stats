import type {CSSVariablesResolver} from '@mantine/core';

export const mantineCssVariableResolver: CSSVariablesResolver = () => ({
  variables: {
    //  variables that do not depend on color scheme
  },
  light: {
    // variables for light color scheme only
  },
  dark: {
    // Match shadcn/ui's zinc theme dark-mode semantics: background/card/popover
    // sit on zinc-950 (dark[9]), border/muted/secondary/accent on zinc-800
    // (dark[7]), muted-foreground on zinc-400 (dark[4]) — see
    // https://ui.shadcn.com/r/themes/zinc.json ("dark" block).
    '--mantine-color-body': 'var(--mantine-color-dark-9)',
    '--mantine-color-text': 'var(--mantine-color-dark-0)',
    '--mantine-color-dimmed': 'var(--mantine-color-dark-4)',
    '--mantine-color-placeholder': 'var(--mantine-color-dark-4)',
    '--mantine-color-default': 'var(--mantine-color-dark-7)',
    '--mantine-color-default-hover': 'var(--mantine-color-dark-6)',
    '--mantine-color-default-border': 'var(--mantine-color-dark-7)',
  },
});
