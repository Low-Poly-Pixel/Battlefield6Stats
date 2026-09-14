import type {Meta, StoryObj} from '@storybook/react-vite';

import {LineGraph} from './LineGraph.tsx';

const data = [
  {range: 0, damage: 35},
  {range: 25, damage: 30},
  {range: 50, damage: 25},
  {range: 75, damage: 20},
  {range: 100, damage: 20},
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

export const PistolMode: Story = {
  args: {
    label: 'Damage Falloff',
    mode: 'pistol',
    data: [
      {range: 0, damage: 50},
      {range: 25, damage: 20},
      {range: 50, damage: 20},
      {range: 75, damage: 10},
      {range: 100, damage: 10},
    ],
  },
};

export const DMRMode: Story = {
  args: {
    label: 'Damage Falloff',
    mode: 'dmr',
    data: [
      {range: 0, damage: 65},
      {range: 25, damage: 55},
      {range: 50, damage: 45},
      {range: 75, damage: 40},
      {range: 100, damage: 40},
    ],
  },
};

export const SniperMode: Story = {
  args: {
    label: 'Damage Falloff',
    mode: 'sniper',
    data: [
      {range: 0, damage: 80},
      {range: 25, damage: 80},
      {range: 50, damage: 100},
      {range: 75, damage: 120},
      {range: 100, damage: 150},
      {range: 150, damage: 150},
      {range: 200, damage: 100},
    ],
  },
};
