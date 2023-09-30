import Component from '@glimmer/component';
import { Message } from 'potber-client/services/messages';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';

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
    return new Date(this.args.message.date).toLocaleString();
  }

  <template>
    <div class='message-item bg-{{@message.type}}'>
      <p class='subtitle'><FaIcon @icon={{this.icon}} />[{{@message.context}}]
        {{this.date}}</p>
      <p>{{@message.text}}</p>
    </div>
  </template>
}
