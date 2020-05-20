export const shadow = (element: Element, selector: string): Element | null =>
  element.shadowRoot?.querySelector(selector) || null;

const hyphen = (name: string): string => name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

export const style = (element: Element, pseudoElement?: string): Record<string, string> =>
  (new Proxy(getComputedStyle(element, pseudoElement), {
    get(styles, property: string): string {
      return styles.getPropertyValue(hyphen(property.toString()));
    },
  }) as unknown) as Record<string, string>;

export const trigger = (node: Node, event: string, type = 'MouseEvents'): boolean => {
  const mouseEvent = document.createEvent(type);
  mouseEvent.initEvent(event, true, true);
  return node.dispatchEvent(mouseEvent);
};

type StoredEventListener = { type: string; listener: EventHandlerNonNull };
export const mockEventListeners = (): [StoredEventListener[], () => void] => {
  const eventListeners: StoredEventListener[] = [];
  const { addEventListener, removeEventListener } = Node.prototype;
  Object.assign(Node.prototype, {
    addEventListener(
      type: string,
      listener: EventHandlerNonNull,
      options?: boolean | EventListenerOptions,
    ): void {
      eventListeners.push({ type, listener });
      addEventListener.call(this, type, listener, options);
    },
    removeEventListener(
      _type: string,
      _listener: EventHandlerNonNull,
      options?: boolean | EventListenerOptions,
    ): void {
      const index = eventListeners.findIndex(
        ({ type, listener }: StoredEventListener) => type === _type && listener === _listener,
      );
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
      removeEventListener.call(this, _type, _listener, options);
    },
  });
  return [
    eventListeners,
    // clean up
    (): void => {
      Object.assign(Node.prototype, { addEventListener, removeEventListener });
    },
  ];
};
