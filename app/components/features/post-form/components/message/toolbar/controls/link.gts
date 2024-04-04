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

export default class PostFormMessageLink extends Component<Signature> {
  @service declare modal: ModalService;

  handleClick = () => {
    this.modal.linkInsert({
      onSubmit: this.handleSubmit,
    });
  };

  handleSubmit = (url: string, text: string) => {
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    const insertion = `[url=${url}]${text}[/url]`;
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
      @icon='link'
      @text={{t 'feature.post-form.message.toolbar.link.title'}}
      @variant='primary-transparent'
      @size='square'
      @type='button'
      @onClick={{this.handleClick}}
    />
  </template>
}
