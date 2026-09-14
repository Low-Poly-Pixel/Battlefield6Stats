import {BARREL_MAP, ERGO_MAP, MUZZLE_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {drawTimeTables} from '@/data/balanceTables.ts';

import {optionStat} from './shared.ts';

export const getDeployTime = (weaponId: string, selections: AttachmentSelections): number => {
  const mag = weaponMagazines[weaponId];

  if (!mag) return 0;

  const barrelShift =
    optionStat(BARREL_MAP, selections.barrel, barrel => barrel.deployTimeTierShift) ?? 0;
  const muzzleShift =
    optionStat(MUZZLE_MAP, selections.muzzle, muzzle => muzzle.deployTimeTierShift) ?? 0;
  const ergoShift =
    optionStat(ERGO_MAP, selections.ergonomics, ergo => ergo.deployTimeTierShift) ?? 0;
  const magShift = mag.mags[selections.magazine].deployTimeTierShift ?? 0;

  const table = drawTimeTables[mag.deployTimeTable].deploy;
  const tierIndex = Math.min(
    Math.max(mag.deployBaseIndex - (barrelShift + muzzleShift + ergoShift + magShift), 0),
    table.length - 1,
  );

  return Math.round(table[tierIndex]);
};

export const getBaseDeployTime = (weaponId: string): number =>
  getDeployTime(weaponId, getDefaultSelections(weaponId));
