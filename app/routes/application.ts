import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RSVP from 'rsvp';
import ApiService from 'potber/services/api';
import AppService from 'potber/services/app';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;
  @service declare api: ApiService;

  async beforeModel() {
    this.app.initialize();
  }

  async model() {
    return RSVP.hash({
      bookmarksSummary: await this.api.getBookmarksSummary(),
    });
  }
}
