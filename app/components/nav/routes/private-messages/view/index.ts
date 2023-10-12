import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';
import { appConfig } from 'potber-client/config/app.config';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class NavRoutesPrivateMessagesViewComponent extends Component<Signature> {
  get subtitle() {
    return createPrivateMessageSubtitle(this.args.message);
  }

  get originalUrl() {
    return `${appConfig.forumUrl}/pm/?a=2&mid=${this.args.message.id}`;
  }
}
