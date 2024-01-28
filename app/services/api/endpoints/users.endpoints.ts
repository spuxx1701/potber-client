import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Users } from '../types';

/**
 * Finds a user by their id.
 * @param post The user.
 */
export async function findById(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<Users.Read> {
  return await this.fetch(`users/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 404,
        message: this.intl.t('error.users.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
}
