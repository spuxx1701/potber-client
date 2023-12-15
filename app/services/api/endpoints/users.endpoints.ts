import ApiService from 'potber-client/services/api';
import { User } from '../types';
import { ApiError } from '../error';

/**
 * Finds a user by their id.
 * @param post The user.
 */
export async function findById(this: ApiService, id: string): Promise<User> {
  try {
    return await this.fetch(`users/${id}`, { method: 'GET' });
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
