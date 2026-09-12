import type {Meta, StoryObj} from '@storybook/react-vite';

import type {TabEntry} from '../common/components/Tabs/Tabs.tsx';
import {Tabs} from '../common/components/Tabs/Tabs.tsx';

const meta = {
  title: 'Examples/Weapon Category Tabs',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const classIcon = (name: string) => (
  <img src={`/img/classes/${name}.svg`} alt="" style={{width: '100%', height: '100%'}} />
);

const items: TabEntry[] = [
  {type: 'tab', value: 'assault-rifle', label: 'Assault Rifle', icon: classIcon('assault')},
  {type: 'tab', value: 'smg', label: 'SMG', icon: classIcon('engineer')},
  {type: 'tab', value: 'lmg', label: 'LMG', icon: classIcon('support')},
  {type: 'tab', value: 'sniper-rifle', label: 'Sniper Rifle', icon: classIcon('recon')},
  {type: 'divider'},
  {type: 'tab', value: 'carbine', label: 'Carbine'},
  {type: 'tab', value: 'dmr', label: 'DMR'},
  {type: 'tab', value: 'shotgun', label: 'Shotgun'},
  {type: 'divider'},
  {type: 'tab', value: 'secondary', label: 'Secondary'},
];

export const Vertical: Story = {
  render: () => <Tabs title="Weapons" items={items} orientation="vertical" defaultValue="assault-rifle" />,
};

export const Horizontal: Story = {
  render: () => <Tabs title="Weapons" items={items} orientation="horizontal" defaultValue="assault-rifle" />,
};
