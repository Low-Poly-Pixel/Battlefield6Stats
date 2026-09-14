import {weapons} from '@/data/weapons.ts';

export const getSprintSpeed = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon?.sprintSpeed ?? 0;
};

export const getBaseSprintSpeed = (weaponId: string): number => getSprintSpeed(weaponId);
