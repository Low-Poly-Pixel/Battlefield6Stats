import {type Weapon, type WeaponClassName, weapons} from '@/data/weapons.ts';

export type {Weapon};
export {weapons};

export type WeaponClass = 'assault' | 'engineer' | 'support' | 'recon';

export const CLASS_ICON_SRC: Record<WeaponClass, string> = {
  assault: `${import.meta.env.BASE_URL}img/classes/assault.svg`,
  engineer: `${import.meta.env.BASE_URL}img/classes/engineer.svg`,
  support: `${import.meta.env.BASE_URL}img/classes/support.svg`,
  recon: `${import.meta.env.BASE_URL}img/classes/recon.svg`,
};

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
