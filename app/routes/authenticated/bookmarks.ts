import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

export default class BookmarksRoute extends Route {
  @service declare router: RouterService;

  redirect(): void {
    this.router.transitionTo('authenticated.bookmarks.threads');
  }
}
