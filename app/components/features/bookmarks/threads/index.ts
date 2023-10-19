import ArrayProxy from '@ember/array/proxy';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from 'potber-client/services/custom-store';

interface Signature {
  Args: {
    bookmarks: ArrayProxy<Bookmark>;
  };
}

export default class BookmarksThreadsComponent extends Component<Signature> {
  @service declare store: CustomStore;

  get bookmarks() {
    return this.args.bookmarks;
  }

  get status() {
    if (!this.bookmarks) {
      return 'error';
    } else if (this.bookmarks.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
