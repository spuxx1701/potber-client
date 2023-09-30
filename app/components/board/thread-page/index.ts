import Component from '@glimmer/component';
import Thread, { ThreadPage } from 'potber-client/models/thread';

interface Signature {
  Args: {
    thread: Thread;
    reverseOrder?: boolean;
    lastReadPost?: string;
  };
}

export default class ThreadPageComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get page() {
    return this.args.thread.page as ThreadPage;
  }

  get posts() {
    if (this.args.reverseOrder) {
      return this.page.posts.reverse();
    } else {
      return this.page.posts;
    }
  }
}
