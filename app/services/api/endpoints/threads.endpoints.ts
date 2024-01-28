import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Threads } from '../types';

interface FindByIdOptions extends PublicFetchOptions {
  query?: { page?: number; updateBookmark?: boolean; postId?: string };
}

export async function findById(
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
