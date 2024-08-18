import { service } from '@ember/service';
import Component from '@glimmer/component';
import SocialsService from 'potber-client/services/socials';
import BlocklistItem from './item';
import { t } from 'ember-intl';

export default class Blocklist extends Component {
  @service declare socials: SocialsService;

  get blockedUsers() {
    return this.socials.blockedUsers;
  }

  get isEmpty() {
    return this.blockedUsers.length <= 0;
  }

  <template>
    {{#unless this.isEmpty}}
      {{#each this.blockedUsers as |user|}}
        <BlocklistItem @user={{user}} />
      {{/each}}
    {{else}}
      <p class='subtitle'>{{t 'feature.blocklist.empty'}}</p>
    {{/unless}}
  </template>
}
