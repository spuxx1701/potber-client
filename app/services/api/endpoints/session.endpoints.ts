import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Session } from '../types/session';
/**
 * Returns the current session.
 * @param id The id of the board.
 */
export async function _get(
  this: ApiService,
  options?: PublicFetchOptions,
): Promise<Session> {
  const thread = await this.fetch(`auth/session`, {
    ...options,
    statusNotifications: [
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return thread;
}
