module.exports = api => {
  const inProduction = api.env('production');
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      '@babel/preset-typescript',
    ],
    plugins: [
      inProduction && ['@babel/plugin-transform-runtime', { useESModules: true, version: "7.10.3" }],
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ].filter(Boolean),
  };
};
