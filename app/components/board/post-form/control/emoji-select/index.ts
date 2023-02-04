import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber/services/modal';
import { getRandomEmojiIcon } from 'potber/utils/icons';
import { PostFormContent } from '../..';

interface Signature {
  Args: {
    post: PostFormContent;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormControlEmojiSelectComponent extends Component<Signature> {
  @service declare modal: ModalService;

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  @action handleClick() {
    this.modal.iconSelect({
      type: 'post-emoji',
      onSelect: this.handleSelect,
    });
  }

  @action handleSelect(key: string) {
    const message = this.args.post.message;
    const selectionEnd = this.args.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, this.args.textarea.selectionEnd) +
      key +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
  }
}
