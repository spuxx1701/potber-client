import Route from '@ember/routing/route';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';

export default class IndexRoute extends Route {
  @service declare localStorage: LocalStorageService;

  redirect() {
    const landingPage = this.localStorage.getLandingPage();
    switch (landingPage) {
      case 'pot':
        this.transitionTo('board', { queryParams: { BID: '14' } });
        break;
      default:
        this.transitionTo('board-overview');
    }
  }
}
