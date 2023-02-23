import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsFeedService from 'potber-client/services/news-feed';
import RendererService from 'potber-client/services/renderer';

export default class SidebarNewsFeedComponent extends Component {
  @service declare newsFeed: NewsFeedService;
  @service declare renderer: RendererService;

  get status() {
    if (!this.unreadBookmarks) {
      return 'error';
    } else {
      if (this.unreadBookmarks.length === 0) {
        return 'empty';
      } else {
        return 'ok';
      }
    }
  }

  get unreadBookmarks() {
    return this.newsFeed.unreadBookmarks;
  }

  get busy() {
    return this.newsFeed.isUpdating;
  }

  @action async refresh() {
    await this.newsFeed.refresh();
  }
}
