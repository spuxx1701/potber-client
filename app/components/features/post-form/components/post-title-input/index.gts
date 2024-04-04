import { on } from '@ember/modifier';
import { service } from '@ember/service';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { IntlService, t } from 'ember-intl';
import eq from 'ember-truth-helpers/helpers/eq';
import Icon from 'potber-client/components/board/icon';
import Button from 'potber-client/components/common/control/button';
import Input from 'potber-client/components/common/control/input';
import classNames from 'potber-client/helpers/class-names';
import { WritablePost } from 'potber-client/services/api/models/post';
import { Posts, Threads } from 'potber-client/services/api/types';
import ModalService from 'potber-client/services/modal';
import { getRandomEmojiIcon } from 'potber-client/utils/icons';
import styles from './styles.module.css';

interface Signature {
  Args: {
    post: Posts.Write | Threads.OpeningPost;
  };
}

export default class PostFormPostTitle extends Component<Signature> {
  @service declare intl: IntlService;
  @service declare modal: ModalService;

  @tracked displayedIcon: string = this.args.post.icon || '0';
  styles = styles;

  get title() {
    return this.args.post.title ?? '';
  }

  get label() {
    if (this.args.post instanceof WritablePost) {
      return this.intl.t('feature.post-form.post.title');
    }
    return this.intl.t('feature.post-form.thread.subtitle');
  }

  get randomEmojiIcon() {
    return getRandomEmojiIcon();
  }

  handleIconClick = () => {
    this.modal.iconSelect({
      type: 'post-icon',
      onSelect: this.handleIconSelect,
    });
  };

  handleIconSelect = (key: string) => {
    this.args.post.icon = this.displayedIcon = key;
    this.modal.close();
  };

  handleTitleChange = (value: string) => {
    this.args.post.title = value;
  };

  <template>
    <div class={{classNames this 'container'}}>
      <Button
        @text={{t 'feature.post-form.message.toolbar.emojis'}}
        @variant='primary'
        @size='square'
        @type='button'
        {{on 'click' this.handleIconClick}}
      >
        {{#if (eq this.displayedIcon '0')}}
          <FaIcon @icon={{this.randomEmojiIcon}} @prefix='far' />
        {{else}}
          <Icon @icon={{this.displayedIcon}} />
        {{/if}}</Button>
      <Input
        @label={{this.label}}
        @size='auto'
        @value={{this.title}}
        @onChange={{this.handleTitleChange}}
        type='text'
        maxLength='255'
      />
    </div>
  </template>
}
