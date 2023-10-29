import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'potber-client/services/renderer';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
// import { yield } from
import { on } from '@ember/modifier';
import eq from 'ember-truth-helpers/helpers/eq';

interface Signature {
  Element: HTMLButtonElement;
  Args: {
    text?: string;
    icon?: IconName;
    prefix?: IconPrefix;
    type?: 'button' | 'submit';
    size?: ControlSize;
    variant?: ControlVariant;
    busy?: boolean;
    disabled?: boolean;
    iconSize?: 'normal' | 'small';
    onClick?: () => void;
  };
  Blocks: {
    default: [];
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

  get iconSize() {
    return this.args.iconSize ?? 'auto';
  }

  @action handleClick(event: MouseEvent) {
    this.renderer.createClickRipple(event);
    if (this.args.onClick) {
      this.args.onClick();
    }
  }

  <template>
    <button
      type={{this.type}}
      class='control-size-{{this.size}}
        control-variant-{{this.variant}}
        icon-size-{{this.iconSize}}'
      title={{this.title}}
      disabled={{this.disabled}}
      ...attributes
      {{on 'click' this.handleClick}}
    >
      {{#if @busy}}
        <FaIcon @icon='circle-notch' @spin={{true}} />
      {{else if @icon}}
        <FaIcon @icon={{@icon}} @prefix={{this.prefix}} />
      {{/if}}
      {{#unless (eq this.size 'square')}}
        {{@text}}
      {{/unless}}
      {{yield}}
    </button>
  </template>
}
