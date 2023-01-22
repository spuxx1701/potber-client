import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import SessionService from 'potber/services/session';

export default class SessionController extends Controller {
  @service declare session: SessionService;

  @action async handleSignOut() {
    await this.session.signOut();
  }
}
