import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber-client/services/modal';

interface Values {
  src: string;
  thumbnail: string;
}

export interface ImageInsertModalOptions {
  onSubmit: (values: Values) => void;
}

interface Signature {
  Args: {
    options: ImageInsertModalOptions;
  };
}

export default class ImageInsertModalComponent extends Component<Signature> {
  declare args: Signature['Args'];
  @service declare modal: ModalService;

  formId = 'image-insert-modal-form';

  values: Values = {
    src: '',
    thumbnail: '',
  };

  @action handleSrcChange(value: string) {
    this.values.src = value;
  }

  @action handleThumbnailChange(value: string) {
    this.values.thumbnail = value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = document.getElementById(this.formId) as HTMLFormElement;
    if (form.reportValidity()) {
      this.args.options.onSubmit(this.values);
    }
  }

  @action handleCancel() {
    this.modal.close();
  }
}
