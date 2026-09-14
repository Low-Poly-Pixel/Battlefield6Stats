import {BARREL_MAP, GRIP_MAP, LASER_MAP, MUZZLE_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponAmmo} from '@/data/ammo.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

// Hip-fire spread is a levelled stat resolved the same way as Moving ADS
// Accuracy, but against its own 18-row table (indices 0-10 are the ordinary
// run; 11-17 only get reached via the shotgun ammo shift below)
const HIP_SPREAD_STAND_TIERS = [
  7.4, 4.848, 3.352, 2.432, 1.804, 1.352, 1.024, 0.784, 0.608, 0.476, 0.38, 2.16, 1.444, 0.972,
  0.656, 0.444, 0.304, 0.208,
];
const HIP_SPREAD_MOVE_TIERS = [
  9.25, 6.06, 4.19, 3.04, 2.255, 1.69, 1.28, 0.98, 0.76, 0.595, 0.475, 2.7, 1.805, 1.215, 0.82,
  0.555, 0.38, 0.26,
];

const getHipSpreadTierIndex = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon ? HIP_SPREAD_STAND_TIERS.indexOf(weapon.spread.hipStand[0]) : -1;
};

const getHipSpreadShift = (weaponId: string, selections: AttachmentSelections): number => {
  const barrelMod =
    optionStat(BARREL_MAP, selections.barrel, barrel => barrel.hipSpreadTierMod) ?? 0;
  const muzzleMod =
    optionStat(MUZZLE_MAP, selections.muzzle, muzzle => muzzle.hipSpreadTierMod) ?? 0;
  const gripMod = optionStat(GRIP_MAP, selections.underbarrel, grip => grip.hipSpreadTierMod) ?? 0;
  const laserMod = optionStat(LASER_MAP, selections.laser, laser => laser.hipSpreadTierMod) ?? 0;
  const ammoMod = weaponAmmo[weaponId]?.effectOverrides?.[selections.ammo]?.hipSpreadTierMod ?? 0;

  return barrelMod + muzzleMod + gripMod + laserMod + ammoMod;
};

const getHipSpreadTierValue = (
  weaponId: string,
  selections: AttachmentSelections,
  tiers: number[],
): number => {
  const baseIndex = getHipSpreadTierIndex(weaponId);

  if (baseIndex === -1) return 0;

  const tierIndex = Math.min(
    Math.max(baseIndex - getHipSpreadShift(weaponId, selections), 0),
    tiers.length - 1,
  );

  return tiers[tierIndex];
};

export const getHipSpreadStanding = (weaponId: string, selections: AttachmentSelections): number =>
  getHipSpreadTierValue(weaponId, selections, HIP_SPREAD_STAND_TIERS);

export const getBaseHipSpreadStanding = (weaponId: string): number =>
  getHipSpreadStanding(weaponId, getDefaultSelections(weaponId));

export const getHipSpreadMoving = (weaponId: string, selections: AttachmentSelections): number =>
  getHipSpreadTierValue(weaponId, selections, HIP_SPREAD_MOVE_TIERS);

export const getBaseHipSpreadMoving = (weaponId: string): number =>
  getHipSpreadMoving(weaponId, getDefaultSelections(weaponId));
