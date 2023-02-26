import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import NewsfeedService from 'potber-client/services/newsfeed';
import RendererService from 'potber-client/services/renderer';

export default class QuickstartNewsfeedComponent extends Component {
  @service declare newsfeed: NewsfeedService;
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
    return this.newsfeed.unreadBookmarks;
  }

  get busy() {
    return this.newsfeed.isUpdating;
  }

  @action async refresh() {
    await this.newsfeed.refresh();
  }
}
