'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'potber',
    short_name: 'potber',
    description: '',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#293746',
    theme_color: '#091827',
    icons: [
      {
        src: 'images/logo/192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#091827',
    },
  };
};
