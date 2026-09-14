import {AreaChart} from '@mantine/charts';
import type {MantineColor} from '@mantine/core';
import {Label} from 'recharts';

import classes from './LineGraph.module.css';

// Both axes are shown on a fixed scale rather than one sized to each
// weapon's own data, so guns within the same category are directly
// comparable to each other at a glance instead of each getting its own scale.
// Range always divides into 10 even steps (so it scales with rangeMax: 10s
// up to 100, 20s up to 200); damage's step stays fixed at 10 regardless of
// max, so a 50-max chart gets fewer, not smaller, ticks than a 100-max one.
const getRangeTicks = (rangeMax: number): number[] => {
  const step = rangeMax / 10;

  return Array.from({length: 11}, (_, index) => index * step);
};

const getDamageTicks = (damageMax: number, damageStep: number): number[] =>
  Array.from({length: damageMax / damageStep + 1}, (_, index) => index * damageStep);

interface LineGraphProps {
  label: string;
  data: Array<{range: number; damage: number}>;
  color?: MantineColor;
  rangeMax?: number;
  damageMax?: number;
  damageStep?: number;
}

export const LineGraph = ({
  label,
  data,
  color = 'red',
  rangeMax = 100,
  damageMax = 100,
  damageStep = 10,
}: LineGraphProps) => {
  const rangeTicks = getRangeTicks(rangeMax);
  const damageTicks = getDamageTicks(damageMax, damageStep);
  const rangeGridValues = rangeTicks.filter(value => value !== 0);
  const damageReferenceValues = damageTicks.filter(value => value !== 0);
  // The last logged breakpoint is where measurement stopped, not where
  // damage hits 0 -- extend a flat segment out to the chart's edge so the
  // line holds at that value instead of dropping off after the last point.
  const lastPoint = data.at(-1);
  const chartData =
    lastPoint && lastPoint.range < rangeMax
      ? [...data, {range: rangeMax, damage: lastPoint.damage}]
      : data;

  return (
    <div className={classes.root} role="img" aria-label={label}>
      <AreaChart
        h={220}
        data={chartData}
        dataKey="range"
        series={[{name: 'damage', color}]}
        curveType="linear"
        withDots={false}
        strokeDasharray={0}
        fillOpacity={1}
        withTooltip={false}
        accessibilityLayer={false}
        classNames={{area: classes.dataArea, axisLabel: classes.axisLabel}}
        gridAxis="y"
        gridProps={{verticalValues: rangeGridValues, stroke: 'var(--mantine-color-dark-6)'}}
        referenceLines={damageReferenceValues.map(value => ({
          y: value,
          color: 'dark.6',
          zIndex: -100,
        }))}
        xAxisLabel="Range (m)"
        xAxisProps={{
          type: 'number',
          domain: [0, rangeMax],
          ticks: rangeTicks,
          tickLine: false,
          interval: 0,
          allowDataOverflow: true,
          axisLine: {stroke: 'var(--mantine-color-white)', strokeWidth: 2},
        }}
        yAxisProps={{
          domain: [0, damageMax],
          ticks: damageTicks,
          tickLine: false,
          interval: 0,
          allowDataOverflow: true,
          axisLine: {stroke: 'var(--mantine-color-white)', strokeWidth: 2},
          // AreaChart's own yAxisLabel hardcodes the label's offset from the axis;
          // rendering it manually lets us pull it in closer via `offset`.
          children: (
            <Label
              value="Damage Per Shot"
              position="insideLeft"
              angle={-90}
              textAnchor="middle"
              fontSize={12}
              offset={10}
              className={classes.axisLabel}
            />
          ),
        }}
      />
    </div>
  );
};
