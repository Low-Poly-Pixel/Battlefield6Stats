import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatBar} from '@/common/components/StatBar/StatBar.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface MobilityStatsProps {
  stats: WeaponStatsViewModel;
}

export const MobilityStats = ({stats}: MobilityStatsProps) => (
  <Panel title="Mobility">
    <StatBar
      label="ADS Time"
      value={stats.adsTime.current}
      baseline={stats.adsTime.base}
      min={0}
      max={500}
      unit="ms"
      decimals={0}
      invert
    />
    <StatBar
      label="ADS Movement Speed"
      value={stats.adsMoveSpeed.current}
      baseline={stats.adsMoveSpeed.base}
      min={0}
      max={1}
      unit="x"
      decimals={2}
    />
    <StatBar
      label="Sprint Recovery Time"
      value={stats.sprintRecoveryTime.current}
      baseline={stats.sprintRecoveryTime.base}
      min={0}
      max={400}
      unit="ms"
      decimals={0}
      invert
    />
    <StatBar
      label="Weapon Swap Time"
      value={stats.deployTime.current}
      baseline={stats.deployTime.base}
      min={0}
      max={1400}
      unit="ms"
      decimals={0}
      invert
    />
    <StatItem
      label="Sprint Speed"
      value={stats.sprintSpeed.current}
      baseline={stats.sprintSpeed.base}
      min={0}
      max={100}
      unit="%"
      decimals={0}
    />
  </Panel>
);
