import type {Meta, StoryObj} from '@storybook/react-vite';

import {Header} from '../common/components/Header/Header.tsx';
import {Sidebar} from '../common/components/Sidebar/Sidebar.tsx';

const meta = {
  title: 'Examples/Layout',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const links = ['Overview', 'Section A', 'Section B', 'Section C'];

export const HeaderAndSidebar: Story = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Header title="Title" subtitle="Subtitle" />
      <div style={{display: 'flex', flex: 1, minHeight: 0}}>
        <Sidebar label="Sidebar">
          {links.map(link => (
            <a key={link} href={`#${link}`}>
              {link}
            </a>
          ))}
        </Sidebar>
        <div style={{flex: 1}} />
      </div>
    </div>
  ),
};
