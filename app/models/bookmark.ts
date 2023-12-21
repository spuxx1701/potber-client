import Model, { attr } from '@ember-data/model';

export default class Bookmark extends Model {
  @attr()
  declare postId: string;

  @attr()
  declare newPostsCount: number;

  @attr()
  declare thread: BookmarkThreadSummary;

  @attr()
  declare board: BookmarkBoardSummary;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    bookmark: Bookmark;
  }
}

export interface BookmarkThreadSummary {
  id: string;
  title: string;
  isClosed: boolean;
  pagesCount: number;
}

export interface BookmarkBoardSummary {
  id: string;
  name: string;
}
