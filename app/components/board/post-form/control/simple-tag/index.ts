import { action } from '@ember/object';
import Component from '@glimmer/component';
import { PostFormContent } from '../..';

interface Signature {
  Args: {
    text: string;
    icon: string;
    prefix?: string;
    opening: string;
    closing: string;
    textarea: HTMLTextAreaElement;
    post: PostFormContent;
  };
}

export default class PostFormControlSimpleTagComponent extends Component<Signature> {
  @action handleClick() {
    this.insertTag();
  }

  insertTag() {
    const message = this.args.post.message;
    const selectionStart = this.args.textarea.selectionStart;
    const selectionEnd = this.args.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, selectionStart) +
      this.args.opening +
      message.substring(selectionStart, selectionEnd) +
      this.args.closing +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
  }
}