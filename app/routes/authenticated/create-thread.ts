import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import { WritableThread } from 'potber-client/services/api/models/thread';
import { Boards } from 'potber-client/services/api/types';
import ApiService from 'potber-client/services/api';

interface Params {
  BID: string;
}

export interface CreateThreadRouteModel {
  thread: WritableThread;
  board: Boards.Read;
}

export default class CreateThreadRoute extends Route {
  @service declare renderer: RendererService;
  @service declare api: ApiService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    BID: {
      refreshModel: true,
    },
  };

  async model(params: Params): Promise<CreateThreadRouteModel> {
    const { BID } = params;
    const board = await this.api.findBoardById(BID);
    const thread = new WritableThread(
      {
        boardId: BID,
        title: '',
        tags: [],
        openingPost: {
          title: '',
          icon: '0',
          message: '',
        },
      },
      this,
    );
    return { thread, board };
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
