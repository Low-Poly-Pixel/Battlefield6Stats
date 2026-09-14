import type {Meta, StoryObj} from '@storybook/react-vite';

import {LineGraph} from './LineGraph.tsx';

const data = [
  {range: 0, damage: 26.05},
  {range: 21, damage: 26.05},
  {range: 21, damage: 20.67},
  {range: 75, damage: 20.67},
  {range: 75, damage: 17.13},
];

const meta = {
  title: 'Common/LineGraph',
  component: LineGraph,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Damage Falloff',
    data,
  },
} satisfies Meta<typeof LineGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Revolvers like the M44 hit well above the old fixed pistol-mode ceiling.
export const HighDamageSidearm: Story = {
  args: {
    label: 'Damage Falloff',
    data: [
      {range: 0, damage: 66.7},
      {range: 9, damage: 66.7},
      {range: 9, damage: 59.9},
      {range: 21, damage: 59.9},
      {range: 21, damage: 33.4},
      {range: 75, damage: 33.4},
      {range: 75, damage: 25},
    ],
  },
};

// Shotguns record per-pellet damage, an order of magnitude below rifles.
export const PerPelletShotgun: Story = {
  args: {
    label: 'Damage Falloff',
    data: [
      {range: 0, damage: 8.4},
      {range: 8, damage: 8.4},
      {range: 9, damage: 7.2},
      {range: 15, damage: 7.2},
      {range: 16, damage: 5.6},
      {range: 30, damage: 5.6},
      {range: 31, damage: 3.8},
    ],
  },
};

// Bolt-action snipers have a real "sweet spot" mechanic -- damage rises with
// range before falling off -- and some have no recorded damage below their
// first breakpoint (the line simply starts there rather than at range 0).
export const SniperSweetSpot: Story = {
  args: {
    label: 'Damage Falloff',
    data: [
      {range: 54, damage: 80},
      {range: 75, damage: 100},
      {range: 100, damage: 100},
      {range: 133, damage: 62},
    ],
  },
};
