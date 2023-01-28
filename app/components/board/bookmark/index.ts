import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Bookmark } from 'potber/services/api/types/bookmark';
import BookmarksService from 'potber/services/bookmarks';
import MessagesService from 'potber/services/messages';

interface Signature {
  Args: {
    bookmark: Bookmark;
  };
}

export default class BoardBookmarkComponent extends Component<Signature> {
  @service declare bookmarks: BookmarksService;
  @service declare messages: MessagesService;
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

  @action async handleDelete() {
    this.messages.showNotification(
      'Das Löschen von Lesezeichen ist leider noch nicht möglich.',
      'error'
    );
    // TODO: NEEDS CORS HEADERS SET IN ENDPOINT
    // await this.bookmarks.deleteBookmark(this.args.bookmark);
    // this.messages.showNotification('Lesezeichen wurde entfernt.', 'success');
  }
}
