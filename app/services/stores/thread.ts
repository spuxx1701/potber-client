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
  /**
   * Whether or not to keep the previous thread.
   */
  keepPreviousThread?: boolean;
}

export default class ThreadStore extends Service {
  @service declare api: ApiService;

  /**
   * The previous thread that was viewed. This can be used to prevent rapid changes
   * to the thread UI when changing pages or reloading.
   */
  @tracked previousThread?: Threads.Read;
  @tracked currentThreadState?: TrackedState<Threads.Read>;
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
      keepPreviousThread = true,
      page,
      postId,
      updateBookmark = true,
      timeoutWarning,
    } = { ...options };
    if (keepPreviousThread && this.currentThread) {
      this.previousThread = { ...this.currentThread };
    } else {
      this.clearPreviousThread();
    }
    this.currentThreadState = trackedFunction(this, () =>
      this.api.findThreadById(threadId, {
        timeoutWarning,
        query: { page: page, postId, updateBookmark },
      }),
    );
    return this.currentThreadState.promise;
  }

  /**
   * Refreshes the currently loaded thread if there is one.
   * @param options The options to pass to `loadThread`.
   */
  async reload(options?: LoadThreadOptions) {
    if (!this.currentThread || !this.currentThread.page) return;
    this.isReloading = true;
    const thread = await this.loadThread(this.currentThread.id, {
      page: this.currentThread.page.number,
      keepPreviousThread: true,
      ...options,
    });
    this.isReloading = false;
    return thread;
  }

  /**
   * The current thread that is being viewed.
   */
  get currentThread(): Threads.Read | null {
    return this.currentThreadState?.value ?? null;
  }

  /**
   * Whether or not the thread is currently loading.
   */
  get isLoading() {
    return this.currentThreadState?.isLoading;
  }

  /**
   * Clears the previous thread.
   */
  clearPreviousThread() {
    this.previousThread = undefined;
  }

  /**
   * Clears the entire state.
   */
  clear() {
    this.currentThreadState = undefined;
    this.clearPreviousThread();
  }
}

declare module '@ember/service' {
  interface Registry {
    'stores/thread': ThreadStore;
  }
}
