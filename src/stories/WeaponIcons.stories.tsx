import type {Meta, StoryObj} from '@storybook/react-vite';

import {HardwareCard} from '@/common/components/HardwareCard/HardwareCard.tsx';
import {getWeaponImageSrc, weapons} from '@/common/data/attachments/weapons';

const meta = {
  title: 'Assets/Weapon Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllWeaponIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16,
      }}
    >
      {weapons.map(weapon => (
        <HardwareCard key={weapon.id} title={weapon.name} image={getWeaponImageSrc(weapon.id)} />
      ))}
    </div>
  ),
};
