import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import LocalStorageService from 'potber-client/services/local-storage';

interface Signature {
  Args: {
    savedPosts: Post[] | null;
  };
}

export default class BookmarksSavedPostsComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;

  get savedPosts() {
    return this.args.savedPosts;
  }

  get status() {
    if (!this.savedPosts) {
      return 'error';
    } else if (this.savedPosts.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
