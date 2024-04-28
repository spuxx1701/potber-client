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
  @tracked protected _isSaving = false;
  @tracked protected _isDeleted = false;

  get isSaving() {
    return this._isSaving;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  /**
   * Marks the model as being in the process of sending a state to the server.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(...args: any[]) {
    this._isSaving = true;
  }

  /**
   * Marks the model as deleted.
   */
  delete() {
    this._isDeleted = true;
  }

  constructor(context: EmberObject) {
    const owner = getOwner(context);
    if (!owner) throw new Error('No owner found.');
    setOwner(this, owner);
  }
}
