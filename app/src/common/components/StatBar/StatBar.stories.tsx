import type {Meta, StoryObj} from '@storybook/react-vite';

import {StatBar} from './StatBar.tsx';

const meta = {
  title: 'Common/StatBar',
  component: StatBar,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Hipfire',
    value: 54,
    baseline: 65,
    min: 0,
    max: 100,
  },
  decorators: [
    Story => (
      <div style={{width: 320}}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decrease: Story = {
  args: {
    label: 'Decrease',
    value: 25,
    baseline: 50,
  },
};

export const Increase: Story = {
  args: {
    label: 'Increase',
    value: 75,
    baseline: 50,
  },
};

export const Neutral: Story = {
  args: {
    label: 'Neutral',
    value: 50,
    baseline: 50,
  },
};

export const CustomRange: Story = {
  args: {
    label: 'Custom Range',
    value: 26,
    baseline: 32,
    min: 0,
    max: 50,
  },
};
