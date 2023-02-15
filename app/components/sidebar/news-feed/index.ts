import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import NewsFeedService from 'potber-client/services/news-feed';
import RendererService from 'potber-client/services/renderer';
import { sleep } from 'potber-client/utils/misc';

export default class SidebarNewsFeedComponent extends Component {
  @service declare newsFeed: NewsFeedService;
  @service declare renderer: RendererService;
  @tracked busy = false;

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

  @action async refresh() {
    this.busy = true;
    await this.newsFeed.refresh();
    await sleep(500);
    this.busy = false;
  }
}
