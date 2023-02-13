import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CustomStore from 'potber-client/services/custom-store';

export default class SessionRoute extends Route {
  @service declare store: CustomStore;

  async model() {
    return this.store.queryRecord('session', {});
  }
}
