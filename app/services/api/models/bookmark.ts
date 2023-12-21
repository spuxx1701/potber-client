import { Model } from './model';
import EmberObject from '@ember/object';

export interface IBookmark {
  id: string;
  postId: string;
  newPostsCount: number;
  thread: {
    id: string;
    title: string;
    isClosed: boolean;
    pagesCount: number;
  };
  board: {
    id: string;
    name: string;
  };
}

export class Bookmark extends Model implements IBookmark {
  id!: string;
  postId!: string;
  newPostsCount!: number;
  thread!: {
    id: string;
    title: string;
    isClosed: boolean;
    pagesCount: number;
  };
  board!: {
    id: string;
    name: string;
  };

  constructor(init: IBookmark, context: EmberObject) {
    super(context);
    Object.assign(this, init);
  }

  /**
   * Deletes the bookmark.
   */
  async delete(): Promise<void> {
    await this.api.deleteBookmark(this.id);
    super.delete();
  }
}
