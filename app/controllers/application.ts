import Controller from '@ember/controller';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';

export default class ApplicationController extends Controller {
  @service declare renderer: RendererService;
  @service declare session: any;

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }
}
