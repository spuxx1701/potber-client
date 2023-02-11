import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
export default class SessionController extends Controller {
  @service declare session: any;

  @action async handleSignOut() {
    this.session.invalidate();
  }
}
