import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import SessionService from 'potber/services/session';

export default class SidebarNavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: SessionService;
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
