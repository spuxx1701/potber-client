import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import ENV from 'potber/config/environment';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;

  async beforeModel() {
    // Delete cache
    if (ENV.APP['NO_CACHE'] && 'caches' in window) {
      caches.keys().then((names) => {
        names.forEach(async (name) => {
          await caches.delete(name);
        });
      });
    }
    // Initialization
    this.localStorage.initialize();
    this.renderer.initialize();
  }
}
