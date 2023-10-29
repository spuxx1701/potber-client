import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import ModalService from 'potber-client/services/modal';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    privateMessage: PrivateMessage;
    inSidebar: boolean;
  };
}

export default class QuickstartNewsfeedPrivateMessageComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare modal: ModalService;
  declare args: Signature['Args'];

  get subtitle() {
    return `${this.args.privateMessage.sender?.name}`;
  }

  @action handleLinkClick() {
    if (this.args.inSidebar && !this.renderer.isDesktop) {
      this.renderer.toggleLeftSidebar(false);
    }
  }
}
