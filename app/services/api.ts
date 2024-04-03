import Service, { service } from '@ember/service';
import { appConfig } from 'potber-client/config/app.config';
import MessagesService, { MessageType } from './messages';
import { IntlService } from 'ember-intl';
import * as Threads from './api/endpoints/threads.endpoints';
import * as Users from './api/endpoints/users.endpoints';
import * as Posts from './api/endpoints/posts.endpoints';
import { ApiError } from './api/error';
import CustomSession from './custom-session';
import * as Bookmarks from './api/endpoints/bookmarks.endpoints';
import * as PrivateMessages from './api/endpoints/private-messages.endpoints';

export interface FetchStatusNotification {
  /**
   * The status code that will trigger the notification. A wildcard will be used
   * as a fallback for all unhandled status codes >= 400 and unknown errors.
   */
  statusCode: number | '*';
  /**
   * The notification message.
   */
  message: string;
  /**
   * The notification type. Defaults to 'error'.
   */
  type?: MessageType;
}

export interface PublicFetchOptions {
  /**
   * Whether the user should be warned about the request taking a long time.
   */
  timeoutWarning?: boolean;
  /**
   * Contains notifications that will be shown to the user in case of specific status codes.
   */
  statusNotifications?: FetchStatusNotification[];
  /**
   * Whether the request should be handled silently (and now show any notifications).
   */
  silent?: boolean;
  /**
   * An optional object that will be parsed as query parameters.
   */
  query?: Record<string, string | boolean | number>;
}

export interface ProtectedFetchOptions extends PublicFetchOptions {
  /**
   * The `RequestInit` object.
   */
  request?: RequestInit;
}

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  @service declare intl: IntlService;
  @service declare session: CustomSession;

  // --- Endpoints are being defined in this section --- //
  findUserById = Users.findById;
  findManyUsernames = Users.findManyUsernames;

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

  findManyPrivateMessages = PrivateMessages._findMany;
  findPrivateMessageById = PrivateMessages._findById;
  createPrivateMessage = PrivateMessages._create;
  deletePrivateMessage = PrivateMessages._delete;
  movePrivateMessageToFolder = PrivateMessages._moveToFolder;
  markPrivateMessageAsUnread = PrivateMessages._markAsUnread;
  replyToPrivateMessage = PrivateMessages._reply;
  forwardPrivateMessage = PrivateMessages._forward;

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
      await this.handleErrors(error, options);
      throw error;
    }
  };

  private async handleErrors(error: unknown, options?: ProtectedFetchOptions) {
    const { statusNotifications, silent } = {
      statusNotifications: [
        {
          statusCode: '*',
          type: 'error',
          message: this.intl.t('error.unknown'),
        },
      ] as FetchStatusNotification[],
      silent: false,
      ...options,
    };
    this.messages.log(JSON.stringify(error), {
      context: this.constructor.name,
      type: 'error',
    });
    const fallbackNotification = statusNotifications.find(
      (notification) => notification.statusCode === '*',
    );
    if (error instanceof ApiError) {
      const handledStatusCodes = [401];
      // In case of a 401 we our session has been invalidated and we need to authenticate.
      if (error.statusCode === 401) {
        await this.session.invalidate();
        return;
      }
      if (silent) return;
      // In case of other status codes, we will look for notifications to display.
      const notification = statusNotifications.find(
        (notification) => notification.statusCode === error.statusCode,
      );
      if (notification) {
        if (notification.statusCode === error.statusCode) {
          handledStatusCodes.push(error.statusCode);
          this.messages.showNotification(
            notification.message,
            notification.type ?? 'error',
          );
        }
      }
      // If we have a fallbackNotification and our status code has not been handled,
      // we will display the fallback notification.
      if (
        fallbackNotification &&
        !handledStatusCodes.includes(error.statusCode)
      ) {
        this.messages.showNotification(
          fallbackNotification.message,
          fallbackNotification.type ?? 'error',
        );
      }
    } else {
      if (!fallbackNotification || silent) return;
      this.messages.showNotification(
        fallbackNotification.message,
        fallbackNotification.type ?? 'error',
      );
    }
  }
}
