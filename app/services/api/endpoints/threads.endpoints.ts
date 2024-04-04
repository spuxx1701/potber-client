import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Threads } from '../types';

interface FindByIdOptions extends PublicFetchOptions {
  query?: { page?: number; updateBookmark?: boolean; postId?: string };
}

/**
 * Finds a thread by its id.
 * @param id The id of the thread.
 */
export async function _findById(
  this: ApiService,
  id: string,
  options?: FindByIdOptions,
): Promise<Threads.Read> {
  const thread = await this.fetch(`threads/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.threads.find-by-id.forbidden'),
      },
      {
        statusCode: 404,
        message: this.intl.t('error.threads.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return thread;
}

/**
 * Creates a new thread.
 * @param thread The thread to create.
 * @returns The created thread.
 */
export async function _create(
  this: ApiService,
  thread: Threads.Create,
  options?: PublicFetchOptions,
): Promise<Threads.Read> {
  const createdThread = await this.fetch('threads', {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.threads.create.forbidden'),
      },
      {
        statusCode: 429,
        message: this.intl.t('error.threads.create.too-many-requests'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: {
      method: 'POST',
      body: JSON.stringify(thread),
    },
  });
  return createdThread;
}
