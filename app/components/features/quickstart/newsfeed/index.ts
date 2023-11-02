import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    inSidebar?: boolean;
  };
}
export default class QuickstartNewsfeedComponent extends Component<Signature> {
  @service declare newsfeed: NewsfeedService;
  @service declare renderer: RendererService;

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
    return this.newsfeed.unreadBookmarks;
  }

  get busy() {
    return this.newsfeed.isUpdating;
  }

  refresh = async () => {
    await this.newsfeed.refresh();
  };
}
