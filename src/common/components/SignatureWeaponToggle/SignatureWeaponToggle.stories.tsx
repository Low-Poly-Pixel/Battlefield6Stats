import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';

import {SignatureWeaponToggle} from './SignatureWeaponToggle.tsx';

const meta = {
  title: 'Common/SignatureWeaponToggle',
  component: SignatureWeaponToggle,
  parameters: {
    layout: 'centered',
  },
  args: {
    weaponClass: 'assaultRifle',
    checked: false,
    onChange: () => {},
  },
  render: args => {
    const [checked, setChecked] = useState(args.checked);

    return (
      <div style={{width: '20rem'}}>
        <SignatureWeaponToggle {...args} checked={checked} onChange={setChecked} />
      </div>
    );
  },
} satisfies Meta<typeof SignatureWeaponToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AssaultRifle: Story = {
  args: {
    weaponClass: 'assaultRifle',
  },
};

export const Smg: Story = {
  args: {
    weaponClass: 'smg',
  },
};

export const Lmg: Story = {
  args: {
    weaponClass: 'lmg',
  },
};

export const SniperRifle: Story = {
  args: {
    weaponClass: 'sniperRifle',
  },
};

export const Checked: Story = {
  args: {
    weaponClass: 'assaultRifle',
    checked: true,
  },
};

export const IneligibleClass: Story = {
  args: {
    weaponClass: 'shotgun',
  },
};
