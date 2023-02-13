import Model, { attr } from '@ember-data/model';
import User from './user';

export default class Post extends Model {
  @attr()
  declare author: User;

  @attr()
  declare date: Date;

  @attr()
  declare title?: string;

  @attr()
  declare icon?: string;

  @attr()
  declare message?: string;

  @attr()
  declare contentHidden?: boolean;

  @attr()
  declare editedCount: number;

  @attr()
  declare lastEdit: LastEdit;

  @attr()
  declare avatarUrl: string;

  @attr()
  declare threadId: string;

  @attr()
  declare boardId: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    post: Post;
  }
}

export interface LastEdit {
  user: User;
  date: Date;
}

export interface PostPreview {
  icon?: string;
  author: User;
  date: Date;
  threadId: string;
  boardId: string;
}
