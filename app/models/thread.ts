import Model, { attr } from '@ember-data/model';
import Post, { PostPreview } from './post';

export default class Thread extends Model {
  @attr()
  declare title: string;

  @attr()
  declare subtitle: string;

  @attr()
  declare repliesCount: number;

  @attr()
  declare hitsCount: number;

  @attr()
  declare pagesCount: number;

  @attr()
  declare isClosed: boolean;

  @attr()
  declare isSticky: boolean;

  @attr()
  declare isImportant: boolean;

  @attr()
  declare isAnnouncement: boolean;

  @attr()
  declare isGlobal: boolean;

  @attr()
  declare boardId: string;

  @attr()
  declare firstPost?: PostPreview;

  @attr()
  declare lastPost?: PostPreview;

  @attr()
  declare page?: ThreadPage;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    thread: Thread;
  }
}

export interface ThreadPage {
  number: number;
  postCount: number;
  offset: number;
  posts: Post[];
}
