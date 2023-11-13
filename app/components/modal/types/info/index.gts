import Component from '@glimmer/component';
import { service } from '@ember/service';
import ModalService from 'potber-client/services/modal';
import ModalHeader from 'potber-client/components/modal/component/header';
import ModalContent from 'potber-client/components/modal/component/content';
import ModalFooter from 'potber-client/components/modal/component/footer';
import Button from 'potber-client/components/common/control/button';
import t from 'ember-intl/helpers/t';
import { InfoModalOptions } from './types';

interface Signature {
  Args: {
    options: InfoModalOptions;
  };
}

export default class InfoModal extends Component<Signature> {
  @service declare modal: ModalService;

  handleClose = () => {
    this.modal.close();
  };

  <template>
    <ModalHeader @title={{@options.title}} />
    <ModalContent>
      <p>{{@options.text}}</p>
    </ModalContent>
    <ModalFooter>
      <Button
        @text={{t 'misc.close'}}
        @variant='secondary'
        @size='small'
        @onClick={{this.handleClose}}
      />
    </ModalFooter>
  </template>
}
