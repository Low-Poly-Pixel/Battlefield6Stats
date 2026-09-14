import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface AmmoModifiersStatsProps {
  stats: WeaponStatsViewModel;
}

export const AmmoModifiersStats = ({stats}: AmmoModifiersStatsProps) => (
  <Panel title="Ammo Modifiers">
    <StatItem
      label="Headshot Multiplier"
      value={stats.headshotMultiplier.current}
      baseline={stats.headshotMultiplier.base}
      min={0}
      max={2}
      unit="x"
      decimals={2}
    />
    <StatItem
      label="Collateral Multiplier"
      value={stats.collateralMultiplier.current}
      baseline={stats.collateralMultiplier.base}
      min={0}
      max={1}
      unit="x"
      decimals={2}
    />
    <StatItem
      label="Enemy Health Regen Delay"
      value={stats.healthRegenDelay.current}
      baseline={stats.healthRegenDelay.base}
      min={0}
      max={9}
      unit="s"
      decimals={0}
    />
  </Panel>
);
