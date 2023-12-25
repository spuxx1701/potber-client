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
  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      // publicAssetURL is used similarly to Ember CLI's asset fingerprint prepend option.
      publicAssetURL: '/',
      // Embroider lets us send our own options to the style-loader
      cssLoaderOptions: {
        // don't create source maps in production
        sourceMap: process.env.EMBER_ENV !== 'production',
        // enable CSS modules
        modules: {
          // Enable local by default
          mode: 'local',
          // class naming template
          localIdentName:
            process.env.EMBER_ENV !== 'production'
              ? '[sha512:hash:base64:5]'
              : '[path][name]__[local]',
        },
      },
    },
    webpackConfig: {
      module: {
        rules: [
          {
            // When webpack sees an import for a CSS files
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
              {
                // use the PostCSS loader addon
                loader: 'postcss-loader',
                options: {
                  sourceMap: process.env.EMBER_ENV !== 'production',
                  postcssOptions: {
                    config: './postcss.config.js',
                  },
                },
              },
            ],
          },
        ],
      },
    },
  });
};
