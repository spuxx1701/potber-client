import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Users } from '../types';
import { ApiError } from '../error';

/**
 * Finds a user by their id.
 * @param post The user.
 */
export async function findById(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<Users.Read> {
  try {
    return await this.fetch(`users/${id}`, {
      ...options,
      request: { method: 'GET' },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 404:
          this.messages.showNotification(
            this.intl.t('error.users.not-found'),
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
