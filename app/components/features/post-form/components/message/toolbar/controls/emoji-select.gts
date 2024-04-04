import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import Button from 'potber-client/components/common/control/button';
import { Posts, Threads } from 'potber-client/services/api/types';
import ModalService from 'potber-client/services/modal';
import { getRandomEmojiIcon } from 'potber-client/utils/icons';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormMessageEmojiSelect extends Component<Signature> {
  @service declare modal: ModalService;

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  handleClick = () => {
    this.modal.iconSelect({
      type: 'post-emoji',
      onSelect: this.handleSelect,
    });
  };

  handleSelect = (key: string) => {
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    this.args.post.message =
      message.substring(0, this.args.textarea.selectionEnd) +
      key +
      message.substring(selectionEnd, message.length);
    this.args.textarea.value = this.args.post.message;
    // Close the dialog and...
    this.modal.close(() => {
      // ...reselect the textarea and update the caret position to match
      // the inserted emoji so the user can continue typing
      const newCaretPosition = selectionEnd + key.length;
      this.args.textarea.select();
      this.args.textarea.setSelectionRange(newCaretPosition, newCaretPosition);
    });
  };

  <template>
    <Button
      @icon={{this.randomEmojiIcon}}
      @prefix='far'
      @text={{t 'feature.post-form.message.toolbar.emojis'}}
      @variant='primary-transparent'
      @size='square'
      @type='button'
      {{on 'click' this.handleClick}}
    />
  </template>
}
