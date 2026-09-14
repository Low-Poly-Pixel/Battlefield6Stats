import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface ReloadStatsProps {
  stats: WeaponStatsViewModel;
}

export const ReloadStats = ({stats}: ReloadStatsProps) => (
  <Panel title="Reload">
    <StatItem
      label="Reload Time"
      value={stats.reloadTime.current}
      baseline={stats.reloadTime.base}
      min={0}
      max={8}
      unit="s"
      decimals={2}
      invert
    />
    <StatItem
      label="Empty Reload Time"
      value={stats.emptyReloadTime.current}
      baseline={stats.emptyReloadTime.base}
      min={0}
      max={8}
      unit="s"
      decimals={2}
      invert
      disabled={stats.emptyReloadTime.disabled}
    />
  </Panel>
);
