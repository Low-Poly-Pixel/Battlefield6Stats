import type {Meta, StoryObj} from '@storybook/react-vite';

import {Header} from '@/common/components/Header/Header.tsx';
import {Sidebar} from '@/common/components/Sidebar/Sidebar.tsx';
import {Tabs} from '@/common/components/Tabs/Tabs.tsx';
import {weaponCategoryTabs} from '@/common/data/weaponCategoryTabs.tsx';

const meta = {
  title: 'Examples/Layout',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderAndSidebar: Story = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Header title="Title" subtitle="Subtitle" />
      <div style={{display: 'flex', flex: 1, minHeight: 0}}>
        <Sidebar label="Sidebar">
          <Tabs items={weaponCategoryTabs} columns={2} defaultValue="assaultRifle" />
        </Sidebar>
        <div style={{flex: 1}} />
      </div>
    </div>
  ),
};
