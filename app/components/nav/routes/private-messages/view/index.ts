import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class NavRoutesPrivateMessagesViewComponent extends Component<Signature> {
  get subtitle() {
    return createPrivateMessageSubtitle(this.args.message);
  }
}
