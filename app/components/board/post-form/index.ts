import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ModalService from 'potber-client/services/modal';

export interface PostFormContent {
  id?: string;
  title: string;
  icon: string;
  message: string;
  convertUrls: boolean;
  disableBbCode: boolean;
  disableEmojis: boolean;
  token: string;
}

interface Signature {
  Args: {
    post: PostFormContent;
    hideTitle?: boolean;
    submitLabel: string;
    onSubmit: (post: PostFormContent) => void;
  };
}

export default class PostFormComponent extends Component<Signature> {
  @service declare modal: ModalService;
  @tracked icon = this.args.post.icon;

  get submitLabel() {
    return this.args.submitLabel || 'Absenden';
  }

  get textarea() {
    const textarea = document.getElementById('post-form-textarea');
    if (textarea) {
      return textarea as HTMLTextAreaElement;
    } else throw new Error('post-form-textarea could not be found.');
  }

  @action handleMessageChange(event: InputEvent) {
    this.args.post.message = (event.target as HTMLInputElement).value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.args.onSubmit) {
      this.args.onSubmit(this.args.post);
    }
  }
}
