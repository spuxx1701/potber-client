import { getOwner } from '@ember/application';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import Thread, { ThreadPage } from 'potber-client/models/thread';
import ThreadRoute from 'potber-client/routes/authenticated/thread';

interface Signature {
  Args: {
    thread: Thread;
    reverseOrder?: boolean;
    lastReadPost?: string;
  };
}

export default class ThreadPageComponent extends Component<Signature> {
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

  handleOverscroll = () => {
    const route = (getOwner(this) as Owner).lookup(
      'route:authenticated.thread',
    ) as ThreadRoute;
    route.refresh();
  };
}
