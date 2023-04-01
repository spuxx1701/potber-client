import { service } from '@ember/service';
import Component from '@glimmer/component';
import CustomStore from 'potber-client/services/custom-store';

export default class BookmarksThreadsComponent extends Component {
  @service declare store: CustomStore;

  get bookmarks() {
    return this.store.bookmarks;
  }

  get status() {
    if (!this.bookmarks) {
      return 'error';
    } else if (this.bookmarks.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
