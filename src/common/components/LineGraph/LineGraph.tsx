import {AreaChart} from '@mantine/charts';
import type {MantineColor} from '@mantine/core';
import {Label} from 'recharts';

import classes from './LineGraph.module.css';

type GraphMode = 'default' | 'pistol' | 'dmr' | 'sniper';

type ModeConfig = {
  damageMax: number;
  rangeMax: number;
  damageInterval: number;
  rangeInterval: number;
};

const MODE_CONFIG: Record<GraphMode, ModeConfig> = {
  default: {damageMax: 40, rangeMax: 100, damageInterval: 5, rangeInterval: 10},
  pistol: {damageMax: 60, rangeMax: 100, damageInterval: 5, rangeInterval: 10},
  dmr: {damageMax: 80, rangeMax: 100, damageInterval: 10, rangeInterval: 10},
  sniper: {damageMax: 160, rangeMax: 200, damageInterval: 20, rangeInterval: 25},
};

const getTicks = (max: number, interval: number): number[] =>
  Array.from({length: Math.floor(max / interval) + 1}, (_, index) => index * interval);

interface LineGraphProps {
  label: string;
  data: Array<{range: number; damage: number}>;
  mode?: GraphMode;
  color?: MantineColor;
}

export const LineGraph = ({label, data, mode = 'default', color = 'red'}: LineGraphProps) => {
  const config = MODE_CONFIG[mode];
  const rangeTicks = getTicks(config.rangeMax, config.rangeInterval);
  const damageTicks = getTicks(config.damageMax, config.damageInterval);
  const rangeGridValues = rangeTicks.filter(value => value !== 0);
  const damageReferenceValues = damageTicks.filter(value => value !== 0);

  return (
    <div className={classes.root} role="img" aria-label={label}>
      <AreaChart
        h={220}
        data={data}
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
          domain: [0, config.rangeMax],
          ticks: rangeTicks,
          tickLine: false,
          interval: 0,
          allowDataOverflow: true,
          axisLine: {stroke: 'var(--mantine-color-white)', strokeWidth: 2},
        }}
        yAxisProps={{
          domain: [0, config.damageMax],
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
