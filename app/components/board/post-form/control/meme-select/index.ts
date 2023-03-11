import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Post;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormControlMemeSelectComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClick() {
    this.modal.memeSelect({
      onSelect: this.handleSelect,
    });
  }

  @action handleSelect(url: string) {
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    const insertion = `[img]${url}[/img]`;
    this.args.post.message =
      message.substring(0, this.args.textarea.selectionEnd) +
      insertion +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
    // Close the dialog and...
    this.modal.close(() => {
      // ...reselect the textarea and update the caret position to match
      // the inserted emoji so the user can continue typing
      const newCaretPosition = selectionEnd + insertion.length;
      this.args.textarea.select();
      this.args.textarea.setSelectionRange(newCaretPosition, newCaretPosition);
    });
  }
}
