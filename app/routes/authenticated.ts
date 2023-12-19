import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import CustomSession from 'potber-client/services/custom-session';

export default class AuthenticatedRoute extends Route {
  @service declare session: CustomSession;
  @service declare router: RouterService;

  async beforeModel(transition: any) {
    try {
      this.session.requireAuthentication(transition, 'login');
    } catch (error) {
      this.router.transitionTo('auth.login');
    }
  }

  redirect(model: undefined, transition: any) {
    if (transition.targetName === 'authenticated.index') {
      this.router.transitionTo('authenticated.home');
    }
  }
}
