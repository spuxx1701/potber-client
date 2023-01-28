import { service } from '@ember/service';
import ApiService from './api';
import MessagesService from './messages';
import { transformBookmarksSummary } from './api/transformers/bookmark';

export default class BookmarksService extends ApiService {
  @service declare messages: MessagesService;
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
}
