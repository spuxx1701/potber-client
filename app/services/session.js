import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  @service store;
  @tracked sessionData = null;

  async update() {
    if (!this.isAuthenticated) {
      this.sessionData = null;
    } else {
      try {
        this.sessionData = await this.store.queryRecord('session', {});
      } catch (error) {
        this.invalidate();
      }
    }
  }

  async handleAuthentication() {
    // Store session data
    await this.update();
    // We don't want the session service to redirect to a route automatically after
    // successful login, so we override this method.
    const attemptedTransition = this.sessionData.attemptedTransition;
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.sessionData.attemptedTransition = null;
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    }
  }
}
