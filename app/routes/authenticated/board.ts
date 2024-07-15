import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import MessagesService from 'potber-client/services/messages';
import SlowRoute from '../base/slow';
import ApiService from 'potber-client/services/api';
import { Boards } from 'potber-client/services/api/types';

interface Params extends Record<string, unknown> {
  BID: string;
  page?: string;
}

export interface BoardRouteModel {
  board: Boards.Read;
}

export default class BoardRoute extends SlowRoute {
  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @service declare api: ApiService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    BID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params: Params, transition: Transition) {
    try {
      const page = parseInt(params.page || '1') || 1;
      const board: Boards.Read = await this.api.findBoardById(params.BID, {
        query: { page },
      });
      return { board };
    } catch (error: any) {
      if (transition.from) {
        transition.abort();
      } else {
        return null;
      }
    }
  }
}
