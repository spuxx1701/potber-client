import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';

interface Signature {
  Args: {
    bookmark: Bookmark;
  };
}

export default class BookmarksThreadcomponent extends Component<Signature> {
  @service declare store: CustomStore;
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

  get isClosed() {
    return this.args.bookmark.thread?.isClosed;
  }

  @action async handleDelete() {
    try {
      await this.args.bookmark.destroyRecord();
      this.messages.showNotification('Lesezeichen wurde entfernt.', 'success');
    } catch (error: any) {
      this.messages.log(error, {
        type: 'error',
        context: this.constructor.name,
      });
      this.messages.showNotification('Das hat leider nicht geklappt.', 'error');
    }
  }
}
