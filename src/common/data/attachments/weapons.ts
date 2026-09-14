import type {WeaponClass} from '@/common/components/HardwareCard/HardwareCard.tsx';
import {type Weapon, type WeaponClassName, weapons} from '@/data/weapons.ts';

export type {Weapon};
export {weapons};

const classWeaponByClass: Partial<Record<WeaponClassName, WeaponClass>> = {
  assaultRifle: 'assault',
  smg: 'engineer',
  lmg: 'support',
  sniperRifle: 'recon',
};

export const weaponClassIcon = (cls: WeaponClassName): WeaponClass | undefined =>
  classWeaponByClass[cls];

export type WeaponCategoryTab = WeaponClassName;

export const getWeaponsForTab = (tabValue: WeaponCategoryTab): Weapon[] =>
  weapons.filter(weapon => weapon.class === tabValue);

export const getWeaponImageSrc = (weaponId: string) =>
  `${import.meta.env.BASE_URL}img/weapons/${weaponId}.avif`;
