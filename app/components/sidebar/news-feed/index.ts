import Component from '@glimmer/component';
import { BookmarksSummary } from 'potber/services/api/types/bookmark';

export interface Signature {
  Args: {
    bookmarksSummary: BookmarksSummary | null;
  };
}

export default class SidebarNewsFeedComponent extends Component<Signature> {
  get status() {
    if (!this.args.bookmarksSummary) {
      return 'error';
    } else if (this.args.bookmarksSummary.bookmarks.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }

  get unreadBookmarks() {
    const bookmarks = [];
    if (this.args.bookmarksSummary) {
      for (const bookmark of this.args.bookmarksSummary?.bookmarks) {
        if (bookmark.newPostsCount === 0) continue;
        bookmarks.push(bookmark);
      }
    }
    return bookmarks;
  }
}
