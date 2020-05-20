type EventStopListening = () => void;

export const on = (
  event: string,
  listener: EventListenerOrEventListenerObject,
  ...targets: EventTarget[]
): EventStopListening => {
  targets.forEach(target => target.addEventListener(event, listener));
  return (): void => targets.forEach(target => target.removeEventListener(event, listener));
};
