import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from './custom-store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;

  @tracked unreadBookmarks: Bookmark[] | null = null;

  async refresh() {
    await this.refreshBookmarks();
  }

  async refreshBookmarks() {
    try {
      const bookmarks = await this.store.getBookmarks();
      this.unreadBookmarks = [
        ...bookmarks.filter((bookmark) => bookmark.newPostsCount > 0),
      ];
    } catch (error) {
      this.unreadBookmarks = null;
    }
  }
}
