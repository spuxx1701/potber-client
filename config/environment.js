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
      API_URL: 'https://api.potber.de',
      FORUM_URL: 'https://forum.mods.de/bb/',
      USER_PAGE_URL: 'https://my.mods.de/',
      MEME_HOST_URL: `https://potber.de`,
      DEBUG: false,
    },
  };

  if (environment === 'development') {
    ENV.APP.API_URL = 'http://localhost:3000';
    ENV.APP.DEBUG = true;
    ENV.APP.MEME_HOST_URL = 'https://test.potber.de';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'development:mobile') {
    ENV.APP.API_URL = 'http://schleppi.fritz.box:3000';
    ENV.APP.DEBUG = true;
    ENV.APP.MEME_HOST_URL = 'https://test.potber.de';
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
    ENV.APP.API_URL = 'https://test-api.potber.de';
    ENV.APP.MEME_HOST_URL = 'https://potber.de';
    ENV.APP.DEBUG = true;
  }

  if (environment === 'production') {
    // Production configuration is the default
  }

  return ENV;
};
