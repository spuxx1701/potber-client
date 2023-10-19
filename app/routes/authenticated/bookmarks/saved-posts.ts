import { service } from '@ember/service';
import SlowRoute from 'potber-client/routes/slow';
import LocalStorageService from 'potber-client/services/local-storage';

export default class BookmarksSavedPostsRoute extends SlowRoute {
  @service declare localStorage: LocalStorageService;

  async model() {
    const savedPosts = await this.localStorage.getSavedPosts({ reload: true });
    return { savedPosts };
  }
}
