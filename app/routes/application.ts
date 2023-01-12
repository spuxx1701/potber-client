import { action } from '@ember/object';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import RendererService from 'potber/services/renderer';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare renderer: RendererService;

  beforeModel() {
    // Initialization
    this.renderer.initialize();
  }
}
