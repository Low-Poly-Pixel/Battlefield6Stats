import type {MantineColor} from '@mantine/core';

export type Direction = 'up' | 'down' | 'neutral';

export const DIRECTION_COLOR: Record<Direction, MantineColor> = {
  up: 'green',
  down: 'red',
  neutral: 'dark',
};
export const DIRECTION_ARROW: Record<Direction, string> = {up: '▲', down: '▼', neutral: ''};

export const getArrowDirection = (value: number, baseline: number): Direction => {
  if (value === baseline) return 'neutral';

  return value > baseline ? 'up' : 'down';
};

const flipDirection = (direction: Direction): Direction => {
  if (direction === 'up') return 'down';

  if (direction === 'down') return 'up';

  return 'neutral';
};

export const getDirection = (value: number, baseline: number, invert: boolean): Direction => {
  const rawDirection = getArrowDirection(value, baseline);

  return invert ? flipDirection(rawDirection) : rawDirection;
};

export const isBaselineInRange = (baseline: number, min: number, max: number): boolean =>
  baseline >= min && baseline <= max;
