import Cookie from 'ember-simple-auth/session-stores/cookie';

export default class ApplicationSessionStore extends Cookie {
  cookieName = 'potber-session';
  cookieExpirationTime = 365 * 24 * 60 * 60;
  sameSite = 'strict';
}
