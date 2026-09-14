import type {MantineColor} from '@mantine/core';

export type Direction = 'up' | 'down' | 'neutral';

export const DIRECTION_COLOR: Record<Direction, MantineColor> = {
  up: 'green',
  down: 'red',
  neutral: 'dark',
};
export const DIRECTION_ARROW: Record<Direction, string> = {up: '▲', down: '▼', neutral: ''};

const getRawDirection = (value: number, baseline: number): Direction => {
  if (value === baseline) return 'neutral';

  return value > baseline ? 'up' : 'down';
};

const flipDirection = (direction: Direction): Direction => {
  if (direction === 'up') return 'down';

  if (direction === 'down') return 'up';

  return 'neutral';
};

// For an inverted stat (lower raw value = better, e.g. ADS time) up/down must
// be swapped so coloring/arrows track "better or worse" rather than the raw
// number's direction.
export const getDirection = (value: number, baseline: number, invert: boolean): Direction => {
  const rawDirection = getRawDirection(value, baseline);

  return invert ? flipDirection(rawDirection) : rawDirection;
};

export const isBaselineInRange = (baseline: number, min: number, max: number): boolean =>
  baseline >= min && baseline <= max;
