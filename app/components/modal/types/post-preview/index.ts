import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

export interface PostPreviewModalOptions {
  post: Post;
}

interface Signature {
  Args: {
    options: PostPreviewModalOptions;
  };
}

export default class PostPreviewModalComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClose() {
    this.modal.close();
  }
}
