import Model, { attr } from '@ember-data/model';

export default class User extends Model {
  @attr()
  declare name: string;

  @attr()
  declare lastLogin?: string;

  @attr()
  declare activity?: string;

  @attr()
  declare status?: string;

  @attr()
  declare avatarUrl?: string;

  @attr()
  declare rank?: string;

  @attr()
  declare age?: string;

  @attr()
  declare privileged?: boolean;

  @attr()
  declare locked?: boolean;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
