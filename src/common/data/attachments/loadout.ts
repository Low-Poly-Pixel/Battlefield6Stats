import {
  applySpecialCases,
  ATTACHMENT_DEFS,
  type AttachmentState,
  buildAttachmentState,
  PP19_MAGAZINE_LOCK,
} from './attachments.ts';
import {getPointBudget, getWeaponContext} from './selections.ts';
import type {
  AttachmentKey,
  AttachmentOption,
  AttachmentSelections,
  AttachmentViewModel,
  LoadoutViewModel,
} from './types.ts';

const getLoadoutAttachments = (
  weaponId: string,
  selections: AttachmentSelections,
): AttachmentState[] => {
  const weapon = getWeaponContext(weaponId);

  if (!weapon) return [];

  const attachments = ATTACHMENT_DEFS.map(config =>
    buildAttachmentState(config, weapon, selections),
  );

  applySpecialCases(weapon, selections, attachments);

  return attachments;
};

const optionPts = (options: AttachmentOption[], id: string | null): number =>
  id === null ? 0 : (options.find(option => option.id === id)?.pts ?? 0);

export const getLoadoutViewModel = (
  weaponId: string | null,
  selections: AttachmentSelections | null,
): LoadoutViewModel | null => {
  if (!weaponId || !selections) return null;

  const attachments = getLoadoutAttachments(weaponId, selections);
  const budget = getPointBudget(weaponId);
  const totalPoints = attachments.reduce(
    (sum, attachment) => sum + optionPts(attachment.options, attachment.value),
    0,
  );

  const viewAttachments = attachments.map((attachment): AttachmentViewModel => {
    const otherTotal = totalPoints - optionPts(attachment.options, attachment.value);

    return {
      ...attachment,
      options: attachment.options.map((option): AttachmentOption => ({
        ...option,
        unaffordable:
          !attachment.locked &&
          !attachment.unavailable &&
          option.id !== attachment.value &&
          otherTotal + option.pts > budget,
      })),
    };
  });

  return {attachments: viewAttachments, totalPoints, budget};
};

export const updateSelection = (
  weaponId: string,
  selections: AttachmentSelections,
  key: AttachmentKey,
  value: string,
): AttachmentSelections => {
  const cleared = value !== 'none' ? value : null;
  let next: AttachmentSelections;

  switch (key) {
    // Mandatory: raw value, never cleared to null.
    case 'sight': {
      next = {...selections, sight: value};
      break;
    }

    case 'barrel': {
      next = {...selections, barrel: value};
      break;
    }

    case 'magazine': {
      next = {...selections, magazine: value};
      break;
    }

    case 'ammo': {
      next = {...selections, ammo: value};
      break;
    }

    // Optional: 'none' clears the selection to null.
    case 'muzzle': {
      next = {...selections, muzzle: cleared};
      break;
    }

    case 'underbarrel': {
      next = {...selections, underbarrel: cleared};
      break;
    }

    case 'laser': {
      next = {...selections, laser: cleared};
      break;
    }

    case 'light': {
      next = {...selections, light: cleared};
      break;
    }

    case 'ergonomics': {
      next = {...selections, ergonomics: cleared};
      break;
    }
  }

  if (weaponId === PP19_MAGAZINE_LOCK.weaponId && key === 'magazine') {
    next = {...next, underbarrel: null};
  }

  return next;
};
