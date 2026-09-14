import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface StealthStatsProps {
  stats: WeaponStatsViewModel;
}

export const StealthStats = ({stats}: StealthStatsProps) => (
  <Panel title="Stealth">
    <StatItem
      label="World Spot on Fire"
      value={stats.worldSpot.current}
      baseline={stats.worldSpot.base}
      min={0}
      max={54}
      unit="m"
      decimals={0}
      invert
    />
    <StatItem
      label="Minimap Spot on Fire"
      value={stats.minimapSpot.current}
      baseline={stats.minimapSpot.base}
      min={0}
      max={150}
      unit="m"
      decimals={0}
      invert
    />
  </Panel>
);
