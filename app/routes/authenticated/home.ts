import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from 'potber-client/services/custom-store';
import LocalStorageService from 'potber-client/services/local-storage';
import NewsfeedService from 'potber-client/services/newsfeed';
import SessionService from 'potber-client/services/session';
import SettingsService, { LandingPage } from 'potber-client/services/settings';
import RSVP from 'rsvp';

export interface HomeRouteModel {
  unreadBookmarks: Bookmark[];
}

export default class HomeRoute extends Route {
  @service declare session: SessionService;
  @service declare settings: SettingsService;
  @service declare router: RouterService;
  @service declare localStorage: LocalStorageService;
  @service declare newsfeed: NewsfeedService;

  beforeModel() {
    const landingPage = this.settings.landingPage;
    switch (landingPage) {
      case LandingPage.pot:
        this.router.transitionTo('authenticated.board', {
          queryParams: { BID: '14' },
        });
        break;
      case LandingPage.boardOverview:
        this.router.transitionTo('authenticated.board-overview');
        break;
      default:
        break;
    }
  }

  async model() {
    const session = await this.session.getSessionData();
    this.localStorage.getBoardFavorites();
    this.newsfeed.refresh();

    return RSVP.hash({
      session,
    });
  }
}
