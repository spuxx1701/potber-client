import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';
import { getRandomEmojiIcon } from 'potber-client/utils/icons';

interface Signature {
  Args: {
    post: Post;
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
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, this.args.textarea.selectionEnd) +
      key +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
  }
}
