import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Threads } from '../api/types';
import { TrackedState } from 'ember-resources';
import { trackedFunction } from 'ember-resources/util/function';
import ApiService from '../api';

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
   * @param threadId
   * @param page
   * @param options
   */
  loadThread(
    threadId: string,
    options?: {
      page?: number;
      postId?: string;
      updateBookmark?: boolean;
      keepPreviousThread?: boolean;
    },
  ): Promise<Threads.Read> {
    const {
      keepPreviousThread = true,
      page,
      postId,
      updateBookmark = true,
    } = { ...options };
    if (keepPreviousThread && this.currentThread) {
      this.previousThread = { ...this.currentThread };
    } else {
      this.clearPreviousThread();
    }
    this.currentThreadState = trackedFunction(this, () =>
      this.api.findThreadById(threadId, {
        query: { page: page, postId, updateBookmark },
      }),
    );
    return this.currentThreadState.promise;
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
