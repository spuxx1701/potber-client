import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';
import ENV from 'potber-client/config/environment';

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
    return `${ENV.APP['FORUM_URL']}/pm/?a=2&mid=${this.args.message.id}`;
  }
}
