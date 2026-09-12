import type {Meta, StoryObj} from '@storybook/react-vite';

import type {TabEntry} from './Tabs.tsx';
import {Tabs} from './Tabs.tsx';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: TabEntry[] = [
  {type: 'tab', value: 'tab-1', label: 'Tab 1'},
  {type: 'tab', value: 'tab-2', label: 'Tab 2'},
  {type: 'tab', value: 'tab-3', label: 'Tab 3'},
  {type: 'divider'},
  {type: 'tab', value: 'tab-4', label: 'Tab 4'},
];

export const Default: Story = {
  args: {
    items,
    defaultValue: 'tab-1',
  },
};

export const WithTitle: Story = {
  args: {
    items,
    title: 'Title',
    defaultValue: 'tab-1',
  },
};

export const Vertical: Story = {
  args: {
    items,
    title: 'Title',
    orientation: 'vertical',
    defaultValue: 'tab-1',
  },
};

// Phosphor "Info" icon (regular weight), inlined as a raw SVG so this story
// doesn't need an icon library dependency for one glyph:
// https://phosphoricons.com/?q=info
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
    style={{display: 'block', width: '100%', height: '100%'}}
  >
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
  </svg>
);

const itemsWithIcons: TabEntry[] = [
  {type: 'tab', value: 'tab-1', label: 'Tab 1', icon: <InfoIcon />},
  {type: 'tab', value: 'tab-2', label: 'Tab 2', icon: <InfoIcon />},
  {type: 'divider'},
  {type: 'tab', value: 'tab-3', label: 'Tab 3'},
];

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    title: 'Title',
    defaultValue: 'tab-1',
  },
};
