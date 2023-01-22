import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
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

  input(options: InputModalOptions) {
    this.show(ModalType.input, options);
  }

  getModalContainer() {
    const modal = document.getElementById('modal');
    if (!modal) {
      throw new Error('Unable to find modal container.');
    }
    return modal as HTMLDialogElement;
  }

  show(type: ModalType, options: object) {
    this.activeModal = { type, options };
    document.documentElement.style.setProperty('--modal-opacity', '1');
    document.documentElement.style.setProperty('--modal-scale', '1');
    this.getModalContainer().showModal();
  }

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
