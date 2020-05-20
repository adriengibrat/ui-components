import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import dts from 'rollup-plugin-dts'

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  input: './src/index.ts',
  external: ['@babel/runtime'],
  manualChunks(id) {
    if (id.includes('node_modules/'))
      return 'vendors';
    if (id.includes('src/theming/') || id.includes('src/utils/') )
      return 'helpers';
    const component = id.match(/src\/components\/([^/]+)/);
    if (component)
      return component.pop();
  },
  output: {
    dir: 'lib/browser',
    format: 'es',
    chunkFileNames: '[name].js',
  },
  plugins: [
    resolve({ extensions }),
    babel({ extensions, babelHelpers: isProduction ? 'runtime': 'bundled' }),
    terser(),
    visualizer(),
  ]
};

export default [
  config,
  {
    ...config,
    external: config.external.concat(['lit-element', /lit-html/]),
    output: {
      ...config.output,
      dir: 'lib/unpkg'
    }
  },
  {
    input: 'lib/typings/index.d.ts',
    output: [{ file: 'lib/ui-components.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
