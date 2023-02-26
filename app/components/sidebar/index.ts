import { service } from '@ember/service';
import Component from '@glimmer/component';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class SidebarComponent extends Component {
  @service declare settings: SettingsService;

  get navVerticalPosition(): 'top' | 'bottom' {
    if (
      this.settings.sidebarLayout === SidebarLayout.leftBottom ||
      this.settings.sidebarLayout === SidebarLayout.rightBottom
    ) {
      return 'bottom';
    }
    return 'top';
  }
}
