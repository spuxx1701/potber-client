import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import CustomSession from 'potber-client/services/custom-session';
import RendererService from 'potber-client/services/renderer';
import SettingsService, { LandingPage } from 'potber-client/services/settings';

export default class SidebarNavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: CustomSession;
  @service declare settings: SettingsService;

  @action handleNavLinkClick() {
    if (this.renderer.isDesktop) return;
    this.renderer.closeLeftSidebar();
  }

  get showBoardOverviewButton() {
    return this.settings.landingPage !== LandingPage.boardOverview;
  }

  get authenticated() {
    return this.session.isAuthenticated;
  }
}
