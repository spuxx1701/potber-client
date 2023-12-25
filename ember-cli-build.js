'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
      plugins: [
        ...require('ember-cli-code-coverage').buildBabelPlugin(),
        '@babel/plugin-proposal-export-namespace-from',
      ],
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },
    fingerprint: {
      enabled:
        process.env.EMBER_ENV === 'production' ||
        process.env.EMBER_ENV === 'staging',
      exclude: ['images'],
    },
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack);
};
