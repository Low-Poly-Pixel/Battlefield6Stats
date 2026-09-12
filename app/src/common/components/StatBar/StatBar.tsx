import type {MantineColor} from '@mantine/core';
import {Progress} from '@mantine/core';
import {useEffect} from 'react';

import classes from './StatBar.module.css';

interface StatBarProps {
  label: string;
  value: number;
  baseline: number;
  min: number;
  max: number;
}

type Direction = 'up' | 'down' | 'neutral';

const DIRECTION_COLOR: Record<Direction, MantineColor> = {up: 'green', down: 'red', neutral: 'dark'};
const DIRECTION_ARROW: Record<Direction, string> = {up: '▲', down: '▼', neutral: ''};

const getDirection = (value: number, baseline: number): Direction => {
  if (value === baseline) {
    return 'neutral';
  }

  return value > baseline ? 'up' : 'down';
};

const toPercent = (rawValue: number, min: number, max: number): number => ((rawValue - min) / (max - min)) * 100;

const isBaselineInRange = (baseline: number, min: number, max: number): boolean => baseline >= min && baseline <= max;

type TrackSegments = {
  baselinePercent: number;
  baseValue: number;
  gapValue: number;
};

// The base segment covers 0 up to whichever of value/baseline is smaller;
// the accent color only covers the gap between them.
const getTrackSegments = (percent: number, baseline: number, min: number, max: number): TrackSegments => {
  const baselinePercent = toPercent(baseline, min, max);
  const lower = Math.min(percent, baselinePercent);
  const upper = Math.max(percent, baselinePercent);

  return {baselinePercent, baseValue: lower, gapValue: upper - lower};
};

export const StatBar = ({label, value, baseline, min, max}: StatBarProps) => {
  useEffect(() => {
    if (import.meta.env.DEV && !isBaselineInRange(baseline, min, max)) {
      console.warn(
        `StatBar: baseline ('${String(baseline)}') is outside the ['${String(min)}', '${String(max)}'] range for '${label}' — clamping it into range.`,
      );
    }
  }, [baseline, min, max, label]);

  const clampedBaseline = Math.min(Math.max(baseline, min), max);
  const percent = toPercent(value, min, max);
  const direction = getDirection(value, clampedBaseline);
  const color = DIRECTION_COLOR[direction];
  const arrow = DIRECTION_ARROW[direction];
  const {baselinePercent, baseValue, gapValue} = getTrackSegments(percent, clampedBaseline, min, max);
  const isBaseOnly = gapValue <= 0;
  const baseSectionLabel = isBaseOnly ? label : undefined;

  return (
    <div className={classes.root}>
      <div className={classes.labelRow}>
        <span className={classes.label}>{label}</span>
        <span className={classes.value} data-direction={direction}>
          {arrow ? `${arrow} ${String(value)}` : value}
        </span>
      </div>
      <Progress.Root className={classes.track} size="sm" radius={0} transitionDuration={600}>
        <Progress.Section
          aria-label={baseSectionLabel}
          withAria={isBaseOnly}
          value={baseValue}
          color="dark.4"
          className={classes.section}
        />
        {!isBaseOnly ? (
          <Progress.Section aria-label={label} value={gapValue} color={color} className={classes.accentSection} />
        ) : null}
        <span aria-hidden="true" className={classes.marker} style={{left: `${String(baselinePercent)}%`}} />
      </Progress.Root>
    </div>
  );
};
