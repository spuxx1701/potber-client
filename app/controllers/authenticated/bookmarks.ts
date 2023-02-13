import Controller from '@ember/controller';
import Bookmark from 'potber-client/models/bookmark';

export default class BookmarksController extends Controller {
  declare model: Bookmark[];

  get status() {
    if (!this.model) {
      return 'error';
    } else if (this.model.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
