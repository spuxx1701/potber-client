import { service } from '@ember/service';
import ApiService from './api';
import MessagesService from './messages';
import { transformThread } from './api/transformers/thread';

export default class ThreadsService extends ApiService {
  @service declare messages: MessagesService;

  /**
   * Calls 'thread.php' and returns the thread.
   * @param threadId The thread ID.
   * @param options (optional) More options.
   * @returns The thread.
   */
  async getThread(
    threadId: string,
    options?: { postId?: string; page?: number }
  ) {
    this.messages.log(
      `Retrieving thread '${threadId}' (postId: ${options?.postId}, page: ${options?.page}).`,
      {
        context: this.constructor.name,
      }
    );
    let query = `thread.php?TID=${threadId}`;
    if (options?.postId) {
      query += `&PID=${options?.postId}`;
    } else if (options?.page) {
      query += `&page=${options?.page}`;
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
    return thread;
  }
}
