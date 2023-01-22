import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ConfirmModalOptions } from 'potber/components/modal/types/confirm';
import { InputModalOptions } from 'potber/components/modal/types/input';
import { sleep } from 'potber/utils/misc';

const TIME_TO_DESTROY = 300;

interface ActiveModal {
  type: ModalType | null;
  options: object | null;
}

export enum ModalType {
  confirm = 'confirm',
  input = 'input',
}

export default class ModalService extends Service {
  @tracked activeModal: ActiveModal = {
    type: null,
    options: null,
  };

  /**
   * Calls a confirm modal.
   * @param options The confirm modal options.
   */
  confirm(options: ConfirmModalOptions) {
    this.show(ModalType.confirm, options);
  }

  /**
   * Calls an input modal.
   * @param options The input modal options.
   */
  input(options: InputModalOptions) {
    this.show(ModalType.input, options);
  }

  /**
   * Returns the modal container or throws an error if it cannot be found.
   * @returns The modal container.
   */
  getModalContainer() {
    const modal = document.getElementById('modal');
    if (!modal) {
      throw new Error('Unable to find modal container.');
    }
    return modal as HTMLDialogElement;
  }

  /**
   * Shows the modal dialog of the given type.
   * @param type The modal type.
   * @param options The modal options.
   */
  show(type: ModalType, options: object) {
    this.activeModal = { type, options };
    document.documentElement.style.setProperty('--modal-opacity', '1');
    document.documentElement.style.setProperty('--modal-scale', '1');
    this.getModalContainer().showModal();
  }

  /**
   * Closes the modal dialog.
   */
  async close() {
    document.documentElement.style.setProperty('--modal-opacity', '0');
    document.documentElement.style.setProperty('--modal-scale', '0');
    await sleep(TIME_TO_DESTROY);
    this.getModalContainer().close();
    this.activeModal = {
      type: null,
      options: null,
    };
  }
}
