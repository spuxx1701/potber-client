import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';
import BookmarkStore from 'potber-client/services/stores/bookmark';

interface Signature {
  Args: {
    inSidebar?: boolean;
  };
}
export default class QuickstartNewsfeedComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare newsfeed: NewsfeedService;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;

  get status() {
    if (!this.unreadBookmarks && !this.unreadPrivateMessages) {
      return 'error';
    } else {
      if (
        this.unreadBookmarks?.length === 0 &&
        this.unreadPrivateMessages?.length === 0
      ) {
        return 'empty';
      } else {
        return 'ok';
      }
    }
  }

  get unreadPrivateMessages() {
    return this.newsfeed.unreadPrivateMessages;
  }

  get unreadBookmarks() {
    return this.bookmarkStore.unread;
  }

  get busy() {
    return this.newsfeed.isUpdating;
  }

  refresh = async () => {
    await this.newsfeed.refresh();
  };
}
