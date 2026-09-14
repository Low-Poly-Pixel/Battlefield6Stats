import type {Meta, StoryObj} from '@storybook/react-vite';

import {Button} from './Button.tsx';

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
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

export const WithIcon: Story = {
  args: {
    icon: <InfoIcon />,
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const Destructive: Story = {
  args: {
    children: 'Reset to Defaults',
    destructive: true,
  },
};
