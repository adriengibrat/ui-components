type Fn = () => void;
export const callAll = (...fns: Fn[]): Fn => (): void => fns.forEach((fn: Fn): void => fn());
