import { service } from '@ember/service';
import Component from '@glimmer/component';
import { PrivateMessage } from 'potber-client/services/api/models/private-message';
import CustomSession from 'potber-client/services/custom-session';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class PrivateMessageListItemComponent extends Component<Signature> {
  @service declare session: CustomSession;

  get subtitle() {
    return createPrivateMessageSubtitle(this.args.message);
  }
}
