import Store from '@ember-data/store';
import ArrayProxy from '@ember/array/proxy';
import Bookmark from 'potber-client/models/bookmark';

export default class CustomStore extends Store {
  bookmarks: ArrayProxy<Bookmark> | undefined;

  /**
   * Returns all bookmarks.
   * @param options More options.
   * @returns The bookmarks.
   */
  async getBookmarks(options?: {
    reload?: boolean;
  }): Promise<ArrayProxy<Bookmark>> {
    if (!this.bookmarks || options?.reload) {
      this.bookmarks = await this.findAll('bookmark');
    }
    return this.bookmarks;
  }
}
