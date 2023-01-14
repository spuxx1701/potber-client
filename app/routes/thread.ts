import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import { Thread } from 'potber/services/api/types/thread';
import RSVP, { reject } from 'rsvp';

interface Params {
  TID: string;
  page: string;
}

export interface ThreadRouteModel {
  thread: Thread;
  currentPage: number;
}

export default class ThreadRoute extends Route {
  @service declare api: ApiService;

  async model(params: Params) {
    try {
      const thread = await this.api.getThread(
        params.TID,
        parseInt(params.page)
      );
      return RSVP.hash({
        thread,
        currentPage: thread.page?.pageNumber || 1,
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
