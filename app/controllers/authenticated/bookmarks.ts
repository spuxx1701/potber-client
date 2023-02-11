import Controller from '@ember/controller';
import { BookmarksSummary } from 'potber-client/services/api/types/bookmark';

export default class BookmarksController extends Controller {
  declare model: BookmarksSummary;

  get status() {
    if (!this.model) {
      return 'error';
    } else if (this.model.bookmarks.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
