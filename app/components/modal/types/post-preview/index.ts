import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Posts, Threads } from 'potber-client/services/api/types';
import CustomSession from 'potber-client/services/custom-session';
import ModalService from 'potber-client/services/modal';

export interface PostPreviewModalOptions {
  post: Posts.Write | Threads.OpeningPost;
}

interface Signature {
  Args: {
    options: PostPreviewModalOptions;
  };
}

export default class PostPreviewModalComponent extends Component<Signature> {
  @service declare modal: ModalService;
  @service declare session: CustomSession;

  get preview(): Partial<Posts.Read> {
    const preview: Partial<Posts.Read> = {
      ...this.args.options.post,
      date: new Date(),
      author: {
        id: this.session.sessionData?.id ?? '',
        name: this.session.sessionData?.username,
      },
      avatarUrl: this.session.sessionData?.avatarUrl,
    };
    return preview;
  }

  @action handleClose() {
    this.modal.close();
  }
}
