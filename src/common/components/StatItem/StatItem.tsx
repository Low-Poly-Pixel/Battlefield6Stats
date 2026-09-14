import type {ReactNode} from 'react';
import {useEffect} from 'react';

import {DIRECTION_ARROW, getDirection, isBaselineInRange} from '@/common/statDirection.ts';
import {formatMilli, toMilli} from '@/common/statFormat.ts';

import classes from './StatItem.module.css';

interface StatItemProps {
  label: string;
  value: number;
  baseline: number;
  min: number;
  max: number;
  invert?: boolean;
  icon?: ReactNode;
  unit?: string;
  decimals?: number;
  disabled?: boolean;
}

const formatValue = (value: string, unit?: string) => (unit ? `${value}${unit}` : value);

const getDisplayValue = (disabled: boolean, arrow: string, value: string): string => {
  if (disabled) return '-';

  return arrow ? `${arrow} ${value}` : value;
};

export const StatItem = ({
  label,
  value,
  baseline,
  min,
  max,
  invert = false,
  icon,
  unit,
  decimals = 0,
  disabled = false,
}: StatItemProps) => {
  const valueMilli = toMilli(value);
  const baselineMilli = toMilli(baseline);
  const minMilli = toMilli(min);
  const maxMilli = toMilli(max);
  const direction = getDirection(valueMilli, baselineMilli, invert);
  const arrow = DIRECTION_ARROW[direction];
  const formattedValue = formatValue(formatMilli(valueMilli, decimals), unit);
  const displayValue = getDisplayValue(disabled, arrow, formattedValue);

  useEffect(() => {
    if (disabled) return;

    if (import.meta.env.DEV && !isBaselineInRange(baselineMilli, minMilli, maxMilli)) {
      console.warn(
        `StatItem: baseline ('${String(baseline)}') is outside the ['${String(min)}', '${String(max)}'] range for '${label}'.`,
      );
    }
  }, [disabled, baseline, baselineMilli, min, minMilli, max, maxMilli, label]);

  return (
    <div className={classes.root}>
      <div className={classes.labelRow}>
        <span className={classes.label}>{label}</span>
        <span className={classes.valueGroup}>
          {icon ? (
            <span className={classes.icon} aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <span
            key={value}
            className={classes.value}
            data-direction={!disabled ? direction : undefined}
            data-disabled={disabled}
          >
            {displayValue}
          </span>
        </span>
      </div>
    </div>
  );
};
