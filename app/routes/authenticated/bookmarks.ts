import Route from '@ember/routing/route';
import { service } from '@ember/service';
import BookmarksService from 'potber-client/services/bookmarks';

export default class BookmarksRoute extends Route {
  @service declare bookmarks: BookmarksService;

  async model() {
    return await this.bookmarks.getBookmarksSummary();
  }
}
