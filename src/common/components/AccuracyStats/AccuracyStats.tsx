import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface AccuracyStatsProps {
  stats: WeaponStatsViewModel;
}

export const AccuracyStats = ({stats}: AccuracyStatsProps) => (
  <Panel title="Accuracy">
    <StatItem
      label="Moving ADS Accuracy"
      value={stats.movingAccuracy.current}
      baseline={stats.movingAccuracy.base}
      min={0}
      max={0.68}
      unit="°"
      decimals={2}
      invert
    />
    <StatItem
      label="ADS Bloom Growth"
      value={stats.adsSpreadGrowth.current}
      baseline={stats.adsSpreadGrowth.base}
      min={0}
      max={1}
      unit="°"
      decimals={2}
      invert
    />
  </Panel>
);
