import ENV from 'potber-client/config/environment';

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
   * The hostname of the application.
   */
  hostname: (ENV.APP['HOSTNAME'] as string | undefined) ?? 'potber.de',
  /**
   * The API URL for the application.
   */
  apiUrl: (ENV.APP['API_URL'] as string | undefined) ?? 'https://api.potber.de',
  /**
   * Flag indicating whether debug mode is enabled.
   */
  debug: (ENV.APP['DEBUG'] as boolean | undefined) ?? false,
  /**
   * The URL for the meme host.
   */
  memeHostUrl:
    (ENV.APP['MEME_HOST_URL'] as string | undefined) ?? 'https://potber.de',
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
   * The default user group id. Other group ids define mods, admins and the like.
   */
  standardUserGroupId: '3',
  /**
   * The refresh interval for the newsfeed in milliseconds.
   */
  newsfeedRefreshInterval: 20000,
};
