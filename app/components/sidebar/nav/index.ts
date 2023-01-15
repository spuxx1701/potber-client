import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber/services/renderer';

export default class SidebarNavComponent extends Component {
  @service declare renderer: RendererService;

  @action handleNavLinkClick() {
    this.renderer.closeLeftSidebar();
  }
}
