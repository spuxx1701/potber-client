import { service } from '@ember/service';
import CustomStore from 'potber-client/services/custom-store';
import LocalStorageService from 'potber-client/services/local-storage';
import SlowRoute from '../slow';

export default class BookmarksRoute extends SlowRoute {
  @service declare store: CustomStore;
  @service declare localStorage: LocalStorageService;

  async model() {
    await this.store.getBookmarks();
    await this.localStorage.getSavedPosts({ reload: true });
  }
}
