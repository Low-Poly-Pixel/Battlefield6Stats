// TODO: review this file for code quality before considering it done
import {ammoCatalog} from '@/data/ammo.ts';
import {barrels, ergos, grips, lasers, lights, muzzles, sights} from '@/data/attachments.ts';

export type Catalog = {id: string; name: string; pts: number};

type WithId = {id: string};

const catalogMap = <T extends WithId>(items: T[]): Map<string, T> => {
  const map = new Map<string, T>();

  for (const item of items) {
    map.set(item.id, item);
  }

  return map;
};

export const SIGHT_MAP = catalogMap(sights);
export const MUZZLE_MAP = catalogMap(muzzles);
export const BARREL_MAP = catalogMap(barrels);
export const GRIP_MAP = catalogMap(grips);
export const LASER_MAP = catalogMap(lasers);
export const LIGHT_MAP = catalogMap(lights);
export const ERGO_MAP = catalogMap(ergos);
export const AMMO_MAP = catalogMap(ammoCatalog);
