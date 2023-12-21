import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ApiService from 'potber-client/services/api';
import { Posts } from 'potber-client/services/api/types';
import DeviceManagerService from 'potber-client/services/device-manager';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Posts.Write;
    hideTitle?: boolean;
    submitLabel: string;
    onSubmit: (post: Posts.Write) => void;
    navTitle?: string;
    navSubtitle?: string;
  };
}

export default class PostFormComponent extends Component<Signature> {
  @service declare modal: ModalService;
  @service declare deviceManager: DeviceManagerService;
  @service declare api: ApiService;
  @tracked icon = this.args.post.icon;

  get submitLabel() {
    return this.args.submitLabel || 'Absenden';
  }

  get textarea() {
    const textarea = document.getElementById('textarea-post-form-textarea');
    if (textarea) {
      return textarea as HTMLTextAreaElement;
    } else throw new Error('textarea-post-form-textarea could not be found.');
  }

  get showPreviewAndSubmitButtons() {
    return this.deviceManager.isDesktop;
  }

  handleMessageChange = (event: InputEvent) => {
    this.args.post.message = (event.target as HTMLInputElement).value;
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (this.args.onSubmit) {
      this.args.onSubmit(this.args.post);
    }
  };

  handlePreview = () => {
    this.modal.postPreview({ post: this.args.post });
  };
}
