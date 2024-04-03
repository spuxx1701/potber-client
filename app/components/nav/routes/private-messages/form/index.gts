import Component from '@glimmer/component';
import Portal from 'ember-stargate/components/portal';
import t from 'ember-intl/helpers/t';
import NavHeader from 'potber-client/components/nav/component/header';
import Button from 'potber-client/components/common/control/button';
import { NewPrivateMessage } from 'potber-client/services/api/models/private-message';

interface Signature {
  Args: {
    title: string;
    subtitle: string;
    message: NewPrivateMessage;
  };
}

export default class PrivateMessagesFormNav extends Component<Signature> {
  handleBack = () => {
    history.back();
  };

  <template>
    <Portal @target='top-nav'>
      <NavHeader @title={{@title}} @subtitle={{@subtitle}} />
    </Portal>

    <Portal @target='bottom-nav'>
      <Button
        @text={{t 'misc.back'}}
        @icon='arrow-up'
        @size='square'
        @variant='primary-transparent'
        @onClick={{this.handleBack}}
        class='nav-element-left'
      />
      <div class='flex-row align-items-center'>
        <Button
          @icon='check'
          @text={{t 'route.private-messages.form.submit'}}
          @variant='primary-transparent'
          @size='square'
          @type='submit'
          @busy={{@message.isSaving}}
          class='nav-element-right'
          form='private-message-form'
        />
      </div>
    </Portal>
  </template>
}
