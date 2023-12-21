import { getOwner, setOwner } from '@ember/application';
import EmberObject from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ApiService from 'potber-client/services/api';

export interface IModel {
  delete: () => void;
}

export class Model {
  @service declare api: ApiService;
  @tracked protected _isDeleted = false;

  get isDeleted() {
    return this._isDeleted;
  }

  /**
   * Marks the model as deleted.
   */
  delete() {
    this._isDeleted = true;
  }

  constructor(context: EmberObject) {
    setOwner(this, getOwner(context));
  }
}
