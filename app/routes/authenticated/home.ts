import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from 'potber-client/services/custom-store';
import LocalStorageService from 'potber-client/services/local-storage';
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
  @service declare store: CustomStore;
  @service declare localStorage: LocalStorageService;

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
    const bookmarks = await this.store.findAll('bookmark');
    const unreadBookmarks = bookmarks.filter(
      (bookmark) => bookmark.newPostsCount > 0
    );
    await this.localStorage.getBoardFavorites();

    return RSVP.hash({
      session,
      unreadBookmarks,
    });
  }
}
