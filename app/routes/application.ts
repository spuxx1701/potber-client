import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;

  beforeModel() {
    // Initialization
    this.localStorage.initialize();
    this.renderer.initialize();
  }
}
