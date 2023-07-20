import Model, { attr } from '@ember-data/model';
import User from './user';

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
