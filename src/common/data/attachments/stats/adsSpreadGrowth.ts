import {BARREL_MAP} from '@/common/data/attachments/catalogs.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

const getRawAdsSpreadGrowth = (weaponId: string): number =>
  weapons.find(item => item.id === weaponId)?.spreadDyn.ads.inc ?? 0;

export const getBaseAdsSpreadGrowth = (weaponId: string): number =>
  Math.round(getRawAdsSpreadGrowth(weaponId) * 1000) / 1000;

export const getAdsSpreadGrowth = (weaponId: string, barrelId: string): number => {
  const baseGrowth = getRawAdsSpreadGrowth(weaponId);
  const incMult = optionStat(BARREL_MAP, barrelId, barrel => barrel.adsSpreadIncMult) ?? 1;

  return Math.round(baseGrowth * incMult * 1000) / 1000;
};
