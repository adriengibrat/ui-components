import {
  addParameters,
  addDecorator,
  setCustomElements,
  withA11y,
  withKnobs,
} from '@open-wc/demoing-storybook';

addDecorator(withA11y);
addDecorator(withKnobs);
addParameters({
  options: {
    showRoots: true,
    panelPosition: 'bottom',
  },
  backgrounds: [
    { name: 'light', value: 'white', default: true },
    { name: 'dark', value: '#121212' },
  ],
});

(async () => {
  const customElementsRequest = await fetch(new URL('../custom-elements.json', import.meta.url));
  setCustomElements(await customElementsRequest.json());
})();
