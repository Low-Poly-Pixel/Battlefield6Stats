import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatBar} from '@/common/components/StatBar/StatBar.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface HipfireStatsProps {
  stats: WeaponStatsViewModel;
}

export const HipfireStats = ({stats}: HipfireStatsProps) => (
  <Panel title="Hipfire">
    <StatBar
      label="Standing Hipfire Spread"
      value={stats.hipSpreadStanding.current}
      baseline={stats.hipSpreadStanding.base}
      min={0}
      max={10}
      unit="°"
      decimals={2}
      invert
    />
  </Panel>
);
