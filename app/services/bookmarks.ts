import { service } from '@ember/service';
import ApiService from './api';
import MessagesService from './messages';
import { transformBookmarksSummary } from './api/transformers/bookmark';
import NewsFeedService from './news-feed';
import { Bookmark } from './api/types/bookmark';

export default class BookmarksService extends ApiService {
  @service declare messages: MessagesService;
  @service declare newsFeed: NewsFeedService;

  /**
   * Calls 'bookmarks.php' and returns a summary of all bookmarks.
   * @returns The bookmarks summary.
   */
  async getBookmarksSummary() {
    this.messages.log(`Retrieving bookmarks.`, {
      context: this.constructor.name,
    });
    const xmlDocument = await this.fetch(`bookmarks.php`);
    return transformBookmarksSummary(xmlDocument);
  }

  async deleteBookmark(bookmark: Bookmark) {
    this.messages.log(`Attempting to delete bookmark ${bookmark.id}.`, {
      context: this.constructor.name,
    });
    await this.fetch(
      `async/remove-bookmark.php?BMID=${bookmark.id}&token=${bookmark.removeToken}`,
      {
        method: 'DELETE',
        useForumUrl: true,
      }
    );
    this.messages.log(`Deleted bookmark ${bookmark.id}.`, {
      context: this.constructor.name,
      type: 'success',
    });
    this.newsFeed.refreshBookmarks();
  }
}
