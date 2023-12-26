import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Users } from 'potber-client/services/api/types';
import ModalService from 'potber-client/services/modal';

export interface UserProfileModalOptions {
  user: Users.Read;
}

interface Signature {
  Args: {
    options: UserProfileModalOptions;
  };
}

export default class UserProfileModalComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClose() {
    this.modal.close();
  }
}
