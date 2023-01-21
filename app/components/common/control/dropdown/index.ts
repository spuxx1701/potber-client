import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RendererService from 'potber/services/renderer';

export interface DropdownOption {
  label: string;
  data: any;
}

export interface Args {
  label: string;
  options: DropdownOption[];
  default?: DropdownOption;
  onSelect?: (element: any) => void;
  size?: ControlSize;
}

export default class DropdownComponent extends Component<Args> {
  @service declare renderer: RendererService;

  componentId = 'dropdown-' + guidFor(this);

  @tracked selectedOption: DropdownOption | undefined;
  @tracked expanded = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    if (args.options.length > 0) {
      if (args.default) {
        this.selectedOption = args.default;
      } else {
        this.selectedOption = args.options[0];
      }
    } else {
      this.selectedOption = undefined;
    }
  }

  get caption() {
    return this.selectedOption?.label || '';
  }

  get options() {
    return this.args.options;
  }

  get size() {
    return this.args.size || 'medium';
  }

  @action toggle(event: MouseEvent) {
    this.renderer.createClickRipple(event);
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  @action expand() {
    this.expanded = true;
  }

  @action collapse() {
    this.expanded = false;
  }

  @action handleBlur(event: FocusEvent) {
    if (
      event.relatedTarget instanceof HTMLElement &&
      event.relatedTarget.matches('.dropdown-item')
    ) {
      return;
    }
    this.collapse();
  }

  @action handleItemClick(option: DropdownOption) {
    this.selectedOption = option;
    this.collapse();
    if (typeof this.args.onSelect === 'function') {
      this.args.onSelect(option);
    }
  }
}
