import Service, { service } from '@ember/service';
import ENV from 'potber/config/environment';
import MessagesService from '../messages';

export interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: BodyInit | undefined;
}

const API_URL = `${ENV.APP['API_URL']}`;

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
