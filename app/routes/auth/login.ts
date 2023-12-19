import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { authConfig } from 'potber-client/config/auth.config';
import CustomSession from 'potber-client/services/custom-session';

export default class AuthLoginRoute extends Route {
  @service declare router: RouterService;
  @service declare session: CustomSession;

  beforeModel() {
    if (this.session.isAuthenticated) {
      this.router.transitionTo('authenticated.authenticated.home');
    } else {
      const url =
        `${authConfig.issuerUrl}${authConfig.authorizeEndpoint}` +
        `?response_type=token` +
        `&client_id=${authConfig.clientId}` +
        `&redirect_uri=${encodeURIComponent(authConfig.redirectUri)}`;
      window.location.href = url;
    }
  }
}
