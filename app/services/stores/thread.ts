import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Threads } from '../api/types';
import { TrackedState } from 'ember-resources';
import { trackedFunction } from 'ember-resources/util/function';
import ApiService, { PublicFetchOptions } from '../api';

interface LoadThreadOptions extends PublicFetchOptions {
  /**
   * The page to load.
   */
  page?: number;
  /**
   * The post ID to retrieve (will be ignored if `page` is supplied).
   */
  postId?: string;
  /**
   * Whether or not to update the bookmark.
   */
  updateBookmark?: boolean;
}

export default class ThreadStore extends Service {
  @service declare api: ApiService;

  /**
   * The previous thread that was viewed. This can be used to prevent rapid changes
   * to the thread UI when changing pages or reloading.
   */
  @tracked state?: TrackedState<Threads.Read>;
  @tracked pages?: Threads.Page[];
  @tracked currentPageNumber?: number;
  /**
   * Can be set to indicate whether the current load is a reload.
   */
  @tracked isReloading = false;

  /**
   * Loads a thread.
   * @param threadId The thread ID.
   * @param options More options.
   */
  loadThread(
    threadId: string,
    options?: LoadThreadOptions,
  ): Promise<Threads.Read> {
    const {
      page,
      postId,
      updateBookmark = true,
      timeoutWarning,
    } = { ...options };
    this.state = trackedFunction(this, async () => {
      const thread = await this.api.findThreadById(threadId, {
        timeoutWarning,
        query: { page: page, postId, updateBookmark },
      });
      this.pages = thread.page ? [thread.page] : [];
      return thread;
    });
    return this.state.promise;
  }

  /**
   * Refreshes the currently loaded thread if there is one.
   * @param options The options to pass to `loadThread`.
   */
  async reload(options?: LoadThreadOptions) {
    if (!this.thread || !this.thread.page) return;
    this.isReloading = true;
    const thread = await this.loadThread(this.thread.id, {
      page: this.thread.page.number,
      ...options,
    });
    this.isReloading = false;
    return thread;
  }

  /**
   * The current thread that is being viewed.
   */
  get thread(): Threads.Read | null {
    return this.state?.value ?? null;
  }

  /**
   * The current page that is being viewed.
   */
  get currentPage(): Threads.Page | undefined {
    return (
      this.pages?.find((page) => page.number === this.currentPageNumber) ??
      this.thread?.page
    );
  }

  /**
   * Whether or not the thread is currently loading.
   */
  get isLoading() {
    return this.state?.isLoading;
  }

  /**
   * Clears the entire state.
   */
  clear() {
    this.state = undefined;
  }
}

declare module '@ember/service' {
  interface Registry {
    'stores/thread': ThreadStore;
  }
}
