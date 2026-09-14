import {Panel} from '@/common/components/Panel/Panel.tsx';
import {StatBar} from '@/common/components/StatBar/StatBar.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface CoreGunStatsProps {
  stats: WeaponStatsViewModel;
}

export const CoreGunStats = ({stats}: CoreGunStatsProps) => (
  <Panel title="Core Gun Stats">
    <StatBar
      label="Fire Rate"
      value={stats.fireRate.current}
      baseline={stats.fireRate.base}
      min={0}
      max={1080}
      decimals={0}
    />
    <StatBar
      label="Damage"
      value={stats.damage.current}
      baseline={stats.damage.base}
      min={0}
      max={100}
      decimals={0}
    />
    <StatBar
      label="Bullet Speed"
      value={stats.velocity.current}
      baseline={stats.velocity.base}
      min={0}
      max={1080}
      unit={'m/s'}
      decimals={0}
    />
    <StatItem
      label="Magazine Size"
      value={stats.magazineSize.current}
      baseline={stats.magazineSize.base}
      min={0}
      max={100}
      decimals={0}
    />
  </Panel>
);
