import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import SettingsService, { LandingPage } from 'potber-client/services/settings';

export default class HomeRoute extends Route {
  @service declare settings: SettingsService;
  @service declare router: RouterService;

  redirect() {
    const landingPage = this.settings.landingPage;
    switch (landingPage) {
      case LandingPage.pot:
        this.router.transitionTo('authenticated.board', {
          queryParams: { BID: '14' },
        });
        break;
      default:
        this.router.transitionTo('authenticated.board-overview');
    }
  }
}
