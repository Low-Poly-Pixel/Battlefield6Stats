import {StatBar} from '@/common/components/StatBar/StatBar.tsx';
import {StatItem} from '@/common/components/StatItem/StatItem.tsx';
import type {WeaponStatsViewModel} from '@/common/data/attachments/types.ts';

interface WeaponStatsProps {
  stats: WeaponStatsViewModel;
}

export const WeaponStats = ({stats}: WeaponStatsProps) => (
  <>
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
      label="Headshot Damage"
      value={stats.headshotDamage.current}
      baseline={stats.headshotDamage.base}
      min={0}
      max={100}
      decimals={0}
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
    <StatBar
      label="Bullet Speed"
      value={stats.velocity.current}
      baseline={stats.velocity.base}
      min={0}
      max={1000}
      decimals={0}
    />
    <StatBar
      label="ADS Time"
      value={stats.adsTime.current}
      baseline={stats.adsTime.base}
      min={0}
      max={500}
      decimals={0}
      invert
    />
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
    <StatItem
      label="Tactical Reload Time"
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
    <StatItem
      label="Sprint Recovery Time"
      value={stats.sprintRecoveryTime.current}
      baseline={stats.sprintRecoveryTime.base}
      min={0}
      max={400}
      unit="ms"
      decimals={0}
      invert
    />
    <StatItem
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
  </>
);
