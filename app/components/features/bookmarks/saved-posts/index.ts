import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber-client/services/local-storage';

export default class BookmarksSavedPostsComponent extends Component {
  @service declare localStorage: LocalStorageService;

  get savedPosts() {
    return this.localStorage.savedPosts;
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
