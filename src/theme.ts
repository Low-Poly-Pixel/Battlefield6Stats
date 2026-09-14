import type {MantineThemeOverride} from '@mantine/core';
import {Card, colorsTuple, Container, createTheme, Paper, rem, Select} from '@mantine/core';

const sans = "'Barlow', system-ui, 'Segoe UI', Roboto, sans-serif";
const heading = "'Barlow Condensed', system-ui, 'Segoe UI', Roboto, sans-serif";

const zinc = colorsTuple([
  '#fafafa',
  '#f4f4f5',
  '#e4e4e7',
  '#d4d4d8',
  '#a1a1aa',
  '#52525b',
  '#3f3f46',
  '#27272a',
  '#18181b',
  '#09090b',
]);

// Accent ramp built from #ff3c00 — the orange/red used on the official
// Battlefield 6 site's promo banner and CTA buttons (ea.com/games/battlefield/
// battlefield-6/buy) — via @mantine/colors-generator. Index 6 is the exact
// sampled hex.
const accentRed = colorsTuple([
  '#ffede4',
  '#ffdacd',
  '#ffb39b',
  '#ff8964',
  '#fe6637',
  '#fe4f19',
  '#ff3c00',
  '#e43400',
  '#cb2c00',
  '#b22100',
]);

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem('200px'),
  xs: rem('300px'),
  sm: rem('400px'),
  md: rem('500px'),
  lg: rem('600px'),
  xl: rem('1400px'),
  xxl: rem('1600px'),
};

export const mantineTheme: MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
  fontFamily: sans,
  fontFamilyMonospace: 'ui-monospace, Consolas, monospace',
  headings: {
    fontFamily: heading,
    fontWeight: '700',
  },
  colors: {
    dark: zinc,
    red: accentRed,
  },
  primaryShade: 6,
  fontSizes: {
    xs: rem('12px'),
    sm: rem('14px'),
    md: rem('16px'),
    lg: rem('18px'),
    xl: rem('20px'),
    '2xl': rem('24px'),
    '3xl': rem('30px'),
    '4xl': rem('36px'),
    '5xl': rem('48px'),
  },
  spacing: {
    '3xs': rem('4px'),
    '2xs': rem('8px'),
    xs: rem('10px'),
    sm: rem('12px'),
    md: rem('16px'),
    lg: rem('20px'),
    xl: rem('24px'),
    '2xl': rem('28px'),
    '3xl': rem('32px'),
  },
  primaryColor: 'red',
  components: {
    Container: Container.extend({
      vars: (_, {size, fluid}) => {
        let containerSize: string;

        if (fluid) {
          containerSize = '100%';
        } else if (size !== undefined && size in CONTAINER_SIZES) {
          containerSize = CONTAINER_SIZES[size];
        } else {
          containerSize = rem(size);
        }

        return {
          root: {
            '--container-size': containerSize,
          },
        };
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        p: 'md',
        shadow: 'xl',
        radius: 'md',
        withBorder: true,
      },
    }),

    Card: Card.extend({
      defaultProps: {
        p: 'xl',
        shadow: 'xl',
        radius: 'var(--mantine-radius-default)',
        withBorder: true,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        checkIconPosition: 'right',
      },
    }),
  },
  other: {
    style: 'mantine',
  },
});
