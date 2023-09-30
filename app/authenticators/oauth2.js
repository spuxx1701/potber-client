import { makeArray } from '@ember/array';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'potber-client/config/environment';
import RSVP from 'rsvp';

export default class OAuth2Authenticator extends OAuth2PasswordGrantAuthenticator {
  serverTokenEndpoint = ENV.APP.API_URL + '/auth/login';

  /**
   * Override the default authenticate method since we need to also provide
   * the session lifetime.
   */
  authenticate(identification, password, lifetime, scope = [], headers = {}) {
    return new RSVP.Promise((resolve, reject) => {
      const data = {
        grant_type: 'password',
        username: identification,
        password,
        lifetime,
      };
      const serverTokenEndpoint = this.serverTokenEndpoint;

      const scopesString = makeArray(scope).join(' ');
      if (!isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data, headers).then(
        (response) => {
          run(() => {
            if (!this._validate(response)) {
              reject('access_token is missing in server response');
            }

            const expiresAt = this._absolutizeExpirationTime(
              response['expires_in'],
            );
            this._scheduleAccessTokenRefresh(
              response['expires_in'],
              expiresAt,
              response['refresh_token'],
            );
            if (!isEmpty(expiresAt)) {
              response = Object.assign(response, { expires_at: expiresAt });
            }

            resolve(response);
          });
        },
        (response) => {
          run(null, reject, response);
        },
      );
    });
  }
}
