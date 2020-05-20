import { nodeList } from './nodeList';

export const getLabels = (element: HTMLElement): NodeListOf<HTMLLabelElement> => {
  const closest = element.closest('label');
  const labels = document.querySelectorAll<HTMLLabelElement>(
    `label[for="${element.getAttribute('id')}"]`,
  );
  return closest ? nodeList<HTMLLabelElement>(document, closest, labels) : labels;
};
