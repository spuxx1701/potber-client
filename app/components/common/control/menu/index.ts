import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import RendererService from 'potber-client/services/renderer';

export interface Signature {
  Args: {
    position:
      | 'auto'
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
  id = guidFor(this);
  @tracked visible = false;
  @tracked position = this.calculatePosition();

  get variant() {
    return this.args.variant || 'secondary';
  }

  get icon() {
    return this.args.icon || 'ellipsis-vertical';
  }

  calculatePosition() {
    if (this.args.position === 'auto') {
      const element = document.getElementById(this.id) as Element;
      const rect = element.getBoundingClientRect();
      let position = '';
      if (rect.top > window.innerHeight / 2) {
        position += 'top-';
      } else {
        position += 'bottom-';
      }
      if (rect.left > window.innerWidth / 2) {
        position += 'left';
      } else {
        position += 'right';
      }
      return position;
    } else {
      return this.args.position;
    }
  }

  updatePosition() {
    this.position = this.calculatePosition();
  }

  @action handleClick(event: any) {
    this.updatePosition();
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
