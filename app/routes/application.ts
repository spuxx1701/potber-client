import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AppService from 'potber-client/services/app';
import RendererService from 'potber-client/services/renderer';

export default class ApplicationRoute extends Route {
  @service declare app: AppService;
  @service declare renderer: RendererService;

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

  @action loading(transition: any) {
    this.renderer.showLoadingIndicator();
    transition.promise.finally(() => {
      this.renderer.hideLoadingIndicator();
    });
  }
}
