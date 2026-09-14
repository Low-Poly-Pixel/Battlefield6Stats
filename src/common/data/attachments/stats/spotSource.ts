import {BARREL_MAP, MUZZLE_MAP} from '@/common/data/attachments/catalogs.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import type {Barrel, Muzzle} from '@/data/attachments.ts';

// Spot-on-fire ranges are not weapon-specific at all — every weapon shares the
// same 54m world / 150m minimap bases, modified only by Muzzle (or, for the
// two VSSM integrated-suppressor barrels, Barrel) and by Subsonic-family ammo.
export const getSpotSource = (selections: AttachmentSelections): Muzzle | Barrel | undefined =>
  (selections.muzzle ? MUZZLE_MAP.get(selections.muzzle) : undefined) ??
  BARREL_MAP.get(selections.barrel);
