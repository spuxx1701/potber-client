import Service, { service } from '@ember/service';
import { appConfig } from 'potber-client/config/app.config';
import MessagesService from './messages';
import { IntlService } from 'ember-intl';
import * as Users from './api/endpoints/users.endpoints';
import { ApiError } from './api/error';

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  @service declare intl: IntlService;

  // --- Endpoints are being defined in this section --- //
  findUserById = Users.findById;
  // --------------------------------------------------- //

  /**
   * Triggers a `fetch` to the API server and returns the data. Any errors will be logged automatically.
   * @param request The `RequestInit` object.
   * @returns The data.
   */
  fetch = async (path: string, request?: RequestInit) => {
    if (!path.startsWith('/')) path = `/${path}`;
    const url = `${appConfig.apiUrl}${path}`;
    try {
      this.messages.log(
        `Outgoing request: ${request?.method ?? 'GET'} ${url}`,
        { context: this.constructor.name, type: 'info' },
      );
      const response = await fetch(url, {
        ...request,
      });
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
      this.messages.log(JSON.stringify(error), {
        context: this.constructor.name,
        type: 'error',
      });
      if (
        (error instanceof ApiError &&
          (isNaN(error.statusCode) || error.statusCode > 499)) ||
        !(error instanceof ApiError)
      ) {
        this.messages.showNotification(this.intl.t('error.unknown'), 'error');
      }
      throw error;
    }
  };
}
