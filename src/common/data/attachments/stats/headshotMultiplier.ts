import {AMMO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import type {Ammo} from '@/data/ammo.ts';
import {
  autoHeadshotMult,
  baseHeadshotMultByWeapon,
  hollowPointHeadshotMultByWeapon,
} from '@/data/balanceTables.ts';
import {type WeaponClassName, weapons} from '@/data/weapons.ts';

// Headshot multiplier resolution branches by weapon class:
// - AR/carbine/SMG/LMG/sidearm ("auto") ignore the per-weapon table entirely
//   and look up autoHeadshotMult by ammo category (synthetic id, the 'hp'
//   sentinel, or standard as the default for every other ammo).
// - DMR/sniper/shotgun use the selected ammo's own numeric hsMult when it has
//   one (shotgun ammo always does), otherwise fall back to the weapon's flat
//   baseHeadshotMultByWeapon entry -- except m39emr/svk86/svdm on Hollow
//   Point, which get a further boost from hollowPointHeadshotMultByWeapon
//   (source: hit_zones.json from github.com/raymdl/BF6-Weapon-Analyzer).
const AUTO_HEADSHOT_CLASSES = new Set<WeaponClassName>([
  'assaultRifle',
  'carbine',
  'smg',
  'lmg',
  'sidearm',
]);

const getAutoHeadshotCategory = (ammoId: string, ammo: Ammo | undefined): string => {
  if (ammoId === 'synthetic') return 'synthetic';

  return ammo?.hsMult === 'hp' ? 'hp' : 'standard';
};

export const getHeadshotMultiplier = (
  weaponId: string,
  selections: AttachmentSelections,
): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const ammo = AMMO_MAP.get(selections.ammo);

  if (weapon && AUTO_HEADSHOT_CLASSES.has(weapon.class)) {
    return autoHeadshotMult[getAutoHeadshotCategory(selections.ammo, ammo)] ?? NaN;
  }

  if (typeof ammo?.hsMult === 'number') return ammo.hsMult;

  if (ammo?.hsMult === 'hp' && weaponId in hollowPointHeadshotMultByWeapon) {
    return hollowPointHeadshotMultByWeapon[weaponId];
  }

  return baseHeadshotMultByWeapon[weaponId] ?? NaN;
};

export const getBaseHeadshotMultiplier = (weaponId: string): number =>
  getHeadshotMultiplier(weaponId, getDefaultSelections(weaponId));
