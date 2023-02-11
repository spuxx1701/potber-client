import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import LocalStorageService from 'potber-client/services/local-storage';
import NewsFeedService from 'potber-client/services/news-feed';

export default class AuthenticatedRoute extends Route {
  @service declare session: any;
  @service declare router: RouterService;
  @service declare localStorage: LocalStorageService;
  @service declare newsFeed: NewsFeedService;

  async beforeModel(transition: Transition<unknown>) {
    try {
      this.session.requireAuthentication(transition, 'login');
    } catch (error) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    await this.localStorage.getBoardFavorites();
    this.newsFeed.refresh();
  }
}
