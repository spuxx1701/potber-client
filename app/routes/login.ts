import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

/**
 * This route is here to achieve backwards compatibility for users that
 * may have bookmarked the old login route.
 */
export default class LoginRoute extends Route {
  @service declare router: RouterService;

  beforeModel() {
    this.router.transitionTo('auth.login');
  }
}
