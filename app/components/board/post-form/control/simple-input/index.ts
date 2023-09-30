import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    title: string;
    label: string;
    icon: string;
    prefix?: string;
    opening: string;
    closing: string;
    post: Post;
    useTextarea?: boolean;
    type?: 'text' | 'number' | 'url';
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormControlSimpleInputComponent extends Component<Signature> {
  @service declare modal: ModalService;

  get type() {
    return this.args.type || 'text';
  }

  @action handleClick() {
    this.modal.input({
      title: this.args.title,
      icon: this.args.icon,
      prefix: this.args.prefix,
      label: this.args.label,
      type: this.type,
      useTextarea: this.args.useTextarea,
      onSubmit: this.handleSubmit,
    });
  }

  @action handleSubmit(value: string) {
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    const insertion = `${this.args.opening}${value}${this.args.closing}`;
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
