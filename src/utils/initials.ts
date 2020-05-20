export const initials = (name: string): string =>
  name
    .trim()
    .split(/[\s.-]/, 2)
    .map(x => x.charAt(0).toUpperCase())
    .join(' ');
