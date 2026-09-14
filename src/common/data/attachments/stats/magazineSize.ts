import {getDefaultSelections} from '@/common/data/attachments/selections.ts';
import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponMagazines} from '@/data/attachments.ts';
import {weapons} from '@/data/weapons.ts';

export const getMagazineSize = (weaponId: string, selections: AttachmentSelections): number => {
  const mag = weaponMagazines[weaponId];
  const weapon = weapons.find(item => item.id === weaponId);

  return mag?.mags[selections.magazine]?.mag ?? weapon?.mag ?? 0;
};

export const getBaseMagazineSize = (weaponId: string): number =>
  getMagazineSize(weaponId, getDefaultSelections(weaponId));
