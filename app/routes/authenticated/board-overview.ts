import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';

export default class BoardOverviewRoute extends Route {
  @service declare store: Store;

  async model() {
    return await this.store.findAll('board-category');
  }
}
