import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class SidebarToggleComponent extends Component {
  @service declare renderer: RendererService;
  @service declare settings: SettingsService;
  @service declare newsfeed: NewsfeedService;

  get sidebarCollapseIcon() {
    if (
      this.settings.sidebarLayout === SidebarLayout.rightTop ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'chevron-right';
    }
    return 'chevron-left';
  }

  @action toggleLeftSidebar() {
    this.renderer.setStyleVariable(
      '--sidebar-transition-time',
      'var(--sidebar-transition-time-default)',
    );
    this.renderer.toggleLeftSidebar();
    if (
      this.renderer.leftSidebarExpanded &&
      this.settings.getSetting('autoRefreshSidebar')
    ) {
      this.newsfeed.refresh();
    }
  }
}
