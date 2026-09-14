// TODO: review this file for code quality before considering it done
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

export interface StatPair {
  current: number;
  base: number;
}

export interface WeaponStatsViewModel {
  fireRate: StatPair;
  damage: StatPair;
  velocity: StatPair;
  adsSpreadGrowth: StatPair;
  adsTime: StatPair;
  sprintRecoveryTime: StatPair;
  deployTime: StatPair;
  reloadTime: StatPair;
  movingAccuracy: StatPair;
  hipSpreadStanding: StatPair;
  hipSpreadMoving: StatPair;
  worldSpot: StatPair;
  minimapSpot: StatPair;
}
