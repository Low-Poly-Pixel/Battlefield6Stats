import type {Meta, StoryObj} from '@storybook/react-vite';

import {StatBar} from '@/common/components/StatBar/StatBar.tsx';

import {Panel} from './Panel.tsx';

const meta = {
  title: 'Common/Panel',
  component: Panel,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Panel content goes here.',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    subtitle: undefined,
    children: 'Panel content goes here.',
  },
};

export const WithRichContent: Story = {
  args: {
    title: 'Comparison',
    subtitle: 'Multiple Stats',
    children: (
      <>
        <StatBar label="Metric A" value={28} baseline={24} min={0} max={40} />
        <StatBar label="Metric B" value={650} baseline={800} min={500} max={900} />
        <StatBar label="Metric C" value={70} baseline={70} min={0} max={100} />
      </>
    ),
  },
};
