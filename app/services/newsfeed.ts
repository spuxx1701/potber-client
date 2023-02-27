import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Bookmark from 'potber-client/models/bookmark';
import { sleep } from 'potber-client/utils/misc';
import CustomStore from './custom-store';

// The minimum number of miliseconds the service will stay in 'isUpdating' state.
// This duration doesn't impact performance, but is used to better visualize
// update actions.
const MINIMUM_UPDATE_DURATION = 500;

export default class NewsfeedService extends Service {
  @service declare store: CustomStore;

  @tracked unreadBookmarks: Bookmark[] | null = null;
  @tracked isUpdating = false;

  async refresh() {
    this.isUpdating = true;
    await this.refreshBookmarks();
    await sleep(MINIMUM_UPDATE_DURATION);
    this.isUpdating = false;
  }

  async refreshBookmarks() {
    try {
      const bookmarks = await this.store.getBookmarks({ reload: true });
      this.unreadBookmarks = bookmarks.filter(
        (bookmark) => bookmark.newPostsCount > 0
      );
    } catch (error) {
      this.unreadBookmarks = null;
    }
  }
}
