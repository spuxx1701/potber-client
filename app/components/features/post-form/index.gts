import Component from '@glimmer/component';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.module.css';
import PostFormNav from 'potber-client/components/nav/features/post-form';
import { WritablePost } from 'potber-client/services/api/models/post';
import { WritableThread } from 'potber-client/services/api/models/thread';
import { service } from '@ember/service';
import DeviceManagerService from 'potber-client/services/device-manager';
import ModalService from 'potber-client/services/modal';
import { Posts, Threads } from 'potber-client/services/api/types';
import Button from 'potber-client/components/common/control/button';
import { on } from '@ember/modifier';
import Menu from 'potber-client/components/common/control/menu';
import MenuCheckbox from 'potber-client/components/common/control/menu/checkbox';
import { t } from 'ember-intl';

interface Signature {
  Element: HTMLFormElement;
  Blocks: { default: [] };
  Args: {
    id: string;
    threadOrPost: WritablePost | WritableThread;
    navTitle: string;
    navSubtitle?: string;
    navLoading?: boolean;
    onSubmit: (payload: WritablePost | WritableThread) => void;
  };
}

export default class PostForm extends Component<Signature> {
  @service declare deviceManager: DeviceManagerService;
  @service declare modal: ModalService;

  get post(): Posts.Write | Threads.OpeningPost {
    if (this.args.threadOrPost instanceof WritableThread) {
      return this.args.threadOrPost.openingPost;
    } else return this.args.threadOrPost;
  }

  handleConvertUrlsChange = (value: boolean) => {
    this.post.convertUrls = value;
  };

  handleDisableBbCodeChange = (value: boolean) => {
    this.post.disableBbCode = value;
  };

  handleDisableEmojisChange = (value: boolean) => {
    this.post.disableEmojis = value;
  };

  handlePreview = () => {
    this.modal.postPreview({ post: this.post });
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (this.args.onSubmit) {
      this.args.onSubmit(this.args.threadOrPost);
    }
  };

  styles = styles;

  <template>
    <PostFormNav
      @formId={{@id}}
      @threadOrPost={{@threadOrPost}}
      @title={{@navTitle}}
      @subtitle={{@navSubtitle}}
      @loading={{@navLoading}}
    />
    <form
      class={{classNames this 'form'}}
      id={{@id}}
      {{on 'submit' this.handleSubmit}}
      ...attributes
    >
      {{yield}}
      {{#if this.deviceManager.isDesktop}}
        <div class={{classNames this 'button-row'}}>
          <Menu
            @position='top'
            @variant='secondary-transparent'
            @icon='ellipsis'
            @title={{t 'route.post.form.options'}}
          >
            <MenuCheckbox
              @text={{t 'route.post.form.convert-urls'}}
              @default={{this.post.convertUrls}}
              @onChange={{this.handleConvertUrlsChange}}
            />
            <MenuCheckbox
              @text={{t 'route.post.form.disable-bbcode'}}
              @default={{this.post.disableBbCode}}
              @onChange={{this.handleDisableBbCodeChange}}
            />
            <MenuCheckbox
              @text={{t 'route.post.form.disable-emojis'}}
              @default={{this.post.disableEmojis}}
              @onChange={{this.handleDisableEmojisChange}}
            />
          </Menu>
          <Button
            @icon='eye'
            @text='Vorschau'
            @variant='secondary-transparent'
            @size='large'
            @type='button'
            @onClick={{this.handlePreview}}
          />
          <Button
            @icon='check'
            @text='Absenden'
            @variant='primary'
            @size='large'
            @type='submit'
            @busy={{@threadOrPost.isSaving}}
          />
        </div>
      {{/if}}
    </form>
  </template>
}
