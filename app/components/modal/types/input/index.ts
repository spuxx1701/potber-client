import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber-client/services/modal';

export interface InputModalOptions {
  title: string;
  variant?: ModalVariant;
  icon?: string;
  prefix?: string;
  text?: string;
  label: string;
  value?: string;
  type?: 'text' | 'number';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  submitLabel?: string;
  submitIcon?: string;
  cancelLabel?: string;
  cancelIcon?: string;
  onSubmit?: (value: string) => void;
}

interface Signature {
  Args: {
    options: InputModalOptions;
  };
}

export default class InputModalComponent extends Component<Signature> {
  @service declare modal: ModalService;
  declare args: Signature['Args'];
  value = this.args.options.value || '';

  get type() {
    return this.args.options.type || 'text';
  }

  get submitLabel() {
    return this.args.options.submitLabel || 'OK';
  }

  get cancelLabel() {
    return this.args.options.cancelLabel || 'Abbrechen';
  }

  @action handleChange(value: string) {
    this.value = value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.args.options.onSubmit) {
      this.args.options.onSubmit(this.value);
    }
  }

  @action handleCancel() {
    this.modal.close();
  }
}
