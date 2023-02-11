import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';

export default class ApplicationController extends Controller {
  @service declare renderer: RendererService;

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }

  @action toggleLeftSidebar() {
    this.renderer.toggleLeftSidebar();
  }
}
