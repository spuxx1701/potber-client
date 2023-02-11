import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'potber-client/config/environment';

export default class OAuth2Authenticator extends OAuth2PasswordGrantAuthenticator {
  serverTokenEndpoint = ENV.APP.API_URL + '/auth/login';
}
