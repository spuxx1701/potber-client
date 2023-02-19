import Model, { attr } from '@ember-data/model';
import { PostPreview } from './post';
import Thread from './thread';
import User from './user';

export default class Board extends Model {
  @attr()
  declare name: string;

  @attr()
  declare description: string;

  @attr()
  declare threadsCount: number;

  @attr()
  declare repliesCount: number;

  @attr()
  declare categoryId: number;

  @attr()
  declare lastPost: PostPreview;

  @attr()
  declare moderators: User[];

  @attr()
  declare page: BoardPage;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    board: Board;
  }
}

export interface BoardPage {
  number: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: Thread[];
}
