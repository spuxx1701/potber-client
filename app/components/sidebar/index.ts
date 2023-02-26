import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class SidebarComponent extends Component {
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;

  get navVerticalPosition(): 'top' | 'bottom' {
    if (
      this.settings.sidebarLayout === SidebarLayout.leftBottom ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'bottom';
    }
    return 'top';
  }

  @action handleSidebarBackdropClick() {
    this.renderer.closeLeftSidebar();
  }
}
