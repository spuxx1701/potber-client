import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import MessagesService from 'potber/services/messages';
import SessionService from 'potber/services/session';

export default class SessionController extends Controller {
  @service declare session: SessionService;
  @service declare router: RouterService;
  @service declare messages: MessagesService;
  @tracked terminationInProgress = false;

  @action async handleSignOut() {
    this.terminationInProgress = true;
    if (await this.session.terminate()) {
      this.messages.showNotification(`Du wurdest abgemeldet..`, 'success');
      this.router.transitionTo('/login');
    } else {
      this.messages.showNotification(
        'Das hat leider nicht geklappt. Versuche es später nochmal.',
        'error'
      );
    }
    this.terminationInProgress = false;
  }
}
