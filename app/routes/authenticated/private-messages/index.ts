import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Router from 'potber-client/router';

export default class PrivateMessagesRoute extends Route {
  @service declare router: Router;

  redirect(): void {
    this.router.transitionTo('authenticated.private-messages.inbound');
  }
}
