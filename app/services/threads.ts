import { service } from '@ember/service';
import ApiService from './api';
import MessagesService from './messages';
import { transformThread } from './api/transformers/thread';
import NewsFeedService from './news-feed';

export default class ThreadsService extends ApiService {
  @service declare messages: MessagesService;
  @service declare newsFeed: NewsFeedService;

  /**
   * Calls 'thread.php' and returns the thread.
   * @param threadId The thread ID.
   * @param options (optional) More options.
   * @returns The thread.
   */
  async getThread(
    threadId: string,
    options?: { postId?: string; page?: number; updateBookmark?: boolean }
  ) {
    const { postId, page, updateBookmark = true } = options || {};
    this.messages.log(
      `Retrieving thread '${threadId}' (postId: ${postId}, page: ${page}).`,
      {
        context: this.constructor.name,
      }
    );
    let query = `thread.php?TID=${threadId}`;
    if (postId) {
      query += `&PID=${postId}`;
    } else if (page) {
      query += `&page=${page}`;
    }
    if (updateBookmark) {
      query += '&update_bookmark=1';
    }
    const xmlDocument = await this.fetch(query);
    // Throw an error if the thread could not be found
    if (
      !xmlDocument.children[0] ||
      xmlDocument.children[0].nodeName === 'invalid-thread'
    ) {
      throw new Error('not-found');
    }
    const thread = transformThread(xmlDocument.children[0]);
    // Throw an error if the posts count is 0 since that means the page does not exist
    if (!thread.page || thread.page.posts.length <= 0) {
      throw new Error('not-found');
    }
    // Refresh news feed if necessary
    if (updateBookmark) {
      this.newsFeed.refreshBookmarks();
    }
    return thread;
  }
}
