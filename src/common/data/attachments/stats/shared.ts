export const optionStat = <T>(
  map: Map<string, T>,
  id: string | null,
  get: (item: T) => number | undefined,
): number | undefined => {
  if (id === null) return undefined;

  const item = map.get(id);

  return item ? get(item) : undefined;
};
