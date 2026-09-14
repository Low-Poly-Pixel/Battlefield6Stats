import {AMMO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';

import {getSpotSource} from './spotSource.ts';

const BASE_MINIMAP_SPOT = 150;

export const getMinimapSpotOnFire = (selections: AttachmentSelections): number => {
  const source = getSpotSource(selections);
  const ammo = AMMO_MAP.get(selections.ammo);

  if (source?.suppressor && ammo?.suppressedMinimapSpot !== undefined) {
    return ammo.suppressedMinimapSpot;
  }

  return ammo?.minimapSpot ?? source?.minimapSpot ?? BASE_MINIMAP_SPOT;
};

export const getBaseMinimapSpotOnFire = (weaponId: string): number =>
  getMinimapSpotOnFire(getDefaultSelections(weaponId));
