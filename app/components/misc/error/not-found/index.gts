import { service } from '@ember/service';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import Component from '@glimmer/component';
import { IntlService, t } from 'ember-intl';
import ButtonLink from 'potber-client/components/common/button-link';
import Button from 'potber-client/components/common/control/button';

export default class NotFoundError extends Component {
  @service declare intl: IntlService;

  reload = () => {
    window.location.reload();
  };

  <template>
    <div class='error-container'>
      <h1>404</h1>

      <h3>{{t 'component.misc.error.not-found.text'}}</h3>

      <div class='control-row'>
        <ButtonLink
          @variant='primary'
          @size='medium'
          @route='authenticated.home'
        >
          <FaIcon @icon='house' />
          {{t 'component.misc.error.not-found.home'}}
        </ButtonLink>
        <Button
          @icon='rotate-right'
          @text={{t 'component.misc.error.not-found.reload'}}
          @size='large'
          @variant='primary'
          @onClick={{this.reload}}
        />
      </div>
    </div>
  </template>
}
