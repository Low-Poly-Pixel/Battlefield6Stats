import {weapons} from '@/data/weapons.ts';

// Signature Weapon Buff (Support/LMG): removes the LMG sprint speed penalty.
export const getSprintSpeed = (weaponId: string, signatureWeapon = false): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  if (!weapon) return 0;

  if (signatureWeapon && weapon.class === 'lmg') return 100;

  return weapon.sprintSpeed;
};

export const getBaseSprintSpeed = (weaponId: string): number => getSprintSpeed(weaponId);
