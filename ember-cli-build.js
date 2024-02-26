'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const isProduction = process.env.EMBER_ENV === 'production';

  const app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
      plugins: [
        ...require('ember-cli-code-coverage').buildBabelPlugin(),
        '@babel/plugin-proposal-export-namespace-from',
      ],
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    sourcemaps: {
      enabled: !isProduction,
      extensions: ['js'],
    },
  });

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      publicAssetURL: '/',
      // Embroider lets us send our own options to the style-loader
      cssLoaderOptions: {
        // don't create source maps in production
        sourceMap: !isProduction,
        // enable CSS modules
        modules: {
          // Enable local by default
          mode: 'local',
          // class naming template
          localIdentName: '[local]__[sha512:hash:base64:5]',
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
                    sourceMap: !isProduction,
                    postcssOptions: {
                      plugins: [require('autoprefixer')],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });
};
