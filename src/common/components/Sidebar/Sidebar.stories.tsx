import type {Meta, StoryObj} from '@storybook/react-vite';

import {Sidebar} from './Sidebar.tsx';

const meta = {
  title: 'Common/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Sidebar',
    children: null,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = ['Overview', 'Section A', 'Section B', 'Section C'];

export const Default: Story = {
  render: args => (
    <Sidebar {...args}>
      {links.map(link => (
        <a key={link} href={`#${link}`}>
          {link}
        </a>
      ))}
    </Sidebar>
  ),
};

export const CollapsedByDefault: Story = {
  args: {
    defaultOpen: false,
  },
  render: args => (
    <Sidebar {...args}>
      {links.map(link => (
        <a key={link} href={`#${link}`}>
          {link}
        </a>
      ))}
    </Sidebar>
  ),
};
