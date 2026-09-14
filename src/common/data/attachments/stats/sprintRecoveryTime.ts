import {BARREL_MAP, ERGO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {drawTimeTables} from '@/data/balanceTables.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

// Sprint-to-fire recovery and weapon-deploy speed are levelled stats resolved
// against the same drawTimeTables (ms) ladder used for ADS time. Fields named
// *TierShift (barrel, ergo, magazine, muzzle) are subtracted from the base
// index -- the same convention getAdsTime already applies to the magazine's
// adsTimeTierShift, as opposed to *TierMod fields (grip/barrel ADS time),
// which are added.
//
// Signature Weapon Buff (Assault/AR): Sprint Recovery Time gets one tier faster.
export const getSprintRecoveryTime = (
  weaponId: string,
  selections: AttachmentSelections,
  signatureWeapon = false,
): number => {
  const mag = weaponMagazines[weaponId];

  if (!mag) return 0;

  const barrelShift =
    optionStat(BARREL_MAP, selections.barrel, barrel => barrel.sprintRecoveryTierShift) ?? 0;
  const ergoShift =
    optionStat(ERGO_MAP, selections.ergonomics, ergo => ergo.sprintRecoveryTierShift) ?? 0;
  const magShift = mag.mags[selections.magazine].sprintRecoveryTierShift;
  const weapon = weapons.find(item => item.id === weaponId);
  const signatureShift = signatureWeapon && weapon?.class === 'assaultRifle' ? -1 : 0;

  const tierIndex = Math.min(
    Math.max(
      mag.sprintRecoveryBaseIndex - (barrelShift + ergoShift + magShift + signatureShift),
      0,
    ),
    drawTimeTables.sprint.length - 1,
  );

  return Math.round(drawTimeTables.sprint[tierIndex]);
};

export const getBaseSprintRecoveryTime = (weaponId: string): number =>
  getSprintRecoveryTime(weaponId, getDefaultSelections(weaponId));
