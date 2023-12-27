import Service, { service } from '@ember/service';
import { appConfig } from 'potber-client/config/app.config';
import MessagesService from './messages';
import { IntlService } from 'ember-intl';
import * as Threads from './api/endpoints/threads.endpoints';
import * as Users from './api/endpoints/users.endpoints';
import * as Posts from './api/endpoints/posts.endpoints';
import { ApiError } from './api/error';
import CustomSession from './custom-session';
import * as Bookmarks from './api/endpoints/bookmarks.endpoints';

export interface PublicFetchOptions {
  /**
   * Whether the user should be warned about the request taking a long time.
   */
  timeoutWarning?: boolean;
}

export interface ProtectedFetchOptions extends PublicFetchOptions {
  /**
   * The `RequestInit` object.
   */
  request?: RequestInit;
  /**
   * An optional object that will be parsed as query parameters.
   */
  query?: Record<string, string | boolean | number>;
}

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  @service declare intl: IntlService;
  @service declare session: CustomSession;

  // --- Endpoints are being defined in this section --- //
  findUserById = Users.findById;
  findPostById = Posts.findById;

  findThreadById = Threads.findById;

  createPost = Posts.create;
  updatePost = Posts.update;
  quotePost = Posts.quote;
  reportPost = Posts.report;

  findAllBookmarks = Bookmarks._findAll;
  findBookmarkByThreadId = Bookmarks._findByThreadId;
  createBookmark = Bookmarks._create;
  deleteBookmark = Bookmarks._delete;

  // --------------------------------------------------- //

  /**
   * Triggers a `fetch` to the API server and returns the data. Any errors will be logged automatically.
   * @returns The data.
   */
  fetch = async (
    path: string,
    options?: ProtectedFetchOptions,
  ): Promise<any> => {
    const { request, query, timeoutWarning } = {
      timeoutWarning: false,
      ...options,
    };
    if (!path.startsWith('/')) path = `/${path}`;
    let url = `${appConfig.apiUrl}${path}`;
    const baseUrl = url;
    if (query) {
      Object.keys(query).forEach((key) => {
        if (!query[key]) return;
        if (url === baseUrl) url += '?';
        else url += '&';
        url += `${key}=${query[key]}`;
      });
    }
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }
    this.messages.log(`Outgoing request: ${request?.method ?? 'GET'} ${url}`, {
      context: this.constructor.name,
      type: 'info',
    });
    // The forum can take a long time to respond. We want to warn the user if that happens.
    const timeoutId = window.setTimeout(() => {
      if (timeoutWarning) {
        this.messages.showNotification(
          this.intl.t('error.timeout.warning'),
          'warning',
        );
      }
    }, appConfig.httpTimeoutWarningThreshold);
    try {
      const response = await fetch(url, {
        ...request,
        headers: { ...headers, ...request?.headers },
      });
      window.clearTimeout(timeoutId);
      if (response.ok && response.headers.get('content-length') === '0') return;
      const data = await response.json();
      if (!response.ok) {
        throw new ApiError(
          data.statusCode ?? response.status,
          data.error ?? response.statusText,
          data.message ?? response.statusText,
        );
      }
      return data;
    } catch (error: unknown) {
      window.clearTimeout(timeoutId);
      this.messages.log(JSON.stringify(error), {
        context: this.constructor.name,
        type: 'error',
      });
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          this.session.invalidate();
          return;
        }
      }
      throw error;
    }
  };
}
