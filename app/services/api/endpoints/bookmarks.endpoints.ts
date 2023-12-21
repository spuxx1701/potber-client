import ApiService from 'potber-client/services/api';
import { Bookmark, IBookmark } from '../models/bookmark';

/**
 * Finds and returns all bookmarks for the user that is currently logged in.
 */
export async function _findAll(this: ApiService): Promise<Bookmark[]> {
  try {
    const data: IBookmark[] = await this.fetch(`bookmarks`);
    const bookmarks: Bookmark[] = data.map(
      (record) => new Bookmark(record, this),
    );
    return bookmarks;
  } catch (error) {
    this.messages.showNotification(this.intl.t('error.unknown'), 'error');
    throw error;
  }
}

/**
 * Creates a new bookmark.
 * @param postId The post id.
 * @param threadId The thread id.
 */
export async function _create(
  this: ApiService,
  postId: string,
  threadId: string,
): Promise<Bookmark> {
  try {
    const data: IBookmark = await this.fetch(`bookmarks`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        threadId,
      }),
    });
    const bookmark = new Bookmark(data, this);
    return bookmark;
  } catch (error) {
    this.messages.showNotification(this.intl.t('error.unknown'), 'error');
    throw error;
  }
}

/**
 * Deletes a bookmark.
 * @param id The bookmark id.
 */
export async function _delete(this: ApiService, id: string): Promise<void> {
  try {
    return this.fetch(`bookmarks/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    this.messages.showNotification(this.intl.t('error.unknown'), 'error');
    throw error;
  }
}
