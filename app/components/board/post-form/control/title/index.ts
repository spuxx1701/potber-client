import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ModalService from 'potber-client/services/modal';
import { getRandomEmojiIcon } from 'potber-client/utils/icons';
import { PostFormContent } from '../..';

interface Signature {
  Args: {
    post: PostFormContent;
  };
}

export default class PostFormControlTitleComponent extends Component<Signature> {
  @service declare modal: ModalService;
  @tracked icon: string = this.args.post.icon;

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  @action handleTitleChange(value: string) {
    this.args.post.title = value;
  }

  @action handleIconClick() {
    this.modal.iconSelect({
      type: 'post-icon',
      onSelect: this.handleSelect,
    });
  }

  @action handleSelect(key: string) {
    this.args.post.icon = this.icon = key;
  }
}
