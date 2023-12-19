import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { IntlService } from 'ember-intl';
import CustomSession from 'potber-client/services/custom-session';
import MessagesService from 'potber-client/services/messages';

export default class AuthCallbackRoute extends Route {
  @service declare session: CustomSession;
  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @service declare intl: IntlService;
  async beforeModel() {
    try {
      const params = new URLSearchParams(window.location.hash.replace('#', ''));
      const hash: Record<string, string> = {};
      for (const entry of params.entries()) {
        const [key, value] = entry;
        hash[key] = value;
      }
      await this.session.authenticate('authenticator:oauth2', hash);
      this.router.transitionTo('authenticated.home');
    } catch (error) {
      this.messages.logErrorAndNotify(
        this.intl.t('error.unknown'),
        error,
        this.constructor.name,
      );
      this.router.transitionTo('auth.login');
    }
  }
}
