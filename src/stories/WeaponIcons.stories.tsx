import type {Meta, StoryObj} from '@storybook/react-vite';

import {HardwareCard} from '../common/components/HardwareCard/HardwareCard.tsx';

const WEAPON_NAMES = [
  '185ksk',
  '590a1',
  '6p67',
  'ace32',
  'ak205',
  'apc10',
  'apdw',
  'aradmr',
  'bren3',
  'deserttechhti',
  'dp12',
  'ef88',
  'fiveseven',
  'g22',
  'g36',
  'g3a4',
  'hk417a2',
  'hk433',
  'l115a3',
  'l85a3',
  'm1014',
  'm16a3',
  'm18',
  'm2010esr',
  'm240l',
  'm250',
  'm27iar',
  'm39emr',
  'm45a1',
  'm4a1',
  'm60e6',
  'mg4k',
  'mg5',
  'minifix',
  'minimi',
  'mp5mli',
  'mp7a2',
  'mpx',
  'mrad',
  'msbsgrotb',
  'msbsgrotcps',
  'p90',
  'pp19',
  'qbz192',
  'raginghunter',
  'rpk74m',
  'rpkm',
  'scarl',
  'scarsc',
  'scorpionevo3',
  'sig553r',
  'skorpion',
  'sv98m',
  'svch',
  'svdm',
  'tavor7',
  'trr8',
  'ultimax',
  'ump40',
  'vector',
  'vhs2',
  'vssm',
  'xm7',
];

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
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16}}>
      {WEAPON_NAMES.map(name => (
        <HardwareCard key={name} title={name} image={`/img/weapons/${name}.avif`} />
      ))}
    </div>
  ),
};
