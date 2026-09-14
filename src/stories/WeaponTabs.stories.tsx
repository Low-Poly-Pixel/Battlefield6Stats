import type {Meta, StoryObj} from '@storybook/react-vite';

import {Tabs} from '@/common/components/Tabs/Tabs.tsx';
import {weaponCategoryTabs} from '@/common/data/weaponCategoryTabs.tsx';

const meta = {
  title: 'Examples/Weapon Category Tabs',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  render: () => <Tabs items={weaponCategoryTabs} columns={2} defaultValue="assaultRifle" />,
};
