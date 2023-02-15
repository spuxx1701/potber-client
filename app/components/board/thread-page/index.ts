import Component from '@glimmer/component';
import Thread, { ThreadPage } from 'potber-client/models/thread';

interface Signature {
  Args: {
    thread: Thread;
    avatarStyle?: 'nome' | 'small';
    reverseOrder?: boolean;
    subtleUntilPostId?: string;
  };
}

export default class ThreadPageComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get page() {
    return this.args.thread.page as ThreadPage;
  }

  get avatarStyle() {
    return this.args.avatarStyle || 'none';
  }

  get posts() {
    if (this.args.reverseOrder) {
      return this.page.posts.reverse();
    } else {
      return this.page.posts;
    }
  }
}
