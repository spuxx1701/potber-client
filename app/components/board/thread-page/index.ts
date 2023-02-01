import Component from '@glimmer/component';
import { ThreadPage } from 'potber/services/api/types/thread';

interface Signature {
  Args: {
    page: ThreadPage;
    avatarStyle?: 'nome' | 'small';
    reverseOrder?: boolean;
    subtleUntilPostId?: string;
  };
}

export default class ThreadPageComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get avatarStyle() {
    return this.args.avatarStyle || 'none';
  }

  get posts() {
    if (this.args.reverseOrder) {
      return this.args.page.posts.reverse();
    } else {
      return this.args.page.posts;
    }
  }

  get makeAllPostsSubtle() {
    return this.args.subtleUntilPostId === '*';
  }
}
