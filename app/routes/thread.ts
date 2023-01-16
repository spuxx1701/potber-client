import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import { Thread } from 'potber/services/api/types/thread';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import RSVP, { reject } from 'rsvp';

interface Params {
  TID: string;
  PID?: string;
  page?: string;
}

export interface ThreadRouteModel {
  thread: Thread;
  page: number;
  avatarStyle: string;
}

export default class ThreadRoute extends Route {
  @service declare localStorage: LocalStorageService;
  @service declare api: ApiService;
  @service declare renderer: RendererService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    PID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params: Params) {
    try {
      // Attempt to parse the page
      let page: number | undefined;
      if (params.page) page = parseInt(params.page) || 1;
      const thread = await this.api.getThread(params.TID, {
        postId: params.PID,
        page,
      });
      this.renderer.tryResetScrollPosition();
      return RSVP.hash({
        thread,
        page: thread.page?.pageNumber || page,
        avatarStyle: this.localStorage.avatarStyle,
      } as ThreadRouteModel);
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }
}
