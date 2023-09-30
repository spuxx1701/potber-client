import Store from '@ember-data/store';
import ArrayProxy from '@ember/array/proxy';
import Bookmark from 'potber-client/models/bookmark';
import PrivateMessage, {
  PrivateMessageFolder,
} from 'potber-client/models/private-message';

export default class CustomStore extends Store {
  bookmarks: ArrayProxy<Bookmark> | undefined;

  /**
   * Returns all bookmarks.
   * @param options.reload (optional) Whether a reload should be forced.
   * @returns The bookmarks.
   */
  async getBookmarks(options?: {
    reload?: boolean;
  }): Promise<ArrayProxy<Bookmark>> {
    if (!this.bookmarks || options?.reload) {
      if (options?.reload) {
        this.unloadAll('bookmark');
      }
      this.bookmarks = await this.findAll('bookmark');
    }
    return this.bookmarks;
  }

  /**
   * Returns private messages.
   * @param options.unread (optional) Filters using the 'unread' status.
   * @param options.folder (optional) Filters using the private message folder.
   * @param options.reload (optional) Whether a reload should be forced.
   * @returns The bookmarks.
   */
  async getPrivateMessages(options?: {
    unread?: boolean;
    folder?: PrivateMessageFolder;
    reload?: boolean;
  }): Promise<ArrayProxy<PrivateMessage>> {
    if (options?.reload) {
      this.unloadAll('privateMessage');
    }
    const privateMessages = await this.findAll('privateMessage', {
      adapterOptions: {
        queryParams: {
          unread: options?.unread,
          folder: options?.folder,
        },
      },
    });
    return privateMessages;
  }

  async getPrivateMessage(
    id: string,
    options?: {
      reload?: boolean;
    },
  ) {
    if (options?.reload) {
      this.unloadAll('privateMessage');
    }
    const privateMessage = await this.findRecord('privateMessage', id);
    return privateMessage;
  }
}
