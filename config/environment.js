'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'potber-client',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
    },

    APP: {
      HOSTNAME: 'potber.de',
      API_URL: 'https://api.potber.de',
      AUTH_ISSUER_URL: 'https://auth.potber.de',
      MEME_HOST_URL: `https://potber.de`,
      DEBUG: false,
    },
  };

  if (environment === 'development') {
    ENV.APP.HOSTNAME = 'localhost:4200';
    ENV.APP.API_URL = 'http://localhost:3000';
    ENV.APP.AUTH_ISSUER_URL = 'http://localhost:5173';
    ENV.APP.DEBUG = true;
    ENV.APP.MEME_HOST_URL = 'https://test.potber.de';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'development:remote') {
    ENV.APP.HOSTNAME = 'localhost:4200';
    ENV.APP.API_URL = 'https://test-api.potber.de';
    ENV.APP.AUTH_ISSUER_URL = 'https://test-auth.potber.de';
    ENV.APP.MEME_HOST_URL = 'https://potber.de';
    ENV.APP.DEBUG = true;
  }

  if (environment === 'development:mobile') {
    ENV.APP.HOSTNAME = 'schleppi.fritz.box:4200';
    ENV.APP.API_URL = 'https://test-api.potber.de';
    ENV.APP.AUTH_ISSUER_URL = 'https://test-auth.potber.de';
    ENV.APP.MEME_HOST_URL = 'https://potber.de';
    ENV.APP.DEBUG = true;
  }

  if (environment === 'test') {
    ENV.APP.HOSTNAME = 'test.potber.de';
    ENV.APP.MEME_HOST_URL = 'https://test.potber.de';

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
