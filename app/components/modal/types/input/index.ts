import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber/services/modal';

export interface InputModalOptions {
  title: string;
  icon?: string;
  prefix?: string;
  text?: string;
  label: string;
  value?: string;
  inputType?: 'text' | 'number';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
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

  get inputType() {
    return this.args.options.inputType || 'text';
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
