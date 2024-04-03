import EmberObject from '@ember/object';
import { Model } from './model';
import { PrivateMessages } from '../types';
import { service } from '@ember/service';
import ApiService from 'potber-client/services/api';
import {
  PrivateMessageFolder,
  RecipientOrSender,
} from '../types/private-messages';
import PrivateMessageStore from 'potber-client/services/stores/private-message';

export class PrivateMessage extends Model implements PrivateMessages.Read {
  @service declare api: ApiService;
  @service('stores/private-message')
  declare privateMessageStore: PrivateMessageStore;

  id!: string;
  title!: string;
  date!: string;
  folder!: PrivateMessageFolder;
  unread!: boolean;
  important!: boolean;
  recipient?: RecipientOrSender;
  sender?: RecipientOrSender;
  content?: string;

  constructor(init: PrivateMessages.Read, context: EmberObject) {
    super(context);
    Object.assign(this, init);
  }

  /**
   * Marks the private message as read.
   */
  async markAsUnread(): Promise<void> {
    await this.api.markPrivateMessageAsUnread(this.id);
    this.unread = true;
    this.privateMessageStore.getUnread({ reload: true, delay: 500 });
  }

  async moveToFolder(folder: PrivateMessageFolder): Promise<void> {
    await this.api.movePrivateMessageToFolder(this.id, folder);
    this.folder = folder;
  }

  /**
   * Deletes the private message.
   */
  async delete(): Promise<void> {
    await this.api.deletePrivateMessage(this.id);
    super.delete();
  }
}

export class NewPrivateMessage extends Model implements PrivateMessages.Create {
  @service declare api: ApiService;

  title = '';
  content = '';
  recipientName = '';
  saveCopy = true;

  constructor(context: EmberObject, init?: Partial<PrivateMessages.Create>) {
    super(context);
    if (init) Object.assign(this, init);
  }

  /**
   * Sends the private message.
   */
  async save(): Promise<void> {
    super.save();
    try {
      await this.api.createPrivateMessage(this, { timeoutWarning: true });
      this._isSaving = false;
    } catch (error) {
      this._isSaving = false;
      throw error;
    }
  }
}
