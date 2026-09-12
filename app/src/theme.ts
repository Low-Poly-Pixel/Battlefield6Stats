import {createTheme} from '@mantine/core';

const sans = "'Barlow', system-ui, 'Segoe UI', Roboto, sans-serif";
const heading = "'Barlow Condensed', system-ui, 'Segoe UI', Roboto, sans-serif";

declare module '@mantine/core' {
  interface MantineThemeOther {
    colorBg: string;
    colorSurface: string;
    colorSurfaceRaised: string;
    colorBorder: string;
    colorBorderStrong: string;
    colorText: string;
    colorTextMuted: string;
    colorTextHeading: string;
    colorInteractiveHighEmphasisBg: string;
    colorInteractiveHighEmphasisText: string;
    colorInteractiveLowEmphasisBorder: string;
    colorInteractiveLowEmphasisText: string;
    colorSurfaceInteractiveRest: string;
    colorSurfaceInteractiveHover: string;
    colorFocusRing: string;
    colorStatUp: string;
    colorStatDown: string;
    colorStatNeutral: string;
    colorStatTrack: string;
    colorStatBaselineMarker: string;
  }
}

export const theme = createTheme({
  fontFamily: sans,
  fontFamilyMonospace: 'ui-monospace, Consolas, monospace',
  headings: {
    fontFamily: heading,
    fontWeight: '700',
  },
  other: {
    colorBg: '#0a0a0d',
    colorSurface: '#16171d',
    colorSurfaceRaised: '#1e2028',
    colorBorder: 'rgb(255 255 255 / 14%)',
    colorBorderStrong: 'rgb(255 255 255 / 32%)',
    colorText: '#c7c9d1',
    colorTextMuted: '#8b8d97',
    colorTextHeading: '#f4f5f7',
    // Sampled directly from the BF6 reference screenshot (CARBINE's selected-tab fill).
    colorInteractiveHighEmphasisBg: '#c2d1da',
    colorInteractiveHighEmphasisText: '#0a0a0d',
    colorInteractiveLowEmphasisBorder: 'rgb(244 245 247 / 45%)',
    colorInteractiveLowEmphasisText: '#f4f5f7',
    // Sampled from EQUIP/FIRING RANGE (rest) and CUSTOMIZE (hover, caught mid-hover in the reference).
    colorSurfaceInteractiveRest: '#131618',
    colorSurfaceInteractiveHover: '#292e31',
    colorFocusRing: '#f4f5f7',
    colorStatUp: '#34d399',
    colorStatDown: '#f87171',
    colorStatNeutral: '#8b8d97',
    colorStatTrack: 'rgb(255 255 255 / 12%)',
    colorStatBaselineMarker: '#f4f5f7',
  },
});
