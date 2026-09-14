import type {WeaponAmmoEntry} from '@/data/ammo.ts';
import type {
  WeaponAttachments,
  WeaponErgoAvailability,
  WeaponMagazines,
} from '@/data/attachments.ts';

export type AttachmentKey =
  | 'sight'
  | 'muzzle'
  | 'barrel'
  | 'underbarrel'
  | 'laser'
  | 'light'
  | 'ergonomics'
  | 'magazine'
  | 'ammo';

export interface AttachmentOption {
  id: string;
  name: string;
  pts: number;
  unaffordable: boolean;
}

export interface AttachmentSelections {
  sight: string;
  muzzle: string | null;
  barrel: string;
  underbarrel: string | null;
  laser: string | null;
  light: string | null;
  ergonomics: string | null;
  magazine: string;
  ammo: string;
}

export interface WeaponContext {
  weaponId: string;
  isSidearm: boolean;
  atts: WeaponAttachments;
  ergo: WeaponErgoAvailability | undefined;
  mag: WeaponMagazines;
  ammoEntry: WeaponAmmoEntry;
}

export interface AttachmentViewModel {
  key: AttachmentKey;
  label: string;
  mandatory: boolean;
  value: string | null;
  options: AttachmentOption[];
  locked: boolean;
  unavailable: boolean;
}

export interface LoadoutViewModel {
  attachments: AttachmentViewModel[];
  totalPoints: number;
  budget: number;
}

export interface Stat {
  current: number;
  base: number;
  disabled?: boolean;
}

export interface WeaponStatsViewModel {
  fireRate: Stat;
  damage: Stat;
  headshotDamage: Stat;
  velocity: Stat;
  adsSpreadGrowth: Stat;
  adsTime: Stat;
  sprintRecoveryTime: Stat;
  deployTime: Stat;
  reloadTime: Stat;
  emptyReloadTime: Stat;
  movingAccuracy: Stat;
  hipSpreadStanding: Stat;
  hipSpreadMoving: Stat;
  worldSpot: Stat;
  minimapSpot: Stat;
  healthRegenDelay: Stat;
}
