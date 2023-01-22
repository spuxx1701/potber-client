import Service, { service } from '@ember/service';
import { transformThread } from './api/transformers/thread';
import ENV from 'potber/config/environment';
import { transformBoardCategories } from './api/transformers/board-category';
import { transformBoard } from './api/transformers/board';
import MessagesService from './messages';
import { transformBookmarksSummary } from './api/transformers/bookmark';

export interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: BodyInit | undefined;
}

const API_URL = `${ENV.APP['API_URL']}`;

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  domParser = new window.DOMParser();

  /**
   * Calls 'boards.php' and returns all board categories with their boards.
   * @returns The board categories.
   */
  async getBoardCategories() {
    this.messages.log(`Retrieving board categories.`, {
      context: this.constructor.name,
    });
    const query = `boards.php`;
    const xmlDocument = await this.fetch(query);
    return transformBoardCategories(xmlDocument);
  }

  /**
   * Calls 'board.php' and returns the board.
   * @param boardId The board ID.
   * @param page (optional) The page number.
   * @returns The board.
   */
  async getBoard(boardId: string, page?: number) {
    this.messages.log(`Retrieving board '${boardId}' (page: ${page}).`, {
      context: this.constructor.name,
    });
    let query = `board.php?BID=${boardId}`;
    if (page) query += `&page=${page}`;
    const xmlDocument = await this.fetch(query);
    // Throw an error if the board could not be found
    if (
      !xmlDocument.children[0] ||
      xmlDocument.children[0].nodeName === 'invalid-board'
    ) {
      throw new Error('not-found');
    }
    const board = transformBoard(xmlDocument.children[0]);
    return board;
  }

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

  /**
   * The fetch wrapper that is used by all of the ApiService getters.
   * @param query The query.
   * @param options (optional) Fetch options.
   * @returns The result.
   */
  async fetch(query: string, options?: FetchOptions) {
    const response = await fetch(`${API_URL}${query}`, {
      method: options?.method || 'GET',
      body: options?.body,
      credentials: 'include',
    });
    const xmlObject = await this.parseXml(response);
    return xmlObject;
  }

  /**
   * Pares an XML response to an XML object.
   * @param response The response object.
   * @returns The XML object.
   */
  async parseXml(response: Response) {
    const text = await response.text();
    const xmlDocument = this.domParser.parseFromString(text, 'text/xml');
    return xmlDocument;
  }
}
