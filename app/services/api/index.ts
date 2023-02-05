import Service, { service } from '@ember/service';
import { PostFormContent } from 'potber/components/board/post-form';
import ENV from 'potber/config/environment';
import MessagesService from '../messages';

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: BodyInit | undefined;
  headers?: HeadersInit;
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
    const init: RequestInit = {
      method: options?.method || 'GET',
      headers: options?.headers,
      body: options?.body,
      credentials: 'include',
    };
    const response = await fetch(url, init);
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

  /**
   * Attempts to retrieve several fields and values from the given URI. Required to
   * create or edit posts and threads.
   * @param uri The uri that points to the form (e.g. 'newreply.php?TID=123').
   * @returns The initialized post form content.
   */
  async initializePostFormContent(uri: string, postId?: string) {
    const result: any = {
      id: postId,
      title: '',
      icon: '0',
      message: '',
      convertUrls: true,
      disableBbCode: false,
      disableEmojis: false,
    } as PostFormContent;
    const response = await fetch(`${FORUM_URL}${uri}`, {
      credentials: 'include',
    });
    const text = await response.text();
    const tokenMatches = text.match(/(?:(name='token'\svalue=')(.*?)('\s\/>))/);
    if (tokenMatches && tokenMatches.length >= 3) {
      result.token = tokenMatches[2] as string;
    } else {
      throw new Error(
        'Post form initilization failed: Token could not be found in HTML response.'
      );
    }
    const titleMatches = text.match(/(?:(name='edit_title'\svalue=')(.*?)('))/);
    if (titleMatches && titleMatches.length >= 3) {
      result.title = titleMatches[2] as string;
    }
    const selectedIconMatches = text.match(
      /(?:(name='edit_icon'\svalue=')(.*?)('\schecked))/
    );
    if (selectedIconMatches && selectedIconMatches.length >= 3) {
      result.icon = selectedIconMatches[2] as string;
    }
    const messageMatches = text.match(
      /(?:(<textarea name='message'.*>)((.|\s|\S|\n)*?)(<\/textarea>))/
    );
    if (messageMatches && messageMatches.length >= 3) {
      result.message = messageMatches[2] as string;
    }
    return result;
  }
}
