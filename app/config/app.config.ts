import ENV from 'potber-client/config/environment';

export const appConfig = {
  name: 'potber',
  hostname: ENV.APP['HOSTNAME'] as string,
  apiUrl: ENV.APP['API_URL'] as string,
  debug: ENV.APP['DEBUG'] as boolean,
  memeHostUrl: ENV.APP['MEME_HOST_URL'] as string,
  forumUrl: 'https://forum.mods.de/',
  userPageUrl: 'https://my.mods.de/',
};
