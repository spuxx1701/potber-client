import Service from '@ember/service';
import { transformThread } from './api/transformers/thread';
import ENV from 'potber/config/environment';

export interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: BodyInit | undefined;
}

const API_URL = `${ENV.APP['proxyUrl']}/${ENV.APP['apiUrl']}`;

export default class ApiService extends Service {
  domParser = new window.DOMParser();

  async getThread(threadId: string, page?: number) {
    let query = `thread.php?TID=${threadId}`;
    if (page) {
      query += `&page=${page}`;
    }
    const xmlDocument = await this.fetch(query);
    // Throw an error if the thread could not be found
    if (
      !xmlDocument.children[0] ||
      xmlDocument.children[0].nodeName === 'invalid-thread'
    ) {
      throw new Error('not-found');
    }
    const thread = transformThread(xmlDocument);
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
    // const parsaer
    // const xmlObject = await new Promise((resolveparseString(text, (error, result) => {
    //   debugger;
    // });
    // return xmlObject;
  }
}
