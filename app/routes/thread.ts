import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import RSVP, { reject } from 'rsvp';

interface Params {
  TID: string;
  page: string;
}

export default class ThreadRoute extends Route {
  @service declare api: ApiService;

  async model(params: Params) {
    try {
      const thread = await this.api.getThread(
        params.TID,
        parseInt(params.page)
      );
      return thread;
    } catch (error: any) {
      if (error.message === 'not-found') {
        return null;
      } else {
        return reject(error);
      }
    }
  }
}
