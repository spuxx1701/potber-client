import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RendererService from 'potber-client/services/renderer';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import eq from 'ember-truth-helpers/helpers/eq';
import { DropdownOption } from './types';
import InfoButton from 'potber-client/components/common/control/info-button';

interface Args {
  label: string;
  options: DropdownOption[];
  default?: DropdownOption;
  onSelect?: (element: DropdownOption) => void;
  size?: ControlSize;
}

interface Signature {
  Args: Args;
  Blocks: {
    info?: InfoButton[];
  };
}

export default class DropdownComponent extends Component<Signature> {
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

  toggle = (event: MouseEvent) => {
    this.renderer.createClickRipple(event);
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  };

  expand = () => {
    this.expanded = true;
  };

  collapse = () => {
    this.expanded = false;
  };

  handleBlur = (event: FocusEvent) => {
    if (
      event.relatedTarget instanceof HTMLElement &&
      event.relatedTarget.matches('.dropdown-item')
    ) {
      return;
    }
    this.collapse();
  };

  handleItemClick = (option: DropdownOption) => {
    this.selectedOption = option;
    this.collapse();
    if (typeof this.args.onSelect === 'function') {
      this.args.onSelect(option);
    }
  };

  <template>
    <div class='dropdown control-size-{{this.size}}'>
      <div class='dropdown-inner'>
        <button
          id='{{this.componentId}}-button'
          class='dropdown-toggle control-variant-primary
            {{if this.expanded "dropdown-toggle-expanded"}}'
          type='button'
          aria-label={{@label}}
          aria-haspopup='true'
          aria-expanded='false'
          {{on 'click' this.toggle}}
          {{on 'blur' this.handleBlur}}
        >
          <p class='dropdown-toggle-caption'>{{this.caption}}</p>
          <FaIcon class='dropdown-toggle-icon' @icon='chevron-down' />
        </button>
        <label class='dropdown-label' for='{{this.componentId}}-button'>
          {{@label}}
        </label>
        <div class='dropdown-menu {{if this.expanded "dropdown-menu-visible"}}'>
          {{#each this.options as |option|}}
            <button
              class='dropdown-item
                {{if (eq option this.selectedOption) "dropdown-item-selected"}}'
              type='button'
              {{on 'click' (fn this.handleItemClick option)}}
            >{{option.label}}</button>
          {{/each}}
        </div>
      </div>
      {{yield to='info'}}
    </div>
  </template>
}
