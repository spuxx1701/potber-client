import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service declare session: any;
  @service declare router: RouterService;

  async beforeModel(transition: any) {
    try {
      this.session.requireAuthentication(transition, 'login');
    } catch (error) {
      this.router.transitionTo('login');
    }
  }

  redirect(model: undefined, transition: any) {
    if (transition.targetName === 'authenticated.index') {
      this.router.transitionTo('home');
    }
  }
}
