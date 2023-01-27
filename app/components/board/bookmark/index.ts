import Component from '@glimmer/component';
import { Bookmark } from 'potber/services/api/types/bookmark';

interface Signature {
  Args: {
    bookmark: Bookmark;
  };
}

export default class BoardBookmarkComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get hasNewPosts() {
    return this.args.bookmark.newPostsCount > 0;
  }

  get subtitle() {
    if (this.args.bookmark.newPostsCount === 1) {
      return `1 neuer Post`;
    } else {
      return `${this.args.bookmark.newPostsCount} neue Posts`;
    }
  }
}
