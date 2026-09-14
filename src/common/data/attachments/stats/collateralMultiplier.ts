import {AMMO_MAP} from '@/common/data/attachments/catalogs.ts';
import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {collateralMultOverrideByWeapon} from '@/data/balanceTables.ts';
import {weapons} from '@/data/weapons.ts';

export const getCollateralMultiplier = (
  weaponId: string,
  selections: AttachmentSelections,
): number => {
  const weapon = weapons.find(item => item.id === weaponId);
  const override = collateralMultOverrideByWeapon[weaponId]?.[selections.ammo];

  if (override !== undefined) return override;

  if (!weapon) return NaN;

  const ammoValue = AMMO_MAP.get(selections.ammo)?.collateralMult[weapon.class];

  if (ammoValue !== undefined) return ammoValue;

  if (selections.ammo === 'standard') return NaN;

  return getCollateralMultiplier(weaponId, {...selections, ammo: 'standard'});
};

export const getBaseCollateralMultiplier = (weaponId: string): number =>
  getCollateralMultiplier(weaponId, getDefaultSelections(weaponId));
