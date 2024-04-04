import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import Button from 'potber-client/components/common/control/button';
import { Posts, Threads } from 'potber-client/services/api/types';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormMessageMemeSelect extends Component<Signature> {
  @service declare modal: ModalService;

  handleClick = () => {
    this.modal.memeSelect({
      onSelect: this.handleSelect,
    });
  };

  handleSelect = (url: string) => {
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
  };

  <template>
    <Button
      @icon='fire'
      @text={{t 'feature.post-form.message.toolbar.memes'}}
      @variant='primary-transparent'
      @size='square'
      @type='button'
      {{on 'click' this.handleClick}}
    />
  </template>
}
