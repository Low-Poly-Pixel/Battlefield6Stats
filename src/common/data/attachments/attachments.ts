import {sights} from '@/data/attachments.ts';

import {
  AMMO_MAP,
  BARREL_MAP,
  type Catalog,
  ERGO_MAP,
  GRIP_MAP,
  LASER_MAP,
  LIGHT_MAP,
  MUZZLE_MAP,
  SIGHT_MAP,
} from './catalogs.ts';
import type {
  AttachmentKey,
  AttachmentOption,
  AttachmentSelections,
  WeaponContext,
} from './types.ts';

export interface AttachmentState {
  key: AttachmentKey;
  label: string;
  mandatory: boolean;
  value: string | null;
  options: AttachmentOption[];
  locked: boolean;
  unavailable: boolean;
}

export interface AttachmentConfig {
  key: AttachmentKey;
  label: string;
  mandatory: boolean;
  getOptions: (weapon: WeaponContext) => AttachmentOption[];
  getDefault: (weapon: WeaponContext) => string | null;
}

export const PP19_MAGAZINE_LOCK = {weaponId: 'pp19', magazineId: '53Rnd'} as const;

const sortByPoints = (options: AttachmentOption[]): AttachmentOption[] =>
  options.toSorted((a, b) => a.pts - b.pts);

const attachmentOptions = (
  ids: string[],
  ...maps: Array<Map<string, Catalog>>
): AttachmentOption[] => {
  const findItem = (id: string): Catalog | undefined =>
    maps.map(map => map.get(id)).find(item => item !== undefined);

  const items = ids.flatMap(id => {
    const item = findItem(id);

    return item ? [{...item, unaffordable: false}] : [];
  });

  return sortByPoints(items);
};

const selectableOptions = (
  ids: string[],
  ...maps: Array<Map<string, Catalog>>
): AttachmentOption[] => (ids.length === 0 ? [] : attachmentOptions(['none', ...ids], ...maps));

export const ATTACHMENT_DEFS: AttachmentConfig[] = [
  {
    key: 'sight',
    label: 'Sight',
    mandatory: true,
    getOptions: weapon => {
      const ids = weapon.atts.sight ?? sights.map(sight => sight.id);

      return sortByPoints(
        attachmentOptions(ids, SIGHT_MAP).map(option => {
          const override = weapon.atts.sightPoints?.[option.id];

          return override === undefined ? option : {...option, pts: override};
        }),
      );
    },
    getDefault: weapon => (weapon.isSidearm ? 'iron' : 'stdOptic'),
  },
  {
    key: 'barrel',
    label: 'Barrel',
    mandatory: true,
    getOptions: weapon => attachmentOptions(weapon.atts.barrel, BARREL_MAP),
    getDefault: weapon => weapon.atts.barrelDef,
  },
  {
    key: 'magazine',
    label: 'Magazine',
    mandatory: true,
    getOptions: weapon =>
      sortByPoints(
        Object.entries(weapon.mag.mags).map(([id, entry]) => ({
          id,
          name: entry.name,
          pts: entry.pts,
          unaffordable: false,
        })),
      ),
    getDefault: weapon => weapon.mag.def,
  },
  {
    key: 'ammo',
    label: 'Ammo',
    mandatory: true,
    getOptions: weapon =>
      sortByPoints(
        Object.entries(weapon.ammoEntry.ammo).map(([id, pts]) => ({
          id,
          name: AMMO_MAP.get(id)?.name ?? id,
          pts,
          unaffordable: false,
        })),
      ),
    getDefault: weapon => weapon.ammoEntry.def,
  },
  {
    key: 'muzzle',
    label: 'Muzzle',
    mandatory: false,
    getOptions: weapon => selectableOptions(weapon.atts.muzzle, MUZZLE_MAP),
    getDefault: () => null,
  },
  {
    key: 'ergonomics',
    label: 'Ergonomics',
    mandatory: false,
    getOptions: weapon => selectableOptions(weapon.ergo?.avail ?? [], ERGO_MAP),
    getDefault: () => null,
  },
  {
    key: 'underbarrel',
    label: 'Underbarrel',
    mandatory: false,
    getOptions: weapon => selectableOptions(weapon.atts.grip, GRIP_MAP),
    getDefault: () => null,
  },
  {
    key: 'laser',
    label: 'Accessory 1',
    mandatory: false,
    getOptions: weapon => selectableOptions(weapon.atts.laser, LASER_MAP),
    getDefault: () => null,
  },
  {
    key: 'light',
    label: 'Accessory 2',
    mandatory: false,
    getOptions: weapon => selectableOptions(weapon.atts.light, LIGHT_MAP),
    getDefault: () => null,
  },
];

export const ATTACHMENT_DEF_MAP = new Map(ATTACHMENT_DEFS.map(config => [config.key, config]));

export const buildAttachmentState = (
  config: AttachmentConfig,
  weapon: WeaponContext,
  selections: AttachmentSelections,
): AttachmentState => {
  const options = config.getOptions(weapon);
  const unavailable = !config.mandatory && options.length === 0;

  return {
    key: config.key,
    label: config.label,
    mandatory: config.mandatory,
    value: !unavailable ? selections[config.key] : null,
    options,
    locked: !unavailable && options.length <= 1,
    unavailable,
  };
};

const setAttachment = (
  attachments: AttachmentState[],
  key: AttachmentKey,
  patch: Partial<AttachmentState>,
): void => {
  const attachment = attachments.find(item => item.key === key);

  if (attachment) Object.assign(attachment, patch);
};

const setCombinedOptions = (
  attachments: AttachmentState[],
  key: AttachmentKey,
  options: AttachmentOption[],
  selections: AttachmentSelections,
): void => {
  const unavailable = options.length === 0;

  setAttachment(attachments, key, {
    options,
    unavailable,
    value: !unavailable ? selections[key] : null,
    locked: false,
  });
};

const blankAttachment = (attachments: AttachmentState[], key: AttachmentKey): void => {
  setAttachment(attachments, key, {options: [], unavailable: true, value: null, locked: false});
};

export const applySpecialCases = (
  weapon: WeaponContext,
  selections: AttachmentSelections,
  attachments: AttachmentState[],
): void => {
  const {atts, weaponId} = weapon;

  if (atts.laserGripLightCombined) {
    setCombinedOptions(
      attachments,
      'underbarrel',
      selectableOptions(
        [...atts.grip, ...atts.laser, ...atts.light],
        GRIP_MAP,
        LASER_MAP,
        LIGHT_MAP,
      ),
      selections,
    );
    blankAttachment(attachments, 'laser');
    blankAttachment(attachments, 'light');
  } else if (atts.laserLightCombined) {
    setCombinedOptions(
      attachments,
      'laser',
      selectableOptions([...atts.laser, ...atts.light], LASER_MAP, LIGHT_MAP),
      selections,
    );
    blankAttachment(attachments, 'light');
  }

  if (
    weaponId === PP19_MAGAZINE_LOCK.weaponId &&
    selections.magazine === PP19_MAGAZINE_LOCK.magazineId
  ) {
    blankAttachment(attachments, 'underbarrel');
  }
};
