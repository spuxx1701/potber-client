import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import { Board } from 'potber/services/api/types/board';
import RSVP, { reject } from 'rsvp';

interface Params {
  BID: string;
  page: string;
}

export interface BoardRouteModel {
  board: Board;
  page: number;
}

export default class BoardRoute extends Route {
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

  async model(params: Params) {
    try {
      const page = parseInt(params.page) || 1;
      console.log(params);
      const board = await this.api.getBoard(params.BID, page);
      return RSVP.hash({
        board: board,
        page: page,
      });
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }
}
