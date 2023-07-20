import { service } from '@ember/service';
import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import CustomSession from 'potber-client/services/custom-session';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class PrivateMessageListItemComponent extends Component<Signature> {
  @service declare session: CustomSession;

  /**
   * The subtitle is being created dynamically depending on whether
   * this is an inbound, outgoung or system message.
   */
  get subtitle() {
    let subtitle = '';
    if (!this.args.message.sender && !this.args.message.recipient) {
      subtitle += 'Systemnachricht';
    } else if (this.args.message.recipient?.name) {
      subtitle += `an ${this.args.message.recipient?.name}`;
    } else {
      subtitle += `von ${this.args.message.sender?.name}`;
    }
    subtitle += ` (${this.args.message.date})`;
    return subtitle;
  }
}
