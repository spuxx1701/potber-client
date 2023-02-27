import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber-client/services/modal';

export default class ModalComponent extends Component {
  @service declare modal: ModalService;

  get activeModal() {
    return this.modal.activeModal;
  }

  @action handleModalCancel(event: Event) {
    event.preventDefault();
    this.modal.close();
  }

  @action handleModalClick(event: MouseEvent) {
    // Close the modal if clicked anywhere outside the dialog
    const dialog = event.target as HTMLElement;
    const rect = dialog.getBoundingClientRect();
    const minX = rect.left + dialog.clientLeft;
    const minY = rect.top + dialog.clientTop;
    if (
      event.clientX < minX ||
      event.clientX >= minX + dialog.clientWidth ||
      event.clientY < minY ||
      event.clientY >= minY + dialog.clientHeight
    ) {
      this.modal.close();
    }
  }
}
