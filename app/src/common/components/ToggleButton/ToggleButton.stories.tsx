import type {Meta, StoryObj} from '@storybook/react-vite';

import {ToggleButton} from './ToggleButton.tsx';

const meta = {
  title: 'Common/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Toggle',
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const PressedByDefault: Story = {
  args: {
    children: 'Toggle',
    defaultPressed: true,
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
    children: 'Toggle',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Toggle',
    disabled: true,
  },
};
