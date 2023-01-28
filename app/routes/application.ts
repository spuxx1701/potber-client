import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RSVP from 'rsvp';
import AppService from 'potber/services/app';
import BookmarksService from 'potber/services/bookmarks';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;
  @service declare bookmarks: BookmarksService;

  async beforeModel() {
    this.app.initialize();
  }

  async model() {
    return RSVP.hash({
      bookmarksSummary: await this.bookmarks.getBookmarksSummary(),
    });
  }
}
