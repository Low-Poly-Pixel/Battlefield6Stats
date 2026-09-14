import {AMMO_MAP, GRIP_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {adsMoveTiers} from '@/data/balanceTables.ts';

import {optionStat} from './shared.ts';

export const getAdsMoveSpeed = (weaponId: string, selections: AttachmentSelections): number => {
  const mag = weaponMagazines[weaponId];

  if (!mag) return 0;

  const ammoShift = AMMO_MAP.get(selections.ammo)?.adsMoveSpeedTierShift ?? 0;
  const gripShift =
    optionStat(GRIP_MAP, selections.underbarrel, grip => grip.adsMoveSpeedTierShift) ?? 0;
  const magShift = mag.mags[selections.magazine].adsMoveSpeedTierShift;

  const tierIndex = Math.min(
    Math.max(mag.defAms - (ammoShift + gripShift + magShift), 0),
    adsMoveTiers.length - 1,
  );

  return adsMoveTiers[tierIndex];
};

export const getBaseAdsMoveSpeed = (weaponId: string): number =>
  getAdsMoveSpeed(weaponId, getDefaultSelections(weaponId));
