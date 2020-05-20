const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    'storybook-prebuilt/addon-actions/register.js',
    'storybook-prebuilt/addon-knobs/register.js',
    'storybook-prebuilt/addon-a11y/register.js',
    'storybook-prebuilt/addon-docs/register.js',
  ],
   // Configuration for es-dev-server (start-storybook only)
  esDevServer: {
    babel: true,
    fileExtensions: extensions,
  },
  // Configuration for rollup (build-storybook only)
  rollup(config) {
    const indexOf = plugin => config.plugins.findIndex(({name}) => name === plugin)
    config.plugins[indexOf('node-resolve')] = nodeResolve({ extensions });
    config.plugins[indexOf('babel')] = babel({ extensions, babelHelpers: 'bundled' });
    return config;
  },
};
