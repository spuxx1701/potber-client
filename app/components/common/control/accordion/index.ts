import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Signature {
  Args: {
    size?: ControlSize;
    variant?: ControlVariant;
  };
}

export default class AccordionComponent extends Component<Signature> {
  @tracked expanded = false;

  get size(): ControlSize {
    return this.args.size || 'max';
  }

  get variant(): ControlVariant {
    return this.args.variant || 'primary-transparent';
  }

  get icon() {
    if (this.expanded) {
      return 'chevron-down';
    } else {
      return 'chevron-right';
    }
  }

  @action toggle() {
    this.expanded = !this.expanded;
  }
}
