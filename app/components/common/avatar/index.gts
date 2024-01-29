import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import classNames from 'potber-client/helpers/class-names';
import ApiService from 'potber-client/services/api';
import ModalService from 'potber-client/services/modal';
import styles from './styles.css';

interface Signature {
  Element: HTMLSpanElement;
  Args: {
    src: string;
    userId?: string;
    size?: 'small' | 'large';
    showSkeleton?: boolean;
  };
}

export default class Avatar extends Component<Signature> {
  @service declare api: ApiService;
  @service declare modal: ModalService;

  styles = styles;

  get size() {
    return this.args.size || 'small';
  }

  get interactable() {
    return !this.args.showSkeleton && this.args.userId;
  }

  showUserProfile = async () => {
    const { userId } = this.args;
    if (!userId) return;
    try {
      const user = await this.api.findUserById(userId);
      this.modal.userProfile({ user });
    } catch (error: any) {
      // In case of an error, do not call the modal
      return;
    }
  };

  <template>
    <button
      type='button'
      class='avatar
        {{classNames
          this
          this.size
          (unless this.interactable "not-interactable" "")
          (if this.args.showSkeleton "loading" "")
        }}'
      aria-role={{if this.interactable 'button' 'span'}}
      {{on 'click' this.showUserProfile}}
      ...attributes
    >
      {{#unless this.args.showSkeleton}}
        <img src={{@src}} alt={{@src}} />
      {{else}}
        <span class='skeleton-element'>
          <span class='skeleton-shimmer' />
        </span>
      {{/unless}}
    </button>
  </template>
}
