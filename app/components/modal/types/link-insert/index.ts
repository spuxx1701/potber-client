import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ModalService from 'potber-client/services/modal';

export interface LinkInsertModalOptions {
  onSubmit: (url: string, text: string) => void;
}

interface Signature {
  Args: {
    options: LinkInsertModalOptions;
  };
}

export default class LinkInsertModalComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @tracked url = '';
  @tracked text = '';

  @action handleUrlchange(value: string) {
    this.url = value;
    if (!this.text) this.text = this.url;
  }

  @action handleTextchange(value: string) {
    this.text = value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.args.options.onSubmit(this.url, this.text);
  }

  @action handleCancel() {
    this.modal.close();
  }
}
