import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ConfirmModalOptions } from 'potber-client/components/modal/types/confirm';
import { IconSelectModalOptions } from 'potber-client/components/modal/types/icon-select';
import { InputModalOptions } from 'potber-client/components/modal/types/input';
import { LinkInsertModalOptions } from 'potber-client/components/modal/types/link-insert';
import { MemeSelectModalOptions } from 'potber-client/components/modal/types/meme-select';
import { sleep } from 'potber-client/utils/misc';

const TIME_TO_DESTROY = 300;

interface ActiveModal {
  type: ModalType | null;
  options?: object;
}

export enum ModalType {
  confirm = 'confirm',
  input = 'input',
  iconSelect = 'icon-select',
  memeSelect = 'meme-select',
  linkInsert = 'link-insert',
}

export default class ModalService extends Service {
  @tracked activeModal: ActiveModal = {
    type: null,
    options: undefined,
  };

  get modal() {
    const modal = document.getElementById('modal');
    if (!modal) {
      throw new Error('Unable to find modal container.');
    }
    return modal as HTMLDialogElement;
  }

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
   * Calls an icon-select modal.
   * @param options The icon-select modal options.
   */
  iconSelect(options: IconSelectModalOptions) {
    this.show(ModalType.iconSelect, options);
  }

  /**
   * Calls the meme-select modal.
   */
  memeSelect(options: MemeSelectModalOptions) {
    this.show(ModalType.memeSelect, options);
  }

  /**
   * Calls an link-insert modal.
   * @param options The link-insert modal options.
   */
  linkInsert(options: LinkInsertModalOptions) {
    this.show(ModalType.linkInsert, options);
  }

  /**
   * Shows the modal dialog of the given type.
   * @param type The modal type.
   * @param options The modal options.
   */
  async show(type: ModalType, options?: object) {
    this.activeModal = { type, options };
    this.modal.show();
    // Wait for the DOM to have updated the 'display' CSS property. The amount of time doesn't matter,
    // but it needs to happen asynchronously.
    await sleep(1);
    this.modal.classList.add('show');
  }

  /**
   * Closes the modal dialog.
   * @param afterClose (optional) Fires after the dialog has closed.
   */
  async close(afterClose?: () => void) {
    this.modal.classList.remove('show');
    await sleep(TIME_TO_DESTROY);
    this.modal.close();
    this.activeModal = {
      type: null,
      options: undefined,
    };
    if (afterClose) {
      afterClose();
    }
  }
}
