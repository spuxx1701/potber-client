import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Boards } from '../types';

interface FindByIdOptions extends PublicFetchOptions {
  query?: { page?: number };
}

/**
 * Finds a board by its id.
 * @param id The id of the board.
 */
export async function _findById(
  this: ApiService,
  id: string,
  options?: FindByIdOptions,
): Promise<Boards.Read> {
  const thread = await this.fetch(`boards/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.boards.find-by-id.forbidden'),
      },
      {
        statusCode: 404,
        message: this.intl.t('error.boards.find-by-id.not-found'),
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
