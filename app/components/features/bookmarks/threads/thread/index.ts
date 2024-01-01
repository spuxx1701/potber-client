import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { IntlService } from 'ember-intl';
import { Bookmark } from 'potber-client/services/api/models/bookmark';
import MessagesService from 'potber-client/services/messages';

interface Signature {
  Args: {
    bookmark: Bookmark;
  };
}

export default class BookmarkedThread extends Component<Signature> {
  @service declare messages: MessagesService;
  @service declare intl: IntlService;
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

  get isClosed() {
    return this.args.bookmark.thread?.isClosed;
  }

  @action async handleDelete() {
    try {
      await this.args.bookmark.delete();
      this.messages.showNotification('Lesezeichen wurde entfernt.', 'success');
    } catch (error) {
      // Do nothing and let the user try again
    }
  }
}
