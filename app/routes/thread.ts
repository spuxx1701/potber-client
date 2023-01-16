import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import { Thread } from 'potber/services/api/types/thread';
import LocalStorageService from 'potber/services/local-storage';
import RSVP, { reject } from 'rsvp';

interface Params {
  TID: string;
  page: string;
}

export interface ThreadRouteModel {
  thread: Thread;
  page: number;
  avatarStyle: string;
}

export default class ThreadRoute extends Route {
  @service declare localStorage: LocalStorageService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  @service declare api: ApiService;
  async model(params: Params) {
    try {
      const thread = await this.api.getThread(
        params.TID,
        parseInt(params.page)
      );
      return RSVP.hash({
        thread,
        page: thread.page?.pageNumber || 1,
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
