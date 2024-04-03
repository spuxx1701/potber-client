import Service, { service } from '@ember/service';
import ApiService from '../api';
import { tracked } from '@glimmer/tracking';
import { TrackedState } from 'ember-resources';
import { sleep } from 'potber-client/utils/misc';
import { trackedFunction } from 'ember-resources/util/function';
import { PrivateMessage } from '../api/models/private-message';
import { FindManyPrivateMessagesOptions } from '../api/endpoints/private-messages.endpoints';

interface ReloadOptions extends FindManyPrivateMessagesOptions {
  /**
   * The delay in milliseconds before the reload is executed.
   */
  delay?: number;
}

interface GetOptions extends ReloadOptions {
  /**
   * Whether or not to force a reload.
   */
  reload?: boolean;
}

export default class PrivateMessageStore extends Service {
  @service declare api: ApiService;

  @tracked state: TrackedState<PrivateMessage[]> | undefined;
  @tracked private _unread: PrivateMessage[] | null = null;

  get unread() {
    return this._unread?.filter((privateMessage) => !privateMessage.isDeleted);
  }

  /**
   * Returns all unread private messages.
   * @param options.reload Whether or not to force a reload.
   * @returns The list of unread private messages.
   */
  async getUnread(options?: GetOptions) {
    if (!this.unread || options?.reload) {
      await this.reload({ ...options, query: { unread: true } });
    }
    return this.unread;
  }

  /**
   * Forces a new reload of all bookmarks.
   */
  reload = async (options?: ReloadOptions) => {
    if (options?.delay) {
      await sleep(options.delay);
    }
    this.state = trackedFunction(this, () =>
      this.api.findManyPrivateMessages(options),
    );
    const privateMessages = await this.state.promise;
    if (privateMessages) {
      this._unread = [
        ...privateMessages.filter((privateMessage) => privateMessage.unread),
      ];
    }
  };

  /**
   * Whether or not the private messages are currently being loaded.
   */
  get isLoading() {
    return this.state?.isLoading;
  }
}

declare module '@ember/service' {
  interface Registry {
    'stores/private-message': PrivateMessageStore;
  }
}
