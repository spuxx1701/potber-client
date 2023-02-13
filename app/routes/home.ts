import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber-client/services/local-storage';

export default class HomeRoute extends Route {
  @service declare localStorage: LocalStorageService;
  @service declare router: RouterService;

  redirect() {
    const landingPage = this.localStorage.getLandingPage();
    switch (landingPage) {
      case 'pot':
        this.router.transitionTo('authenticated.board', {
          queryParams: { BID: '14' },
        });
        break;
      default:
        this.router.transitionTo('authenticated.board-overview');
    }
  }
}
