import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AppService from 'potber-client/services/app';
import RendererService from 'potber-client/services/renderer';
import type { IntlService } from 'ember-intl';
import { sleep } from 'potber-client/utils/misc';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;
  @service declare renderer: RendererService;
  @service declare intl: IntlService;

  beforeModel() {
    this.intl.setLocale(['de-de']);
  }

  async model() {
    try {
      // await sleep(5000);
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
