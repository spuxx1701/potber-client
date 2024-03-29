import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class SidebarToggleComponent extends Component {
  @service declare renderer: RendererService;
  @service declare settings: SettingsService;

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
    this.renderer.toggleLeftSidebar();
  }
}
