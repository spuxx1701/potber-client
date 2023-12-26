import Component from '@glimmer/component';
import Portal from 'ember-stargate/components/portal';
import NavHeader from '../../component/header';
import Button from 'potber-client/components/common/control/button';
import { service } from '@ember/service';
import DeviceManagerService from 'potber-client/services/device-manager';
import ModalService from 'potber-client/services/modal';
import { NewPost, UpdatedPost } from 'potber-client/services/api/models/post';
import t from 'ember-intl/helpers/t';

interface Signature {
  Args: {
    post: NewPost | UpdatedPost;
    title: string;
    subtitle?: string;
  };
}

export default class NavPostFormComponent extends Component<Signature> {
  @service declare deviceManager: DeviceManagerService;
  @service declare modal: ModalService;

  get showControls() {
    return !this.deviceManager.isDesktop;
  }

  handleBack = () => {
    history.back();
  };

  handlePreview = () => {
    this.modal.postPreview({ post: this.args.post });
  };

  <template>
    <Portal @target='top-nav'>
      <NavHeader @title={{@title}} @subtitle={{@subtitle}} />
    </Portal>

    <Portal @target='bottom-nav'>
      <Button
        @text='Zurück'
        @icon='arrow-up'
        @size='square'
        @variant='primary-transparent'
        @onClick={{this.handleBack}}
        class='nav-element-left'
      />
      {{#if this.showControls}}
        <div class='flex-row align-items-center nav-element-right'>
          <Button
            @icon='eye'
            @text={{t 'route.post.form.preview'}}
            @variant='primary-transparent'
            @size='square'
            @type='button'
            @onClick={{this.handlePreview}}
          />
          <Button
            @icon='check'
            @text={{t 'route.post.form.submit'}}
            @variant='primary-transparent'
            @size='square'
            @type='submit'
            @busy={{@post.isSaving}}
            form='post-form'
          />
        </div>
      {{/if}}
    </Portal>
  </template>
}
