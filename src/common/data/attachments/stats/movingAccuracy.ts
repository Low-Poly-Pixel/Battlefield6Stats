import {BARREL_MAP, GRIP_MAP, LASER_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

// Moving-ADS accuracy is also a levelled stat, resolved via a straight sum
// (no special sign flip, unlike ADS time's magazine field)
const MOVING_ACCURACY_TIERS = [0.68, 0.55, 0.43, 0.32, 0.22, 0.13, 0.05];

const getMovingAccuracyTierIndex = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon ? MOVING_ACCURACY_TIERS.indexOf(weapon.spread.adsMove[0]) : -1;
};

export const getMovingAccuracy = (weaponId: string, selections: AttachmentSelections): number => {
  const mag = weaponMagazines[weaponId];
  const baseIndex = getMovingAccuracyTierIndex(weaponId);

  if (baseIndex === -1 || !mag) return 0;

  const barrelMod =
    optionStat(BARREL_MAP, selections.barrel, barrel => barrel.movingAdsSpreadTierMod) ?? 0;
  const gripMod =
    optionStat(GRIP_MAP, selections.underbarrel, grip => grip.movingAdsSpreadTierMod) ?? 0;
  const laserMod =
    optionStat(LASER_MAP, selections.laser, laser => laser.movingAdsSpreadTierMod) ?? 0;
  const magMod = mag.mags[selections.magazine].movingAdsSpreadTierMod ?? 0;

  const tierIndex = Math.min(
    Math.max(baseIndex + barrelMod + gripMod + laserMod + magMod, 0),
    MOVING_ACCURACY_TIERS.length - 1,
  );

  return MOVING_ACCURACY_TIERS[tierIndex];
};

export const getBaseMovingAccuracy = (weaponId: string): number =>
  getMovingAccuracy(weaponId, getDefaultSelections(weaponId));
