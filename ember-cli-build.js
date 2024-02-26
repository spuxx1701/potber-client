'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const isProduction = process.env.EMBER_ENV === 'production';

  const app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline',
      plugins: [
        ...require('ember-cli-code-coverage').buildBabelPlugin({
          embroider: true,
        }),
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
      cssLoaderOptions: {
        sourceMap: !isProduction,
        modules: {
          auto: true,
          localIdentName: '[local]__[sha512:hash:base64:5]',
        },
      },
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              exclude: /node_modules/,
              use: [
                {
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
