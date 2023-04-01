import Model, { attr } from '@ember-data/model';

export default class Session extends Model {
  @attr()
  declare userId: string;

  @attr()
  declare username: string;

  @attr()
  declare avatarUrl: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    session: Session;
  }
}
