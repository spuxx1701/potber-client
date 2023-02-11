import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    text: string;
    icon?: string;
    prefix?: string;
    type?: 'button' | 'submit';
    size?: ControlSize;
    variant?: ControlVariant;
    busy?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  };
}

export default class CommonButtonComponent extends Component<Signature> {
  @service declare renderer: RendererService;
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

  get disabled() {
    return this.args.disabled || this.args.busy;
  }

  @action handleClick(event: MouseEvent) {
    this.renderer.createClickRipple(event);
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}
