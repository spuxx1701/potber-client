import { action } from '@ember/object';
import Component from '@glimmer/component';

interface Signature {
  Args: {
    text: string;
    icon?: string;
    prefix?: string;
    type?: 'button' | 'submit';
    size?: ControlSize;
    variant?: ControlVariant;
    onClick?: () => void;
  };
}

export default class CommonButtonComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get prefix() {
    return this.args.prefix || 'fas';
  }

  get type() {
    return this.args.type || 'button';
  }

  get title() {
    return this.args.size === 'square' ? this.args.text : undefined;
  }

  get size() {
    return this.args.size || 'medium';
  }

  get variant() {
    return this.args.variant || 'secondary';
  }

  @action handleClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}
