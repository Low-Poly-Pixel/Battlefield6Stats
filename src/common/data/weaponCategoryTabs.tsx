import type {TabEntry} from '@/common/components/Tabs/Tabs.tsx';

const classIcon = (name: string) => (
  <img
    src={`${import.meta.env.BASE_URL}img/classes/${name}.svg`}
    alt=""
    style={{width: '100%', height: '100%'}}
  />
);

export const weaponCategoryTabs: TabEntry[] = [
  {type: 'tab', value: 'assaultRifle', label: 'AR', icon: classIcon('assault')},
  {type: 'tab', value: 'carbine', label: 'Carbine'},
  {type: 'tab', value: 'smg', label: 'SMG', icon: classIcon('engineer')},
  {type: 'tab', value: 'dmr', label: 'DMR'},
  {type: 'tab', value: 'lmg', label: 'LMG', icon: classIcon('support')},
  {type: 'tab', value: 'shotgun', label: 'Shotgun'},
  {type: 'tab', value: 'sniperRifle', label: 'Sniper', icon: classIcon('recon')},
  {type: 'tab', value: 'sidearm', label: 'Pistol'},
];
