import {Progress} from '@mantine/core';
import type {CSSProperties} from 'react';
import {useEffect} from 'react';

import {
  DIRECTION_ARROW,
  DIRECTION_COLOR,
  getArrowDirection,
  getDirection,
  isBaselineInRange,
} from '@/common/statDirection.ts';
import {formatMilli, toMilli} from '@/common/statFormat.ts';

import classes from './StatBar.module.css';

// Full 0-100% fill time; each section's duration scales with its share of that
// range so the bar fills at one constant speed instead of two separate beats.
const FILL_DURATION_MS = 400;

type FillStyle = CSSProperties & {
  '--fill-duration': string;
  '--fill-delay': string;
};

const toFillStyle = (percent: number, delayPercent = 0): FillStyle => ({
  '--fill-duration': `${String((percent / 100) * FILL_DURATION_MS)}ms`,
  '--fill-delay': `${String((delayPercent / 100) * FILL_DURATION_MS)}ms`,
});

interface StatBarProps {
  label: string;
  value: number;
  baseline: number;
  min: number;
  max: number;
  invert?: boolean;
  decimals?: number;
  unit?: string;
  disabled?: boolean;
}

const getDisplayValue = (disabled: boolean, arrow: string, formatted: string): string => {
  if (disabled) return '-';

  return arrow ? `${arrow} ${formatted}` : formatted;
};

const toPercent = (rawValue: number, min: number, max: number): number =>
  ((rawValue - min) / (max - min)) * 100;

type TrackSegments = {
  baselinePercent: number;
  baseValue: number;
  gapValue: number;
};

// The base segment covers 0 up to whichever of value/baseline is smaller;
// the accent color only covers the gap between them.
const getTrackSegments = (
  percent: number,
  baseline: number,
  min: number,
  max: number,
): TrackSegments => {
  const baselinePercent = toPercent(baseline, min, max);
  const lower = Math.min(percent, baselinePercent);
  const upper = Math.max(percent, baselinePercent);

  return {baselinePercent, baseValue: lower, gapValue: upper - lower};
};

export const StatBar = ({
  label,
  value,
  baseline,
  min,
  max,
  invert = false,
  decimals = 0,
  unit,
  disabled = false,
}: StatBarProps) => {
  const valueMilli = toMilli(value);
  const baselineMilli = toMilli(baseline);
  const minMilli = toMilli(min);
  const maxMilli = toMilli(max);
  const clampedBaselineMilli = Math.min(Math.max(baselineMilli, minMilli), maxMilli);
  const percent = toPercent(valueMilli, minMilli, maxMilli);
  const direction = getDirection(valueMilli, clampedBaselineMilli, invert);
  const arrowDirection = getArrowDirection(valueMilli, clampedBaselineMilli);
  const color = DIRECTION_COLOR[direction];
  const arrow = DIRECTION_ARROW[arrowDirection];
  const {baselinePercent, baseValue, gapValue} = getTrackSegments(
    percent,
    clampedBaselineMilli,
    minMilli,
    maxMilli,
  );
  const isBaseOnly = gapValue <= 0;
  const baseSectionLabel = isBaseOnly ? label : undefined;
  const formatted = unit
    ? `${formatMilli(valueMilli, decimals)}${unit}`
    : formatMilli(valueMilli, decimals);
  const displayValue = getDisplayValue(disabled, arrow, formatted);

  useEffect(() => {
    if (disabled) return;

    if (import.meta.env.DEV && !isBaselineInRange(baselineMilli, minMilli, maxMilli)) {
      console.warn(
        `StatBar: baseline ('${String(baseline)}') is outside the ['${String(min)}', '${String(max)}'] range for '${label}' — clamping it into range.`,
      );
    }
  }, [disabled, baseline, baselineMilli, min, minMilli, max, maxMilli, label]);

  return (
    <div className={classes.root}>
      <div className={classes.labelRow}>
        <span className={classes.label}>{label}</span>
        <span
          className={classes.value}
          data-direction={!disabled ? direction : undefined}
          data-disabled={disabled}
        >
          {displayValue}
        </span>
      </div>
      <Progress.Root className={classes.track} size="sm" radius={0}>
        {!disabled ? (
          <Progress.Section
            key={`base-${String(value)}`}
            aria-label={baseSectionLabel}
            withAria={isBaseOnly}
            value={baseValue}
            color="dark.4"
            className={classes.section}
            style={toFillStyle(baseValue)}
          />
        ) : null}
        {!disabled && !isBaseOnly ? (
          <Progress.Section
            key={`accent-${String(value)}`}
            aria-label={label}
            value={gapValue}
            color={color}
            className={classes.accentSection}
            style={toFillStyle(gapValue, baseValue)}
          />
        ) : null}
        {!disabled ? (
          <span
            aria-hidden="true"
            className={classes.marker}
            style={{left: `${String(baselinePercent)}%`}}
          />
        ) : null}
      </Progress.Root>
    </div>
  );
};
