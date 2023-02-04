import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AppService from 'potber/services/app';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;

  async model() {
    try {
      await this.app.initialize();
      return {
        failure: false,
        failureReason: null,
      };
    } catch (error) {
      return {
        failure: true,
        error,
      };
    }
  }
}
