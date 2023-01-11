import Service from '@ember/service';
import { transformThread } from './api/transformers/thread';
// import xml2js from 'xml2js';

export interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: BodyInit | undefined;
}

const API_URL =
  'https://cors-anywhere.herokuapp.com/https://forum.mods.de/bb/xml/';

export default class ApiService extends Service {
  domParser = new window.DOMParser();
  // const parser = xml2js.

  async getThread(threadId: string, pageId?: number) {
    let query = `thread.php?TID=${threadId}`;
    if (pageId) {
      query += `&PID=${pageId}`;
    }
    const xmlDocument = await this.fetch(query);
    return transformThread(xmlDocument);
  }

  async fetch(query: string, options?: FetchOptions) {
    const response = await fetch(`${API_URL}${query}`, {
      method: options?.method || 'GET',
      body: options?.body,
    });
    // console.log(await response.text());
    console.log(response);
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
