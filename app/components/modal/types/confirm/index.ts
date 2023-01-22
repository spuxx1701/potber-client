import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber/services/modal';

export interface ConfirmModalOptions {
  title: string;
  variant?: ModalVariant;
  icon?: string;
  prefix?: string;
  text: string;
  submitLabel?: string;
  submitIcon?: string;
  cancelLabel?: string;
  cancelIcon?: string;
  onSubmit?: () => void;
}

interface Signature {
  Args: {
    options: ConfirmModalOptions;
  };
}

export default class ConfirmModalComponent extends Component<Signature> {
  @service declare modal: ModalService;
  declare args: Signature['Args'];

  get submitLabel() {
    return this.args.options.submitLabel || 'OK';
  }

  get cancelLabel() {
    return this.args.options.cancelLabel || 'Abbrechen';
  }

  @action handleSubmit() {
    if (this.args.options.onSubmit) {
      this.args.options.onSubmit();
    }
  }

  @action handleCancel() {
    this.modal.close();
  }
}
