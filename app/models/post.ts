import Model, { attr } from '@ember-data/model';
import User from './user';

export default class Post extends Model {
  @attr()
  declare author: User;

  @attr()
  declare date: string;

  @attr({ defaultValue: '' })
  declare title?: string;

  @attr({ defaultValue: '0' })
  icon?: string;

  @attr({ defaultValue: '' })
  message?: string;

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

  @attr({ defaultValue: true })
  convertUrls?: boolean;

  @attr({ defaultValue: false })
  disableBbCode?: boolean;

  @attr({ defaultValue: false })
  disableEmojis?: boolean;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    post: Post;
  }
}

export interface LastEdit {
  user: User;
  date: string;
}

export interface PostPreview {
  icon?: string;
  author: User;
  date: string;
  threadId: string;
  boardId: string;
}
