import Component from '@glimmer/component';
import { Message } from 'potber/services/messages';

interface Signature {
  Args: {
    message: Message;
  };
}
export default class MessageItemComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get icon() {
    switch (this.args.message.type) {
      case 'success':
        return 'circle-check';
      case 'warning':
        return 'triangle-exclamation';
      case 'error':
        return 'circle-exclamation';
      default:
        return 'circle-info';
    }
  }

  get date() {
    return this.args.message.date.toLocaleString();
  }
}
