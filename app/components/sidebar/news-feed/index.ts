import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsFeedService from 'potber/services/news-feed';

export default class SidebarNewsFeedComponent extends Component {
  @service declare newsFeed: NewsFeedService;

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
}
