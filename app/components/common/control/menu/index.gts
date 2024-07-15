import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import RendererService from 'potber-client/services/renderer';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.module.css';
import { IntlService } from 'ember-intl';

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
    icon?: IconName;
    iconPrefix?: IconPrefix;
    title?: string;
  };
  Blocks: { default: [] };
}

export default class MenuComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare intl: IntlService;

  id = guidFor(this);
  styles = styles;

  @tracked position = this.calculatePosition();

  get variant() {
    return this.args.variant || 'secondary-transparent';
  }

  get icon() {
    return this.args.icon || 'ellipsis-vertical';
  }

  get tooltip() {
    return this.args.title || this.intl.t('misc.more');
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

  <template>
    <button
      id='{{this.id}}-button'
      type='button'
      class='menu-button control-size-square control-variant-{{this.variant}}
        icon-size-large'
      title={{this.tooltip}}
      {{on 'click' this.handleClick}}
      {{on 'blur' this.handleBlur}}
    >
      <FaIcon @icon={{this.icon}} @prefix={{@iconPrefix}} />
      {{#if this.args.title}}
        <p class={{classNames this 'title'}}>{{this.args.title}}</p>
      {{/if}}
      <menu
        id='{{this.id}}-menu'
        class={{classNames this this.position}}
        data-visible='false'
      >
        {{yield}}
      </menu>
    </button>
  </template>
}
