import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CustomStore from 'potber-client/services/custom-store';

export default class BookmarksRoute extends Route {
  @service declare store: CustomStore;

  async model() {
    return await this.store.findAll('bookmark');
  }
}
