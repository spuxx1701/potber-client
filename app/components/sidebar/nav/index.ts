import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber/services/renderer';
import SessionService from 'potber/services/session';

export default class SidebarNavComponent extends Component {
  @service declare renderer: RendererService;
  @service declare session: SessionService;

  @action handleNavLinkClick() {
    this.renderer.closeLeftSidebar();
  }

  get authenticated() {
    return this.session.session.authenticated;
  }
}
