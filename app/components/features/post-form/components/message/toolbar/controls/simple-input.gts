import { service } from '@ember/service';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import Component from '@glimmer/component';
import Button from 'potber-client/components/common/control/button';
import { Posts, Threads } from 'potber-client/services/api/types';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
    textarea: HTMLTextAreaElement;
    opening: string;
    closing: string;
    title: string;
    icon: IconName;
    label: string;
    prefix?: IconPrefix;
    type?: 'number' | 'text' | 'url';
    useTextarea?: boolean;
  };
}

export default class PostFormMessageSimpleInput extends Component<Signature> {
  @service declare modal: ModalService;

  get type() {
    return this.args.type || 'text';
  }

  handleClick = () => {
    this.modal.input({
      title: this.args.title,
      icon: this.args.icon,
      prefix: this.args.prefix,
      label: this.args.label,
      type: this.type,
      useTextarea: this.args.useTextarea,
      onSubmit: this.handleSubmit,
    });
  };

  handleSubmit = (value: string) => {
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
  };

  <template>
    <Button
      @icon={{@icon}}
      @prefix={{@prefix}}
      @variant='primary-transparent'
      @text={{@title}}
      @size='square'
      @type='button'
      @onClick={{this.handleClick}}
    />
  </template>
}
