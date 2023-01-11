import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber/services/api';
import RSVP from 'rsvp';

interface Params {
  thread_id: string;
  page_id: string;
}

interface Query {
  page_id: string;
}

export default class ThreadRoute extends Route {
  @service declare api: ApiService;

  async model(params: Params) {
    const thread = await this.api.getThread(params.thread_id);
    return thread;
  }
}
