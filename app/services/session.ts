import ENV from 'potber/config/environment';
import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import MessagesService from './messages';
import ApiService from './api';
import { getAttributeValue, getNode } from './api/transformers/utils';

export interface Session {
  authenticated: boolean;
  username: string | null;
}

export default class SessionService extends Service {
  @service declare messages: MessagesService;
  @service declare api: ApiService;
  @tracked session: Session = { authenticated: false, username: null };

  @action initialize() {
    this.updateState();
  }

  @action async signIn(username: string, password: string, lifetime: number) {
    try {
      const url = `${ENV.APP['LOGIN_URL']}?login_username=${username}&login_password=${password}&login_lifetime=${lifetime}`;
      const response = await fetch(url);
      const text = await response.text();
      if (new RegExp(/Fehler beim Einloggen/).test(text)) {
        throw new Error('Login rejected.');
      }
      this.getSessionCookie(text);
      await this.updateState();
    } catch (error) {
      this.messages.log('Login failed: ' + error, {
        context: this.constructor.name,
        type: 'error',
      });
      return false;
    }
    return true;
  }

  getSessionCookie(text: string) {
    const iframeMatches = text.match(/(?:(<iframe)(.|\n)*?(<\/iframe>))/);
    if (iframeMatches && iframeMatches.length > 0) {
      const iframe = iframeMatches[0];
      const srcMatches = iframe.match(/(?:(src=')(.|\n)*?('))/);
      if (srcMatches && srcMatches.length > 0) {
        const src =
          'https:' + srcMatches[0].replace("src='", '').replace("'", '');
        const tempWindow = window.open(src);
        tempWindow?.close();
      } else {
        throw new Error('Unable to find iframe src within text response.');
      }
    } else {
      throw new Error('Unable to find iframe within text response.');
    }
  }

  @action signOut() {
    console.log('implement me');
  }

  /**
   * Updates the session state. Uses '/bookmarks.php' to retrieve session status and then
   * https://my.mods.de/:user_id to retrieve the username.
   */
  @action async updateState() {
    try {
      const xmlDocument = await this.api.fetch(`bookmarks.php`);
      if (getNode('not-logged-in', xmlDocument)) {
        this.session = {
          authenticated: false,
          username: null,
        };
      } else {
        const userId = getAttributeValue(
          'current-user-id',
          getNode('bookmarks', xmlDocument)
        );
        const userPageText = await (
          await fetch(`${ENV.APP['USER_PAGE_URL']}${userId}`)
        ).text();
        const userNameMatches = userPageText.match(
          /(?=(<title>mods.de Profil: )(.*)(<\/title>))/
        );
        if (userNameMatches && userNameMatches.length > 3) {
          const username = userNameMatches[2] as string;
          this.session = { authenticated: true, username };
        } else {
          throw new Error('Could not retrieve usename.');
        }
      }
    } catch (error) {
      this.messages.log('Unable to update session state: ' + error, {
        type: 'error',
        context: this.constructor.name,
      });
    }
  }
}
