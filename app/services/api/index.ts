import Service, { service } from '@ember/service';
import ENV from 'potber/config/environment';
import MessagesService from '../messages';

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: BodyInit | undefined;
  useForumUrl?: boolean;
}

const API_URL = `${ENV.APP['API_URL']}`;
const FORUM_URL = `${ENV.APP['FORUM_URL']}`;

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  domParser = new window.DOMParser();

  /**
   * The fetch wrapper that is used by all of the ApiService getters.
   * @param query The query.
   * @param options (optional) Fetch options.
   * @returns The result.
   */
  async fetch(query: string, options?: FetchOptions) {
    let url = `${API_URL}${query}`;
    if (options?.useForumUrl) url = `${FORUM_URL}${query}`;
    const response = await fetch(url, {
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
