import Component from '@glimmer/component';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName } from '@fortawesome/fontawesome-common-types';
import styles from '../styles.module.css';

interface Signature {
  Element: HTMLAnchorElement;
  Args: {
    text: string;
    icon?: IconName;
    href: string;
  };
}

export default class MenuLinkExternal extends Component<Signature> {
  styles = styles;

  <template>
    <a
      class='button-link control-size-max menu-item control-variant-secondary-transparent'
      href={{@href}}
      ...attributes
    >
      {{#if @icon}}
        <FaIcon @icon={{@icon}} />
      {{/if}}
      {{@text}}
    </a>
  </template>
}
