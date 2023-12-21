import Component from '@glimmer/component';
import Thread from 'potber-client/models/thread';

interface Signature {
  Args: {
    thread: Thread;
  };
}

export default class RecentPosts extends Component<Signature> {
  get page() {
    return this.args.thread.page;
  }

  get posts() {
    return this.page?.posts.slice().reverse();
  }
}
