import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber-client/services/local-storage';
import RendererService from 'potber-client/services/renderer';

export default class SidebarNavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: any;
  @service declare localStorage: LocalStorageService;

  @action handleNavLinkClick() {
    this.renderer.closeLeftSidebar();
  }

  get showBoardOverviewButton() {
    return this.localStorage.landingPage !== 'board-overview';
  }

  get authenticated() {
    return this.session.session.authenticated;
  }
}
