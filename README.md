# \<ui-components>

This webcomponents follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i ui-components
```

## Usage
Import individual component
```html
<script type="module" src="./lib/browser/ui-button.js"></script>
<ui-button>button</ui-button>
```

Import all components
```html
<script type="module" src="./lib/browser/index.js"></script>
<ui-button>button</ui-button>
<ui-avatar>email@example.com</ui-avatar>
...
```

## Linting with ESLint, Prettier, and Types
To automatically fix the project linting errors, run
```bash
npm run lint
```

## Testing

To run the suite of tests, run
```bash
npm test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run
```bash
npm start
```

To build a docs version of Storybook, run
```bash
npm run docs
```
