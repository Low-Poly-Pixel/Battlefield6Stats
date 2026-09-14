import {ERGO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weapons} from '@/data/weapons.ts';

import {optionStat} from './shared.ts';

export const getFireRate = (weaponId: string, selections: AttachmentSelections): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const autoRpm = optionStat(ERGO_MAP, selections.ergonomics, ergo => ergo.autoRpm);

  return Math.round(autoRpm ?? weapon?.rpm ?? 0);
};

export const getBaseFireRate = (weaponId: string): number =>
  getFireRate(weaponId, getDefaultSelections(weaponId));
