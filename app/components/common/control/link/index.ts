import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface Signature {
  Args: {
    route: string;
    query?: object;
    size?: ControlSize;
    variant?: ControlVariant;
    title?: string;
    onClick?: () => void;
  };
}

export default class CommonControlLinkComponent extends Component<Signature> {
  declare args: Signature['Args'];

  @action handleClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }

  get variant() {
    return this.args.variant || 'secondary';
  }

  get query() {
    return this.args.query || {};
  }
}
