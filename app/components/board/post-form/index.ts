import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Post;
    hideTitle?: boolean;
    submitLabel: string;
    onSubmit: (post: Post) => void;
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
