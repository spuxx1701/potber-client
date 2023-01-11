import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RendererService from 'potber/services/renderer';

export default class ApplicationRoute extends Route {
  @service declare renderer: RendererService;

  beforeModel() {
    // Initialization
    this.renderer.initialize();
  }
}
