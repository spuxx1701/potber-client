import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AppService from 'potber/services/app';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;

  async beforeModel() {
    this.app.initialize();
  }
}
