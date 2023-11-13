import Component from '@glimmer/component';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

interface Signature {
  Args: {
    title: string;
    icon?: IconName;
    prefix?: IconPrefix;
    variant?: ModalVariant;
  };
}

export default class ModalHeader extends Component<Signature> {
  get icon() {
    return this.args.icon || 'info-circle';
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }

  get variant() {
    return this.args.variant || 'default';
  }

  <template>
    <div class='modal-header modal-header-{{this.variant}}'>
      <FaIcon @icon={{this.icon}} @prefix={{this.prefix}} />
      <h3>{{@title}}</h3>
    </div>
  </template>
}
