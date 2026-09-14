import {AMMO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';

import {getSpotSource} from './spotSource.ts';

const BASE_WORLD_SPOT = 54;

export const getWorldSpotOnFire = (selections: AttachmentSelections): number => {
  const source = getSpotSource(selections);

  if (source?.worldSpot === 0) return 0;

  return AMMO_MAP.get(selections.ammo)?.worldSpot ?? source?.worldSpot ?? BASE_WORLD_SPOT;
};

export const getBaseWorldSpotOnFire = (weaponId: string): number =>
  getWorldSpotOnFire(getDefaultSelections(weaponId));
