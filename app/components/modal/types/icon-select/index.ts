import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ModalService from 'potber-client/services/modal';
import {
  postIcons,
  emojis,
  getRandomEmojiIcon,
} from 'potber-client/utils/icons';

export interface IconSelectModalOptions {
  type: 'post-icon' | 'post-emoji';
  onSelect: (key: string) => void;
}

interface Signature {
  Args: {
    options: IconSelectModalOptions;
  };
}

interface IconOption {
  key: string;
  filename: string;
  directory: string;
}

export default class IconSelectModalComponent extends Component<Signature> {
  @service declare modal: ModalService;

  get title() {
    switch (this.args.options.type) {
      case 'post-icon':
        return 'Wähle ein Post-Icon';
      default:
        return 'Wähle einen Emoji';
    }
  }

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  get options() {
    switch (this.args.options.type) {
      case 'post-icon':
        return postIcons.map((postIcon) => {
          return { ...postIcon, directory: 'post-icons' } as IconOption;
        });
      default:
        return emojis.map((emoji) => {
          return { ...emoji, directory: 'post-emojis' } as IconOption;
        });
    }
  }

  @action handleSelect(option: IconOption) {
    this.args.options.onSelect(option.key);
  }

  @action handleCancel() {
    this.modal.close();
  }
}
