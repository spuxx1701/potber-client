import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ModalService from 'potber/services/modal';
import { getRandomEmojiIcon } from 'potber/utils/icons';

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
  @service declare modal: ModalService;
  @tracked icon = this.args.post.icon;

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  get submitLabel() {
    return this.args.submitLabel || 'Absenden';
  }

  get textarea() {
    const textarea = document.getElementById('post-form-textarea');
    if (textarea) {
      return textarea as HTMLTextAreaElement;
    } else throw new Error('post-form-textarea could not be found.');
  }

  @action handlePostEmojiClick() {
    this.modal.iconSelect({
      type: 'post-emoji',
      onSelect: this.handlePostEmojiSelect,
    });
  }

  @action handlePostEmojiSelect(key: string) {
    const message = this.args.post.message;
    const selectionEnd = this.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, this.textarea.selectionEnd) +
      key +
      message.substring(selectionEnd, message.length);
    this.textarea.value = this.args.post.message;
  }

  @action handleTitleChange(value: string) {
    this.args.post.title = value;
  }

  @action handlePostIconClick() {
    this.modal.iconSelect({
      type: 'post-icon',
      onSelect: this.handlePostIconSelect,
    });
  }

  @action handlePostIconSelect(key: string) {
    this.args.post.icon = this.icon = key;
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
