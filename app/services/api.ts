import Service from '@ember/service';
import { transformThread } from './api/transformers/thread';
import ENV from 'potber/config/environment';
import { transformBoardCategories } from './api/transformers/board-category';
import { transformBoard } from './api/transformers/board';
import { BoardXml } from './api/types/board';
import { ThreadXml } from './api/types/thread';

export interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: BodyInit | undefined;
}

const API_URL = `${ENV.APP['PROXY_URL']}/${ENV.APP['API_URL']}`;

export default class ApiService extends Service {
  domParser = new window.DOMParser();

  async getBoardCategories() {
    const query = `boards.php`;
    const xmlDocument = await this.fetch(query);
    return transformBoardCategories(xmlDocument);
  }

  async getBoard(boardId: string, page?: number) {
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
    const board = transformBoard(xmlDocument.children[0] as any as BoardXml);
    return board;
  }

  async getThread(threadId: string, page?: number) {
    let query = `thread.php?TID=${threadId}`;
    if (page) query += `&page=${page}`;
    const xmlDocument = await this.fetch(query);
    // Throw an error if the thread could not be found
    if (
      !xmlDocument.children[0] ||
      xmlDocument.children[0].nodeName === 'invalid-thread'
    ) {
      throw new Error('not-found');
    }
    const thread = transformThread(xmlDocument.children[0] as any as ThreadXml);
    // Throw an error if the posts count is 0 since that means the page does not exist
    if (!thread.page || thread.page.posts.length <= 0) {
      throw new Error('not-found');
    }
    return thread;
  }

  async fetch(query: string, options?: FetchOptions) {
    const response = await fetch(`${API_URL}${query}`, {
      method: options?.method || 'GET',
      body: options?.body,
    });
    const xmlObject = await this.parseXml(response);
    return xmlObject;
  }

  async parseXml(response: Response) {
    const text = await response.text();
    const xmlDocument = this.domParser.parseFromString(text, 'text/xml');
    return xmlDocument;
  }
}
