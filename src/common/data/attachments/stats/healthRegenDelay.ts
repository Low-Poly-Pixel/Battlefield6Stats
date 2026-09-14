import {AMMO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {healthRegenDelaySeconds} from '@/data/balanceTables.ts';

export const getHealthRegenDelay = (selections: AttachmentSelections): number =>
  AMMO_MAP.get(selections.ammo)?.healthRegenDelayS ?? healthRegenDelaySeconds;

export const getBaseHealthRegenDelay = (weaponId: string): number =>
  getHealthRegenDelay(getDefaultSelections(weaponId));
