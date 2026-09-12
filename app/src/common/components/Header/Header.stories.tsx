import type {Meta, StoryObj} from '@storybook/react-vite';

import {Header} from './Header.tsx';

const meta = {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
};
