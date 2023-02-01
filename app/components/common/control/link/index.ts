import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber/services/renderer';

export interface Signature {
  Args: {
    route: string;
    query?: object;
    size?: ControlSize;
    variant?: ControlVariant;
    title?: string;
    disabled?: boolean;
    onClick?: () => void;
  };
}

export default class CommonControlLinkComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  @action handleClick(event: MouseEvent) {
    this.renderer.createClickRipple(event);
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
