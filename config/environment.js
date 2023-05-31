'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'potber-client',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      API_URL: 'http://localhost:3000',
      FORUM_URL: 'https://forum.mods.de/bb/',
      USER_PAGE_URL: 'https://my.mods.de/',
      MEME_HOST_URL: `https://potber.de`,
      DEBUG: false,
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    ENV.APP.DEBUG = true;
    ENV.APP.MEME_HOST_URL = 'https://potber-test.spuxx.dev';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.APP.MEME_HOST_URL = 'https://test.potber.de';

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.APP.API_URL = 'https://potber-api-test.spuxx.dev';
    ENV.APP.MEME_HOST_URL = 'https://potber-test.spuxx.dev';
    ENV.APP.DEBUG = true;
  }

  if (environment === 'production') {
    ENV.APP.API_URL = 'https://potber-api.spuxx.dev';
    ENV.APP.MEME_HOST_URL = 'https://potber.spuxx.dev';
    ENV.APP.DEBUG = false;
  }

  return ENV;
};
