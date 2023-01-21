import Component from '@glimmer/component';
import { Bookmark } from 'potber/services/api/types/bookmark';

export interface Signature {
  Args: {
    bookmarks: Bookmark[] | null | 'not-signed-in';
  };
}

export default class SidebarNewsFeedComponent extends Component<Signature> {
  get status() {
    if (!this.args.bookmarks) {
      return 'error';
    } else if (this.args.bookmarks.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
