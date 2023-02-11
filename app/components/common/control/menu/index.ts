import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RendererService from 'potber-client/services/renderer';

export interface Signature {
  Args: {
    position:
      | 'top-left'
      | 'top'
      | 'top-right'
      | 'bottom-left'
      | 'bottom'
      | 'bottom-right';
    variant?: ControlVariant;
    icon?: string;
  };
}

export default class MenuComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];
  @tracked visible = false;

  get position() {
    return this.args.position || 'bottom-left';
  }

  get variant() {
    return this.args.variant || 'secondary';
  }

  get icon() {
    return this.args.icon || 'ellipsis-vertical';
  }

  @action handleClick(event: any) {
    this.renderer.createClickRipple(event);
    this.visible = !this.visible;
  }

  @action handleBlur(event: any) {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    this.visible = false;
  }
}
