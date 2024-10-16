import environment from 'potber-client/config/environment';
import { clean } from 'semver';

/**
 * Configuration object for the application.
 */
/**
 * Configuration object for the application.
 */
export const appConfig = {
  /**
   * The name of the application.
   */
  name: 'potber',
  /**
   * The current version of the application.
   */
  version: clean(environment.APP?.version) ?? '0.0.0',
  /**
   * The hostname of the application.
   */
  hostname: window.APP?.HOSTNAME ?? environment.APP.HOSTNAME ?? 'potber.de',
  /**
   * The API URL for the application.
   */
  apiUrl:
    window.APP?.API_URL ?? environment.APP.API_URL ?? 'https://api.potber.de',
  /**
   * The URL for the meme host.
   */
  memeHostUrl:
    window.APP?.MEME_HOST_URL ??
    environment.APP.MEME_HOST_URL ??
    'https://potber.de',
  /**
   * The URL for the forum.
   */
  forumUrl: 'https://forum.mods.de/',
  /**
   * The URL for the user page.
   */
  userPageUrl: 'https://my.mods.de/',
  /**
   * The start date and time of the Christmas season.
   */
  christmasSeasonStart: '12-01T00:00:00+01:00',
  /**
   * The end date and time of the Christmas season.
   */
  christmasSeasonEnd: '12-31T23:59:59+01:00',
  /**
   * The threshold for HTTP timeout warning in milliseconds.
   */
  httpTimeoutWarningThreshold: 5000,
  /**
   * The refresh interval for the newsfeed in milliseconds.
   */
  newsfeedRefreshInterval: 20000,
};
