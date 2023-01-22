import ENV from 'potber/config/environment';
import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import MessagesService from './messages';
import ApiService from './api';

export interface Session {
  authenticated: boolean;
  username: string | null;
  userId: string | null;
  code: string | null;
}

export default class SessionService extends Service {
  @service declare messages: MessagesService;
  @service declare api: ApiService;
  @tracked session: Session = {
    authenticated: false,
    username: null,
    userId: null,
    code: null,
  };

  /**
   * Initializes the session service.
   */
  @action async initialize() {
    await this.updateState();
  }

  /**
   * Attempts to sign the given user in.
   * @param username The username.
   * @param password The password.
   * @param lifetime The session lifetime.
   * @returns Whether the user was signed in successfully.
   */
  @action async signIn(username: string, password: string, lifetime: number) {
    try {
      this.messages.log(`Attemting to sign in user '${username}'.`, {
        context: this.constructor.name,
      });
      const url = `${ENV.APP['LOGIN_URL']}?login_username=${username}&login_password=${password}&login_lifetime=${lifetime}`;
      const response = await fetch(url);
      const text = await response.text();
      if (new RegExp(/Fehler beim Einloggen/).test(text)) {
        throw new Error('Login rejected.');
      }
      this.messages.log(`Login successful.`, {
        type: 'success',
        context: this.constructor.name,
      });
      await this.getSessionCookie(text);
      await this.updateState();
      if (!this.session.authenticated)
        throw new Error(
          'Updating session state did not result in an authenticated state.'
        );
    } catch (error) {
      this.messages.log('Login failed: ' + error, {
        context: this.constructor.name,
        type: 'error',
      });
      return false;
    }
    return this.session.authenticated;
  }

  /**
   * Extracts and calls the session cookie source URL to store the session cookie.
   * @param text The response text.
   */
  async getSessionCookie(text: string) {
    this.messages.log(`Retrieving session cookie.`, {
      context: this.constructor.name,
    });
    const iframeMatches = text.match(/(?:(<iframe)(.|\n)*?(<\/iframe>))/);
    if (iframeMatches && iframeMatches.length > 0) {
      const iframe = iframeMatches[0];
      const srcMatches = iframe.match(/(?:(src=')(.|\n)*?('))/);
      if (srcMatches && srcMatches.length > 0) {
        const url =
          'https:' + srcMatches[0].replace("src='", '').replace("'", '');
        await fetch(url, {
          credentials: 'include',
        });
        this.messages.log(`Session cookie successfully retrieved.`, {
          type: 'success',
          context: this.constructor.name,
        });
      } else {
        throw new Error('Unable to find iframe src within text response.');
      }
    } else {
      throw new Error('Unable to find iframe within text response.');
    }
  }

  /**
   * Updates the session state. Uses '/bookmarks.php' to retrieve session status and then
   * https://my.mods.de/:user_id to retrieve the username.
   */
  @action async updateState() {
    try {
      // We need to call the main page to check our status and also retrieve
      // some session details
      const text = (
        await (
          await fetch('https://forum.mods.de/', {
            credentials: 'include',
          })
        ).text()
      ).substring(0, 2000);
      if (new RegExp(/Du bist nicht eingeloggt!/).test(text)) {
        // If the page says that we're not logged in, update state accordingly
        this.session = {
          authenticated: false,
          username: null,
          userId: null,
          code: null,
        };
      } else {
        // Extract the username
        const userNameRegex = new RegExp(/(?:(my\.mods\.de\/)(.*)("\s))/);
        const userNameMatches = text.match(userNameRegex);
        if (!userNameMatches || userNameMatches.length < 3) {
          throw Error('Unable to retrieve username.');
        }
        const username = userNameMatches[2] as string;
        // Extract the user id
        const userIdRegex = new RegExp(/(?:(User-ID\s)(.*)(\.\n))/);
        const userIdMatches = text.match(userIdRegex);
        if (!userIdMatches || userIdMatches.length < 3) {
          throw Error('Unable to retrieve user id.');
        }
        const userId = userIdMatches[2] as string;
        // Extract the session code
        const codeRegex = new RegExp(/(?:(\/logout\/.*&a=)(.*)(&redirect))/);
        const codeMatches = text.match(codeRegex);
        if (!codeMatches || codeMatches.length < 3) {
          throw Error('Unable to retrieve session code.');
        }
        const code = codeMatches[2] as string;
        this.session = {
          authenticated: true,
          username,
          userId,
          code,
        };
      }
      this.messages.log(`Updated session state.`, {
        context: this.constructor.name,
      });
      return this.session;
    } catch (error) {
      throw new Error('Unable to update session state: ' + error);
    }
  }

  /**
   * Attempts to terminate the current session.
   * @returns Whether the session has successfully been terminated.
   */
  @action async terminate() {
    if (!this.session.authenticated) return;
    this.messages.log(
      `Attempting to sign out user '${this.session.username}'.`,
      {
        context: this.constructor.name,
      }
    );
    const url = `${ENV.APP['LOGOUT_URL']}/?&UID=${this.session.userId}&a=${this.session.code}`;
    try {
      const response = await fetch(url, {
        credentials: 'include',
      });
      const text = await response.text();
      if (new RegExp(/Du hast dich ausgeloggt\./).test(text)) {
        await this.updateState();
        if (this.session.authenticated) {
          throw new Error(
            'Updating session did not result in a terminated state.'
          );
        }
      } else {
        throw new Error('Logout rejected.');
      }
      this.messages.log('User was succesfully signed out.', {
        context: this.constructor.name,
        type: 'success',
      });
      return true;
    } catch (error) {
      this.messages.log('Logout failed: ' + error, {
        context: this.constructor.name,
        type: 'error',
      });
      return false;
    }
  }
}
