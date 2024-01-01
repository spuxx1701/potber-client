import Component from '@glimmer/component';
import { Bookmark } from 'potber-client/services/api/models/bookmark';

interface Signature {
  Args: {
    bookmarks: Bookmark[];
  };
}

export default class BookmarksThreadsComponent extends Component<Signature> {
  get bookmarks() {
    return this.args.bookmarks.filter((bookmark) => !bookmark.isDeleted);
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
