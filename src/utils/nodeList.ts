const mark = 'wrapNodeList__';
const walk = (nodes: (NodeList | Element)[], fn: (node: Element) => void): void =>
  nodes.forEach(element =>
    element instanceof NodeList ? element.forEach(node => fn(node as Element)) : fn(element),
  );

export const nodeList = <E extends Element>(
  context: Document | Element,
  ...nodes: (NodeList | Element)[]
): NodeListOf<E> => {
  walk(nodes, element => element.setAttribute(mark, 'true'));
  const list = context.querySelectorAll<E>(`[${mark}]`);
  walk(nodes, element => element.removeAttribute(mark));
  return list;
};
