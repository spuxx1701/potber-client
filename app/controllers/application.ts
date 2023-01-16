import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import RendererService from 'potber/services/renderer';

export default class ApplicationController extends Controller {
  @service declare renderer: RendererService;

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }

  @action toggleLeftSidebar() {
    this.renderer.toggleLeftSidebar();
  }

  /**
   * This action is called whenever the bottom nav portal changes.
   * @param count The number of portals that render within the portal.
   */
  @action handleBottomNavPortalchange(count: number) {
    // Show or hide the bottom nav depending on whether a portal is rendering
    const rootStyle = document.documentElement.style;
    if (count > 0) {
      rootStyle.setProperty('--bottom-nav-display', 'flex');
    } else {
      rootStyle.setProperty('--bottom-nav-display', 'none');
    }
  }
}
