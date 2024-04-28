import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import Board from 'potber-client/models/board';
import MessagesService from 'potber-client/services/messages';
import RSVP from 'rsvp';
import SlowRoute from '../base/slow';
import CustomStore from 'potber-client/services/custom-store';

interface Params extends Record<string, unknown> {
  BID: string;
  page?: string;
}

export interface BoardRouteModel {
  board: Board;
}

export default class BoardRoute extends SlowRoute {
  @service declare store: CustomStore;
  @service declare messages: MessagesService;
  @service declare router: RouterService;

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
      const board: Board = await this.store.findRecord('board', params.BID, {
        adapterOptions: {
          queryParams: {
            page,
          },
        },
      });
      return RSVP.hash({
        board: board,
      });
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else if (error.message === 'no-access') {
        this.messages.showNotification(
          'Du hast keine Zugriffsberechtigung für dieses Board.',
          'error',
        );
      }
      transition.abort();
    }
  }
}
