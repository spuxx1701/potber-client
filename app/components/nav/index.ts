import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class NavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: any;
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;

  get sidebarToggleVerticalPosition(): 'top' | 'bottom' {
    if (
      this.settings.sidebarLayout === SidebarLayout.leftBottom ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'bottom';
    }
    return 'top';
  }

  get sidebarCollapseIcon() {
    if (
      this.settings.sidebarLayout === SidebarLayout.rightTop ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'chevron-right';
    }
    return 'chevron-left';
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }

  @action toggleLeftSidebar() {
    this.renderer.toggleLeftSidebar();
    if (this.renderer.leftSidebarExpanded && this.settings.autoRefreshSidebar) {
      this.newsfeed.refresh();
    }
  }
}
