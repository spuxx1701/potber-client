import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Bookmark } from './api/types/bookmark';
import BookmarksService from './bookmarks';

export default class NewsFeedService extends Service {
  @service declare bookmarks: BookmarksService;

  @tracked unreadBookmarks: Bookmark[] | null = null;

  async refresh() {
    await this.refreshBookmarks();
  }

  async refreshBookmarks() {
    const bookmarksSummary = await this.bookmarks.getBookmarksSummary();
    if (bookmarksSummary) {
      this.unreadBookmarks = [
        ...bookmarksSummary.bookmarks.filter(
          (bookmark) => bookmark.newPostsCount > 0
        ),
      ];
    } else this.unreadBookmarks = null;
  }
}
