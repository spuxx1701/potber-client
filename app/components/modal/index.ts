import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber/services/modal';

export default class ModalComponent extends Component {
  @service declare modal: ModalService;

  get activeModal() {
    return this.modal.activeModal;
  }

  @action handleModalCancel(event: Event) {
    event.preventDefault();
    this.modal.close();
  }
}
