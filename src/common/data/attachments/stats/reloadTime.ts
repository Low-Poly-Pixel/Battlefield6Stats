import {ERGO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

// Reload time is ONLY affected by: the selected magazine's own Fast-mag tier
// (RELOAD_SPEED_MULTIPLIERS), the Improved Mag Catch ergo (a flat multiplier,
// not a tier row), and a handful of LMG/SMG magazines with a directly-measured
// tacRldOverrideMs that replaces the weapon's own base entirely (see
// reload-exceptions.json for the recording evidence behind those overrides).
//
// Known gap: shotguns reload per-shell in-game, not via one tactical-reload
// time, so `weapon.tacRld` is undefined for all 4 (m87a1/m1014/ks18k/db12) and
// this formula returns NaN for them. Not modeled — needs a per-shell mechanic,
// not a fix to this formula.
const RELOAD_SPEED_MULTIPLIERS = [1, 1.13, 1.277];

export const getReloadTime = (weaponId: string, selections: AttachmentSelections): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const mag = weaponMagazines[weaponId];

  if (!weapon || !mag) return 0;

  const selectedMag = mag.mags[selections.magazine];
  const baseSeconds =
    selectedMag.tacRldOverrideMs !== undefined
      ? selectedMag.tacRldOverrideMs / 1000
      : weapon.tacRld;

  const reloadTierMult = RELOAD_SPEED_MULTIPLIERS[selectedMag.reloadSpeedTier ?? 0];
  const ergoMult = optionStat(ERGO_MAP, selections.ergonomics, ergo => ergo.reloadSpeedMult) ?? 1;

  return Math.round((baseSeconds / (reloadTierMult * ergoMult)) * 100) / 100;
};

export const getBaseReloadTime = (weaponId: string): number =>
  getReloadTime(weaponId, getDefaultSelections(weaponId));

// Empty reload has no per-magazine override field (nothing analogous to
// tacRldOverrideMs), so it always runs the weapon's own emptyRld through the
// same tier/ergo modifiers as tactical reload.
export const getEmptyReloadTime = (weaponId: string, selections: AttachmentSelections): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const mag = weaponMagazines[weaponId];

  if (!weapon || !mag) return 0;

  const selectedMag = mag.mags[selections.magazine];
  const baseSeconds = weapon.emptyRld ?? NaN;
  const reloadTierMult = RELOAD_SPEED_MULTIPLIERS[selectedMag.reloadSpeedTier ?? 0];
  const ergoMult = optionStat(ERGO_MAP, selections.ergonomics, ergo => ergo.reloadSpeedMult) ?? 1;

  return Math.round((baseSeconds / (reloadTierMult * ergoMult)) * 100) / 100;
};

export const getBaseEmptyReloadTime = (weaponId: string): number =>
  getEmptyReloadTime(weaponId, getDefaultSelections(weaponId));

// Disabled whenever there's no distinct empty-reload value worth showing: the
// field is missing entirely (the tube-fed shotguns), or it's numerically
// identical to tactical reload (m44/m357trait reload at the same speed either
// way) -- "-" beats showing NaN or a redundant duplicate of the other stat.
export const isEmptyReloadRedundant = (weaponId: string): boolean => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon?.emptyRld === undefined || weapon.emptyRld === weapon.tacRld;
};
