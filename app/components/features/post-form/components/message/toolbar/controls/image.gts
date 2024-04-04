import Component from '@glimmer/component';
import { Posts, Threads } from 'potber-client/services/api/types';
import Button from 'potber-client/components/common/control/button';
import ModalService from 'potber-client/services/modal';
import { service } from '@ember/service';
import { t } from 'ember-intl';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormMessageImage extends Component<Signature> {
  @service declare modal: ModalService;

  handleClick = () => {
    this.modal.imageInsert({
      onSubmit: this.handleSubmit,
    });
  };

  handleSubmit = (values: { src: string; thumbnail: string }) => {
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
  };

  <template>
    <Button
      @icon='image'
      @text={{t 'feature.post-form.message.toolbar.image.title'}}
      @variant='primary-transparent'
      @size='square'
      @type='button'
      @onClick={{this.handleClick}}
    />
  </template>
}
