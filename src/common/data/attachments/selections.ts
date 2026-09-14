import {weaponAmmo} from '@/data/ammo.ts';
import {weaponAttachments, weaponErgoAvailability, weaponMagazines} from '@/data/attachments.ts';
import {weapons} from '@/data/weapons.ts';

import {ATTACHMENT_DEF_MAP} from './attachments.ts';
import type {AttachmentKey, AttachmentSelections, WeaponContext} from './types.ts';

const defaultFor = (key: AttachmentKey, weapon: WeaponContext | null): string | null =>
  weapon ? ATTACHMENT_DEF_MAP.get(key)!.getDefault(weapon) : null;

export const getWeaponContext = (weaponId: string): WeaponContext | null => {
  const atts = weaponAttachments[weaponId];
  const mag = weaponMagazines[weaponId];
  const ammoEntry = weaponAmmo[weaponId];

  if (!atts || !mag || !ammoEntry) return null;

  return {
    weaponId,
    isSidearm: weapons.find(weapon => weapon.id === weaponId)?.class === 'sidearm',
    atts,
    ergo: weaponErgoAvailability[weaponId],
    mag,
    ammoEntry,
  };
};

export const getDefaultSelections = (weaponId: string): AttachmentSelections => {
  const weapon = getWeaponContext(weaponId);

  return {
    sight: defaultFor('sight', weapon) ?? 'stdOptic',
    muzzle: defaultFor('muzzle', weapon),
    barrel: defaultFor('barrel', weapon) ?? '',
    underbarrel: defaultFor('underbarrel', weapon),
    laser: defaultFor('laser', weapon),
    light: defaultFor('light', weapon),
    ergonomics: defaultFor('ergonomics', weapon),
    magazine: defaultFor('magazine', weapon) ?? '',
    ammo: defaultFor('ammo', weapon) ?? '',
  };
};

export const getPointBudget = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon?.class === 'sidearm' ? 60 : 100;
};
