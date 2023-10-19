import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';
import { appConfig } from 'potber-client/config/app.config';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class NavRoutesPrivateMessagesViewComponent extends Component<Signature> {
  @service declare renderer: RendererService;

  get subtitle() {
    return createPrivateMessageSubtitle(this.args.message);
  }

  get originalUrl() {
    return `${appConfig.forumUrl}/pm/?a=2&mid=${this.args.message.id}`;
  }
}
