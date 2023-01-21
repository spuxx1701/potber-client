import Route from '@ember/routing/route';
import { service } from '@ember/service';
import SessionService from 'potber/services/session';

export default class SessionRoute extends Route {
  @service declare session: SessionService;

  async model() {
    await this.session.updateState();
    return this.session.session;
  }
}
