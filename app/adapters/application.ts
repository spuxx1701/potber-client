import RESTAdapter from '@ember-data/adapter/rest';
import { Snapshot } from '@ember-data/store';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import ModelRegistry from 'ember-data/types/registries/model';
import ENV from 'potber-client/config/environment';
import CustomSession from 'potber-client/services/custom-session';

export default class ApplicationAdapter extends RESTAdapter {
  @service declare session: CustomSession;
  @service declare router: RouterService;

  host = ENV.APP['API_URL'] as string;
  namespace = '';

  get headers() {
    // Provide authorization headers on all requests.
    const headers = {} as any;
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }
    return headers;
  }

  async handleResponse(
    status: number,
    headers: object,
    payload: object,
    requestData: object,
  ) {
    // When the client calls a protected endpoint and the API returns 401,
    // this likely means that our current session is invalid. In that case,
    // invalidate the session.
    if (status === 401) {
      await this.session.invalidate();
    }
    return super.handleResponse(status, headers, payload, requestData);
  }

  /**
   * Support for custom query parameters on all requests.
   */
  buildQuery(snapshot: Snapshot<keyof ModelRegistry>): Record<string, unknown> {
    const query = super.buildQuery(snapshot);
    if (snapshot.adapterOptions) {
      const { queryParams } = snapshot.adapterOptions;
      if (queryParams && typeof queryParams === 'object') {
        for (const key in queryParams) {
          query[key] = queryParams[key as keyof typeof queryParams] as string;
        }
      }
    }
    return query;
  }

  // Don't cache any model states
  shouldReloadRecord() {
    return true;
  }

  shouldBackgroundReloadRecord() {
    return false;
  }
}
