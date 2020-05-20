export const dispatch = (
  element: Element,
  type: string,
  { eventInterface = 'Event', bubbles = true, cancelable = true } = {},
): boolean => {
  const event = element.ownerDocument?.createEvent(eventInterface);
  event?.initEvent(type, bubbles, cancelable);
  return !!event && element.dispatchEvent(event);
};
