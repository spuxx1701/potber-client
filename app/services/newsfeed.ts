import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { sleep } from 'potber-client/utils/misc';
import CustomStore from './custom-store';
import PrivateMessage, {
  PrivateMessageFolder,
} from 'potber-client/models/private-message';
import { Bookmark } from './api/models/bookmark';
import ApiService from './api';
import BookmarkStore from './stores/bookmark';
import { appConfig } from 'potber-client/config/app.config';
import SettingsService from './settings';

/**
 * The minimum number of miliseconds the service will stay in 'isUpdating' state.
 * This duration doesn't impact performance, but is used to better visualize
 * update actions.
 */
const MINIMUM_UPDATE_DURATION = 500;

export default class NewsfeedService extends Service {
  @service declare settings: SettingsService;
  @service declare store: CustomStore;
  @service declare api: ApiService;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;

  @tracked unreadPrivateMessages: PrivateMessage[] | null = null;
  @tracked isUpdating = false;

  initialize() {
    if (this.settings.getSetting('autoRefreshSidebar'))
      setInterval(() => {
        this.refresh();
      }, appConfig.newsfeedRefreshInterval);
  }

  async refresh() {
    this.isUpdating = true;
    await this.bookmarkStore.reload();
    await this.refreshPrivateMessages();
    await sleep(MINIMUM_UPDATE_DURATION);
    this.isUpdating = false;
  }

  get unreadBookmarks() {
    return this.bookmarkStore.unread;
  }

  async refreshPrivateMessages() {
    try {
      const privateMessages = await this.store.getPrivateMessages({
        unread: true,
        folder: PrivateMessageFolder.inbound,
      });
      this.unreadPrivateMessages = [
        ...privateMessages.filter(
          (message) =>
            message.unread && message.folder === PrivateMessageFolder.inbound,
        ),
      ];
    } catch (error) {
      this.unreadPrivateMessages = null;
    }
  }
}
