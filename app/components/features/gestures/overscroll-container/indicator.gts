import Component from '@glimmer/component';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import { IconName } from '@fortawesome/fontawesome-common-types';

interface Signature {
  Element: HTMLSpanElement;
  Args: {
    direction: 'up' | 'down';
    label?: string;
  };
}

export default class OverscrollIndicator extends Component<Signature> {
  @service declare intl: IntlService;

  get label() {
    return this.args.label ?? this.intl.t('misc.refresh');
  }

  get icon(): IconName {
    return `arrow-${this.args.direction}`;
  }

  <template>
    <span class='overscroll-container-indicator' ...attributes><FaIcon
        @icon='circle-notch'
        @spin={{true}}
      /><p>{{this.label}}</p></span>
  </template>
}
