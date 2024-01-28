import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Bookmark, IBookmark } from '../models/bookmark';

/**
 * Finds and returns all bookmarks for the user that is currently logged in.
 */
export async function _findAll(
  this: ApiService,
  options?: PublicFetchOptions,
): Promise<Bookmark[]> {
  const data: IBookmark[] = await this.fetch(`bookmarks`, options);
  const bookmarks: Bookmark[] = data.map(
    (record) => new Bookmark(record, this),
  );
  return bookmarks;
}

// TODO: This should get moved to the api as a relation on the thread (threads/:id/bookmark)
/**
 * Attempts to find and return a bookmark by the corresponding thread id.
 * @param threadId The thread id.
 * @returns The bookmark (if it exists).
 */
export async function _findByThreadId(
  this: ApiService,
  threadId: string,
  options?: PublicFetchOptions,
): Promise<Bookmark | undefined> {
  const bookmarks = await this.findAllBookmarks(options);
  const bookmark = bookmarks.find(
    (bookmark) => bookmark.thread.id === threadId,
  );
  return bookmark;
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
  options?: PublicFetchOptions,
): Promise<Bookmark> {
  const data: IBookmark = await this.fetch(`bookmarks`, {
    ...options,
    request: {
      method: 'POST',
      body: JSON.stringify({
        postId,
        threadId,
      }),
    },
  });
  const bookmark = new Bookmark(data, this);
  return bookmark;
}

/**
 * Deletes a bookmark.
 * @param id The bookmark id.
 */
export async function _delete(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<void> {
  return this.fetch(`bookmarks/${id}`, {
    ...options,
    request: { method: 'DELETE' },
  });
}
