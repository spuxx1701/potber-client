import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import ENV from 'potber/config/environment';
import RSVP from 'rsvp';
import ApiService from 'potber/services/api';
import SessionService from 'potber/services/session';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare api: ApiService;
  @service declare session: SessionService;

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
    this.session.initialize();
  }

  async model() {
    return RSVP.hash({
      bookmarks: await this.api.getBookmarks(),
    });
  }
}
