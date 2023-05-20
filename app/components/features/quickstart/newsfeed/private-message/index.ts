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

const MESSAGE_BASE_PATH = 'https://forum.mods.de/bb/pm/?a=2&mid=';

export default class QuickstartNewsfeedPrivateMessageComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare modal: ModalService;
  declare args: Signature['Args'];

  get subtitle() {
    return `${this.args.privateMessage.sender?.name}`;
  }

  @action handleClick() {
    const url = `${MESSAGE_BASE_PATH}${this.args.privateMessage.id}`;
    this.modal.confirm({
      title: 'Weiterleitung zur Nachricht',
      text: 'Du wirst nun zur privaten Nachricht weitergeleitet. Die Weiterleitung funktioniert nur, wenn Du im Forum eine laufende Sitzung hast.',
      onSubmit: () => {
        const newTab = window.open(url, '_blank');
        if (newTab) {
          newTab.focus();
        }
        this.modal.close();
      },
    });
    if (this.args.inSidebar) {
      this.renderer.closeLeftSidebar();
    }
  }
}
