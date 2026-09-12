import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';

import {HardwareCard} from './HardwareCard.tsx';

const meta = {
  title: 'Common/HardwareCard',
  component: HardwareCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Title',
    image: '/img/weapons/hk433.avif',
  },
} satisfies Meta<typeof HardwareCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{width: 220}}>
      <HardwareCard {...args} />
    </div>
  ),
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: args => (
    <div style={{width: 220}}>
      <HardwareCard {...args} />
    </div>
  ),
};

export const WithClassIcon: Story = {
  args: {
    weaponClass: 'assault',
  },
  render: args => (
    <div style={{width: 220}}>
      <HardwareCard {...args} />
    </div>
  ),
};

export const Selectable: Story = {
  render: args => {
    const [selected, setSelected] = useState(false);

    return (
      <div style={{width: 220}}>
        <HardwareCard
          {...args}
          selected={selected}
          onSelect={() => {
            setSelected(current => !current);
          }}
        />
      </div>
    );
  },
};
