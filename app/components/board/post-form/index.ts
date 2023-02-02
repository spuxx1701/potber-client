import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface PostFormContent {
  title: string;
  icon: string;
  message: string;
  convertUrls: boolean;
  disableBbCode: boolean;
  disableEmojis: boolean;
}

interface Signature {
  Args: {
    post: PostFormContent;
    submitLabel: string;
    onSubmit: (post: PostFormContent) => void;
  };
}

export default class PostFormComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get submitLabel() {
    return this.args.submitLabel || 'Absenden';
  }

  get textarea() {
    const textarea = document.getElementById('post-form-textarea');
    if (textarea) {
      return textarea as HTMLTextAreaElement;
    } else throw new Error('post-form-textarea could not be found.');
  }

  @action handleTitleChange(value: string) {
    this.args.post.title = value;
  }

  @action handleMessageChange(event: InputEvent) {
    this.args.post.message = (event.target as HTMLInputElement).value;
  }

  @action insertTag(openingTag: string, closingTag: string) {
    const selectionStart = this.textarea.selectionStart;
    const selectionEnd = this.textarea.selectionEnd;
    const message = this.args.post.message;
    this.args.post.message =
      message.substring(0, selectionStart) +
      openingTag +
      message.substring(selectionStart, selectionEnd) +
      closingTag +
      message.substring(selectionEnd, message.length);
    this.textarea.value = this.args.post.message;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.args.onSubmit) {
      this.args.onSubmit(this.args.post);
    }
  }
}
