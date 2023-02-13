import Model, { attr } from '@ember-data/model';

export default class User extends Model {
  @attr()
  declare name: string;

  @attr()
  declare groupId?: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
