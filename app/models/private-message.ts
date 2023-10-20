import Model, { attr } from '@ember-data/model';
import User from './user';
import { memberAction } from 'ember-api-actions';

export default class PrivateMessage extends Model {
  @attr()
  declare title: string;

  @attr()
  declare date: string;

  @attr()
  declare folder: PrivateMessageFolder;

  @attr()
  declare unread?: boolean;

  @attr()
  declare important?: boolean;

  @attr()
  declare recipient?: User;

  @attr()
  declare sender?: User;

  @attr()
  declare content?: string;

  /**
   * Marks the private message as unread.
   */
  markAsUnread = memberAction<void>({
    path: 'markAsUnread',
    type: 'PUT',
  });

  /**
   * Moves the private message to the given folder.
   */
  moveToFolder = memberAction<{ folder: PrivateMessageFolder }>({
    path: 'moveToFolder',
    type: 'PUT',
  });
}

export enum PrivateMessageFolder {
  inbound = 'inbound',
  outbound = 'outbound',
  system = 'system',
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    privateMessage: PrivateMessage;
  }
}
