import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { sleep } from 'potber-client/utils/misc';
import ApiService, { PublicFetchOptions } from './api';
import BookmarkStore from './stores/bookmark';
import { appConfig } from 'potber-client/config/app.config';
import SettingsService from './settings';
import PrivateMessageStore from './stores/private-message';

/**
 * The minimum number of milliseconds the service will stay in 'isUpdating' state.
 * This duration doesn't impact performance, but is used to better visualize
 * update actions.
 */
const MINIMUM_UPDATE_DURATION = 500;
const UPDATE_RATE_LIMIT_MS = 5000;

export default class NewsfeedService extends Service {
  @service declare settings: SettingsService;
  @service declare api: ApiService;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;
  @service('stores/private-message')
  declare privateMessageStore: PrivateMessageStore;

  @tracked isUpdating = false;
  lastUpdatedAt: Date | undefined = undefined;

  initialize() {
    if (this.settings.getSetting('autoRefreshSidebar'))
      setInterval(() => {
        this.refresh({ silent: true });
      }, appConfig.newsfeedRefreshInterval);
  }

  get unreadBookmarks() {
    return this.bookmarkStore.unread;
  }

  get unreadPrivateMessages() {
    return this.privateMessageStore.unread;
  }

  checkRateLimit() {
    const now = new Date();
    if (this.lastUpdatedAt) {
      const timeSinceLastUpdate = now.getTime() - this.lastUpdatedAt.getTime();
      return timeSinceLastUpdate >= UPDATE_RATE_LIMIT_MS;
    } else return true;
  }

  async refresh(options?: PublicFetchOptions) {
    this.isUpdating = true;
    const promises: Promise<unknown>[] = [];
    promises.push(sleep(MINIMUM_UPDATE_DURATION));
    // Only trigger the actual fetches if we may perform an update
    if (this.checkRateLimit()) {
      this.lastUpdatedAt = new Date();
      promises.push(this.bookmarkStore.getUnread({ ...options, reload: true }));
      promises.push(
        this.privateMessageStore.getUnread({ ...options, reload: true }),
      );
    }
    await Promise.all(promises);
    this.isUpdating = false;
  }

  get status(): 'none' | 'info' | 'important' {
    if (this.unreadPrivateMessages && this.unreadPrivateMessages.length > 0) {
      return 'important';
    } else if (this.unreadBookmarks && this.unreadBookmarks.length > 0) {
      return 'info';
    } else {
      return 'none';
    }
  }
}
