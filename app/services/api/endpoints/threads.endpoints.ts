import ApiService from 'potber-client/services/api';
import { ApiError } from '../error';
import { Threads } from '../types';

export async function findById(
  this: ApiService,
  id: string,
  query?: { page?: number; updateBookmark?: boolean; postId?: string },
): Promise<Threads.Read> {
  try {
    const thread = await this.fetch(`threads/${id}`, { method: 'GET' }, query);
    return thread;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 403:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.forbidden'),
            'error',
          );
          break;
        case 404:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.not-found'),
            'error',
          );
          break;
        default:
          this.messages.showNotification(this.intl.t('error.unknown'), 'error');
      }
    }
    throw error;
  }
}
