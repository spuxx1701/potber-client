import { service } from '@ember/service';
import Component from '@glimmer/component';
import CustomSession from 'potber-client/services/custom-session';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import SettingsService, {
  SidebarLayout,
} from 'potber-client/services/settings';

export default class NavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: CustomSession;
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;

  get sidebarToggleVerticalPosition(): 'top' | 'bottom' {
    if (
      (this.settings.sidebarLayout === SidebarLayout.leftBottom ||
        this.settings.sidebarLayout === SidebarLayout.rightBottom) &&
      !this.renderer.isDesktop
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

  get isDesktop() {
    return this.renderer.isDesktop;
  }
}
