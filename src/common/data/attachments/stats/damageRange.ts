import type {AttachmentSelections} from '@/common/data/attachments/types.ts';
import {weaponAmmo} from '@/data/ammo.ts';
import {type WeaponClassName, weapons} from '@/data/weapons.ts';

// DMRs and sidearms hit hard enough to need the full 0-100 scale; snipers hit
// harder still (headshot-oriented one-shot-kill damage) and get their own
// 0-150 scale in steps of 25; every other class is capped at 50 so guns in
// that (much lower-damage) group stay comparable to each other instead of
// being squeezed flat against a scale sized for the outliers.
const MEDIUM_DAMAGE_CLASSES = new Set<WeaponClassName>(['dmr', 'sidearm']);

export const getDamageChartMax = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  if (weapon?.class === 'sniperRifle') return 150;

  return weapon && MEDIUM_DAMAGE_CLASSES.has(weapon.class) ? 100 : 50;
};

export const getDamageChartStep = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon?.class === 'sniperRifle' ? 25 : 10;
};

// Snipers engage at ranges roughly double everyone else's, so their chart's
// range axis is scaled to 200 (in 20s) instead of 100 (in 10s).
export const getDamageChartRangeMax = (weaponId: string): number => {
  const weapon = weapons.find(item => item.id === weaponId);

  return weapon?.class === 'sniperRifle' ? 200 : 100;
};

// Body-shot damage vs. range, exactly the curve getDamage already reads for
// its own (single point) figure -- ammo overrides (e.g. shotgun slugs) win
// over the weapon's own base curve when present. No headshot or limb
// multiplier applied.
export const getDamageRangeCurve = (
  weaponId: string,
  selections: AttachmentSelections,
): Array<{range: number; damage: number}> => {
  const weapon = weapons.find(item => item.id === weaponId);
  const override = weaponAmmo[weaponId]?.projectileOverrides?.[selections.ammo]?.dmg;
  const points = override ?? weapon?.dmg ?? [];

  return points.map(point => ({range: point.r, damage: point.d}));
};
