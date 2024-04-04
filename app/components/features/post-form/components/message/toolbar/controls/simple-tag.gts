import { on } from '@ember/modifier';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import Component from '@glimmer/component';
import Button from 'potber-client/components/common/control/button';
import { Posts, Threads } from 'potber-client/services/api/types';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
    textarea: HTMLTextAreaElement;
    text: string;
    icon: IconName;
    opening: string;
    closing: string;
    prefix?: IconPrefix;
  };
}

export default class PostFormMessageSimpleTag extends Component<Signature> {
  handleClick = () => {
    this.insertTag();
  };

  insertTag() {
    const message = this.args.post.message || '';
    const selectionStart = this.args.textarea.selectionStart;
    const selectionEnd = this.args.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, selectionStart) +
      this.args.opening +
      message.substring(selectionStart, selectionEnd) +
      this.args.closing +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
    // Reselect the textarea and update the caret position to match
    // the inserted tag so the user can continue typing
    const newCaretPosition = selectionEnd + this.args.opening.length;
    this.args.textarea.select();
    this.args.textarea.setSelectionRange(newCaretPosition, newCaretPosition);
  }

  <template>
    <Button
      @text={{@text}}
      @icon={{@icon}}
      @prefix={{@prefix}}
      @variant='primary-transparent'
      @size='square'
      @type='button'
      {{on 'click' this.handleClick}}
    />
  </template>
}
