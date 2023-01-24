import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import { Board } from 'potber/services/api/types/board';
import MessagesService from 'potber/services/messages';
import RendererService from 'potber/services/renderer';
import RSVP from 'rsvp';

interface Params {
  BID: string;
  page?: string;
}

export interface BoardRouteModel {
  board: Board;
  page: number;
}

export default class BoardRoute extends Route {
  @service declare api: ApiService;
  @service declare renderer: RendererService;
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

  async model(params: Params, transition: Transition<unknown>) {
    try {
      const page = parseInt(params.page || '1') || 1;
      const board = await this.api.getBoard(params.BID, page);
      this.renderer.tryResetScrollPosition();
      return RSVP.hash({
        board: board,
        page: page,
      });
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else if (error.message === 'no-access') {
        this.messages.showNotification(
          'Du hast keine Zugriffsberechtigung für dieses Board.',
          'error'
        );
      }
      transition.abort();
    }
  }
}
