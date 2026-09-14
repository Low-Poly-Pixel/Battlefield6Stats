import {BARREL_MAP, GRIP_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

const ADS_SPEED_TIERS = [500, 433.334, 366.667, 300, 250, 200, 166.667, 133.334];

export const getAdsTime = (
  weaponId: string,
  selections: AttachmentSelections,
  signatureWeapon = false,
): number => {
  const mag = weaponMagazines[weaponId];

  if (!mag) return 0;

  const barrelMod = optionStat(BARREL_MAP, selections.barrel, barrel => barrel.adsTimeTierMod) ?? 0;
  const gripMod = optionStat(GRIP_MAP, selections.underbarrel, grip => grip.adsTimeTierMod) ?? 0;
  const magShift = mag.mags[selections.magazine].adsTimeTierShift;
  const weapon = weapons.find(item => item.id === weaponId);
  const signatureMod = signatureWeapon && weapon?.class === 'lmg' ? 1 : 0;

  const tierIndex = Math.min(
    Math.max(mag.defAds - magShift + gripMod + barrelMod + signatureMod, 0),
    ADS_SPEED_TIERS.length - 1,
  );

  return Math.round(ADS_SPEED_TIERS[tierIndex]);
};

export const getBaseAdsTime = (weaponId: string): number =>
  getAdsTime(weaponId, getDefaultSelections(weaponId));
