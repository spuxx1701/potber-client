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

  get authenticated() {
    return this.session.isAuthenticated;
  }

  get leftSidebarExpanded() {
    return this.renderer.leftSidebarExpanded;
  }
}
