import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import BaseSessionService from 'ember-simple-auth/services/session';
import { Session } from './api/types/session';
import ApiService from './api';

export default class CustomSession extends BaseSessionService {
  @service declare api: ApiService;
  @tracked sessionData: Session | null = null;
  declare data: any;
  declare isAuthenticated?: boolean;
  declare invalidate: () => Promise<void>;
  declare authenticate: (
    authenticator: string,
    hash: Record<string, string>,
  ) => Promise<void>;
  declare setup: () => Promise<void>;
  declare requireAuthentication: (transition: any, routeName: string) => void;
  declare transitionTo: (redirectTarget: any) => void;

  async getSessionData() {
    if (!this.sessionData) {
      await this.update();
    }
    return this.sessionData;
  }

  async update() {
    if (!this.isAuthenticated) {
      this.sessionData = null;
    } else {
      try {
        this.sessionData = await this.api.getSession();
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
    const attemptedTransition = this.data.attemptedTransition;
    const cookies = (getOwner(this) as any).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.data.attemptedTransition = null;
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    }
  }
}
