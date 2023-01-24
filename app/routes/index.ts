import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';

export default class IndexRoute extends Route {
  @service declare router: RouterService;
  @service declare localStorage: LocalStorageService;

  redirect() {
    const landingPage = this.localStorage.getLandingPage();
    switch (landingPage) {
      case 'pot':
        this.router.transitionTo('board', { queryParams: { BID: '14' } });
        break;
      default:
        this.router.transitionTo('board-overview');
    }
  }
}
