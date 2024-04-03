import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { NewPrivateMessage, PrivateMessage } from '../models/private-message';
import { PrivateMessageFolder } from '../types/private-messages';

export interface FindManyPrivateMessagesOptions extends PublicFetchOptions {
  query?: {
    /**
     * The folder to fetch.
     */
    folder?: PrivateMessageFolder;
    /**
     * The unread status of the private messages.
     */
    unread?: boolean;
  };
}

/**
 * Finds and returns a list of private messages.
 */
export async function _findMany(
  this: ApiService,
  options?: FindManyPrivateMessagesOptions,
): Promise<PrivateMessage[]> {
  const data = await this.fetch(`privateMessages`, {
    ...options,
    statusNotifications: [
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return data.map((body: any) => new PrivateMessage(body, this));
}

/**
 * Finds and returns a private message by its id.
 * @param id The id of the message to find.
 */
export async function _findById(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<PrivateMessage> {
  const body = await this.fetch(`privateMessages/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 404,
        message: this.intl.t('error.private-messages.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return new PrivateMessage(body, this);
}

/**
 * Creates and sends a new private message.
 * @param message The message to send.
 */
export async function _create(
  this: ApiService,
  message: NewPrivateMessage,
  options?: PublicFetchOptions,
): Promise<void> {
  await this.fetch(`privateMessages`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 400,
        message: this.intl.t('error.private-messages.create.bad-request'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'POST', body: JSON.stringify(message) },
  });
}

/**
 * Deletes a private message.
 * @param id The id of the message to delete.
 */
export async function _delete(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<void> {
  await this.fetch(`privateMessages/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'DELETE' },
  });
}

/**
 * Replies to a private message.
 * @param id The id of the message to reply to.
 * @returns The prepared reply.
 */
export async function _reply(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<NewPrivateMessage> {
  return replyOfForward(this, id, 'reply', options);
}

/**
 * Marks a private messages as unread.
 * @param id The id of the message to mark as unread.
 */
export async function _markAsUnread(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<void> {
  await this.fetch(`privateMessages&/${id}/markAsUnread`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 404,
        message: this.intl.t('error.private-messages.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'PUT' },
  });
}

/**
 * Moves a private message to a different folder.
 * @param id The id of the message to move.
 * @param folder The folder to move the message to.
 */
export async function _moveToFolder(
  this: ApiService,
  id: string,
  folder: PrivateMessageFolder,
  options?: PublicFetchOptions,
): Promise<void> {
  return await this.fetch(`privateMessages&/${id}/moveToFolder`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 404,
        message: this.intl.t('error.private-messages.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'PUT', body: JSON.stringify({ folder }) },
  });
}

/**
 * Forwards a private message.
 * @param id The id of the message to forward.
 * @returns The prepared message.
 */
export async function _forward(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<NewPrivateMessage> {
  return replyOfForward(this, id, 'forward', options);
}

async function replyOfForward(
  api: ApiService,
  id: string,
  endpoint: 'reply' | 'forward',
  options?: PublicFetchOptions,
): Promise<NewPrivateMessage> {
  const body = await api.fetch(`privateMessages/${id}/${endpoint}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 404,
        message: api.intl.t('error.private-messages.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: api.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  const message = new NewPrivateMessage(api, body);
  return message;
}
