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

export default class PostFormControlImageComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClick() {
    this.modal.imageInsert({
      onSubmit: this.handleSubmit,
    });
  }

  @action handleSubmit(values: { src: string; thumbnail: string }) {
    const { src, thumbnail } = values;
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    let insertion: string;
    if (thumbnail) {
      insertion = `[url=${src}][img]${thumbnail}[/img][/url]`;
    } else {
      insertion = `[img]${src}[/img]`;
    }
    this.args.post.message = `${message.substring(
      0,
      selectionEnd,
    )}${insertion}${message.substring(selectionEnd, message.length)}`;
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
