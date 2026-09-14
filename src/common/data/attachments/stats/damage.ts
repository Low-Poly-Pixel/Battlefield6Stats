import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponAmmo} from '@/data/ammo.ts';
import {weapons} from '@/data/weapons.ts';

export const getDamage = (weaponId: string, selections: AttachmentSelections): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const override = weaponAmmo[weaponId]?.projectileOverrides?.[selections.ammo]?.dmg;

  return Math.round((override ?? weapon?.dmg)?.[0]?.d ?? 0);
};

export const getBaseDamage = (weaponId: string): number =>
  getDamage(weaponId, getDefaultSelections(weaponId));
