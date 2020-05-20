const sdbmcode = (value: number, character: string): number =>
  // eslint-disable-next-line no-bitwise
  character.charCodeAt(0) + (value << 6) + (value << 16) - value;
const hash = (string: string, init = 0): number => Array.from(string).reduce(sdbmcode, init);
const scale = (n: number, max: number, min = 0): number =>
  ((Math.cos(n) + 1) / 2) * (max - min) + min;
const hsl = (
  base: number,
  settings = { hue: [0, 360], saturation: [0, 100], light: [0, 100] },
): Record<string, number> =>
  Object.fromEntries(
    Object.entries(settings).map(([key, [min, max]]) => [key, scale(hash(key, base), max, min)]),
  );

export const color = (
  source: string,
  settings = { hue: [0, 360], saturation: [60, 80], light: [30, 40] },
): string => {
  const { hue, saturation, light } = hsl(hash(source), settings);
  return `hsl(${hue}, ${saturation}%, ${light}%)`;
};
