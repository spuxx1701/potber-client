import Component from '@glimmer/component';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName } from '@fortawesome/fontawesome-common-types';
import ButtonLink from 'potber-client/components/common/button-link';
import styles from '../styles.module.css';

interface Signature {
  Args: {
    text: string;
    icon?: IconName;
    route: string;
    query?: Record<string, unknown>;
    model?: string;
  };
}

export default class MenuLink extends Component<Signature> {
  styles = styles;

  <template>
    <ButtonLink
      @route={{@route}}
      @query={{@query}}
      @model={{@model}}
      @variant='secondary-transparent'
      class='menu-item'
    >
      {{#if @icon}}
        <FaIcon @icon={{@icon}} />
      {{/if}}
      {{@text}}
    </ButtonLink>
  </template>
}
