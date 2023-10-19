import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import RendererService from 'potber-client/services/renderer';

export interface Signature {
  Args: {
    position?:
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
  @tracked position = this.calculatePosition();

  get variant() {
    return this.args.variant || 'secondary';
  }

  get icon() {
    return this.args.icon || 'ellipsis-vertical';
  }

  calculatePosition() {
    if (!this.args.position || this.args.position === 'auto') {
      const element = document.getElementById(`${this.id}-button`) as Element;
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
    const element = document.getElementById(`${this.id}-menu`) as Element;
    element.setAttribute(
      'data-visible',
      element.getAttribute('data-visible') === 'false' ? 'true' : 'false',
    );
  }

  @action handleBlur(event: any) {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    const element = document.getElementById(`${this.id}-menu`) as Element;
    element.setAttribute('data-visible', 'false');
  }
}
