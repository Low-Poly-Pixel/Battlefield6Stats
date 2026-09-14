import type {Meta, StoryObj} from '@storybook/react-vite';

import {StatItem} from './StatItem.tsx';

const meta = {
  title: 'Common/StatItem',
  component: StatItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Moving Accuracy',
    value: 0.32,
    baseline: 0.32,
    min: 0,
    max: 0.68,
    unit: '°',
  },
  decorators: [
    Story => (
      <div style={{width: 220}}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Increase: Story = {
  args: {
    value: 0.43,
    baseline: 0.32,
  },
};

export const Decrease: Story = {
  args: {
    value: 0.22,
    baseline: 0.32,
  },
};

// Moving Accuracy is inverted: a lower angle is a tighter, better spread, so
// equipping a Light barrel or a Blue/Violet laser (value drops below
// baseline) should read as an improvement, not a regression.
export const InvertedImprovement: Story = {
  args: {
    value: 0.22,
    baseline: 0.32,
    invert: true,
  },
};

export const InvertedRegression: Story = {
  args: {
    value: 0.43,
    baseline: 0.32,
    invert: true,
  },
};

// Phosphor "Crosshair" icon (regular weight), inlined as a raw SVG so this
// story doesn't need an icon library dependency for one glyph:
// https://phosphoricons.com/?q=crosshair
const CrosshairIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
    style={{display: 'block', width: '100%', height: '100%'}}
  >
    <path d="M232,120H219.65A92.12,92.12,0,0,0,136,36.35V24a8,8,0,0,0-16,0V36.35A92.12,92.12,0,0,0,36.35,120H24a8,8,0,0,0,0,16H36.35A92.12,92.12,0,0,0,120,219.65V232a8,8,0,0,0,16,0V219.65A92.12,92.12,0,0,0,219.65,136H232a8,8,0,0,0,0-16ZM128,204a76,76,0,1,1,76-76A76.08,76.08,0,0,1,128,204Zm12-76a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z" />
  </svg>
);

export const WithIcon: Story = {
  args: {
    icon: <CrosshairIcon />,
  },
};
