import { service } from '@ember/service';
import SlowRoute from 'potber-client/routes/base/slow';
import BookmarkStore from 'potber-client/services/stores/bookmark';

export default class BookmarksThreadsRoute extends SlowRoute {
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;

  async model() {
    const bookmarks = await this.bookmarkStore.getAll({ reload: true });
    return { bookmarks };
  }
}
