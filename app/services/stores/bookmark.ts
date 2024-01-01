import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ApiService, { PublicFetchOptions } from '../api';
import { Bookmark } from '../api/models/bookmark';
import { trackedFunction } from 'ember-resources/util/function';
import { TrackedState } from 'ember-resources';

interface GetOptions extends PublicFetchOptions {
  /**
   * Whether or not to force a reload.
   */
  reload: boolean;
}

export default class BookmarkStore extends Service {
  @service declare api: ApiService;

  @tracked state: TrackedState<Bookmark[]> | undefined;
  @tracked private _all: Bookmark[] | null = null;
  @tracked private _unread: Bookmark[] | null = null;

  get all() {
    return this._all?.filter((bookmark) => !bookmark.isDeleted);
  }

  get unread() {
    return this._unread?.filter((bookmark) => !bookmark.isDeleted);
  }

  /**
   * Returns all bookmarks.
   * @param options.reload
   * @returns The list of bookmarks.
   */
  async getAll(options?: GetOptions) {
    if (!this.all || options?.reload) {
      await this.reload(options);
    }
    return this.all;
  }

  /**
   * Returns all unread bookmarks.
   * @param options.reload Whether or not to force a reload.
   * @returns The list of unread bookmarks.
   */
  async getUnread(options?: GetOptions) {
    if (!this.unread || options?.reload) {
      await this.reload(options);
    }
    return this.unread;
  }

  /**
   * Forces a new reload of all bookmarks.
   */
  reload = async (options?: PublicFetchOptions) => {
    this.state = trackedFunction(this, () =>
      this.api.findAllBookmarks(options),
    );
    const bookmarks = await this.state.promise;
    if (bookmarks) {
      this._all = [...bookmarks];
      this._unread = [
        ...bookmarks.filter((bookmark) => bookmark.newPostsCount > 0),
      ];
    }
  };

  /**
   * Whether or not the bookmarks are currently being loaded.
   */
  get isLoading() {
    return this.state?.isLoading;
  }
}

declare module '@ember/service' {
  interface Registry {
    'stores/bookmark': BookmarkStore;
  }
}
