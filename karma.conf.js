const { createDefaultConfig } = require('@open-wc/testing-karma');

module.exports = config => {
  const karmaConfig = createDefaultConfig(config);
  karmaConfig.esm = {
    babel: true,
    nodeResolve: true,
    fileExtensions: ['.ts'],
  };
  karmaConfig.files.push({
    pattern: karmaConfig.grep || 'src/**/*.spec.ts',
    type: 'module',
  });
  config.set(karmaConfig);
  return config;
};
