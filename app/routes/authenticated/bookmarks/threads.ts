import { service } from '@ember/service';
import SlowRoute from 'potber-client/routes/slow';
import CustomStore from 'potber-client/services/custom-store';

export default class BookmarksThreadsRoute extends SlowRoute {
  @service declare store: CustomStore;

  async model() {
    const bookmarks = await this.store.getBookmarks();
    return { bookmarks };
  }
}
