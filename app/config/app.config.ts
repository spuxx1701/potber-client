import ENV from 'potber-client/config/environment';

export const appConfig = {
  name: 'potber',
  hostname: ENV.APP['HOSTNAME'] as string,
  apiUrl: ENV.APP['API_URL'] as string,
  debug: ENV.APP['DEBUG'] as boolean,
  memeHostUrl: ENV.APP['MEME_HOST_URL'] as string,
  forumUrl: 'https://forum.mods.de/',
  userPageUrl: 'https://my.mods.de/',
  christmasSeasonStart: '12-01T00:00:00+01:00',
  christmasSeasonEnd: '12-31T23:59:59+01:00',
  /**
   * The default user group id. Other group ids define mods, admins and the like.
   */
  standardUserGroupId: '3',
};
