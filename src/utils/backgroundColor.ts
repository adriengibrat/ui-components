export const backgroundColor = (element: Element, defaultColor = 'white'): string => {
  const bg = getComputedStyle(element).backgroundColor;
  if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') {
    return element.parentElement ? backgroundColor(element.parentElement) : defaultColor;
  }
  return bg;
};
