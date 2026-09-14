import {BARREL_MAP} from '@/common/data/attachments/catalogs.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {subsonicVelocityMpsByWeapon} from '@/data/balanceTables.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

const SUBSONIC_AMMO_IDS = new Set(['subsonic', 'subsonicHp', 'subsonicPen']);

const getRawBulletVelocity = (weaponId: string): number =>
  weapons.find(item => item.id === weaponId)?.bulletVel ?? 0;

export const getBaseMuzzleVelocity = (weaponId: string): number =>
  Math.floor(getRawBulletVelocity(weaponId));

// Subsonic ammo overrides the weapon's own velocity with a flat measured
// value (see subsonicVelocityMpsByWeapon), but the barrel's velMult still
// multiplies on top of that override the same way it does normally.
export const getMuzzleVelocity = (weaponId: string, selections: AttachmentSelections): number => {
  const baseVelocity = SUBSONIC_AMMO_IDS.has(selections.ammo)
    ? (subsonicVelocityMpsByWeapon[weaponId] ?? getRawBulletVelocity(weaponId))
    : getRawBulletVelocity(weaponId);
  const velMult = optionStat(BARREL_MAP, selections.barrel, barrel => barrel.velMult) ?? 1;

  return Math.floor(baseVelocity * velMult);
};
