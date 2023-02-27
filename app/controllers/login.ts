import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  LoginRouteModel,
  LOGIN_LIFETIME_OPTIONS,
} from 'potber-client/routes/login';
import MessagesService from 'potber-client/services/messages';
import NewsfeedService from 'potber-client/services/newsfeed';

export default class AboutController extends Controller {
  @service declare router: RouterService;
  @service declare session: any;
  @service declare messages: MessagesService;
  @service declare newsfeed: NewsfeedService;
  declare model: LoginRouteModel;
  @tracked loginInProcess = false;
  lifetimeOptions = LOGIN_LIFETIME_OPTIONS;

  @action handleUsernameChange(value: string) {
    this.model.username = value;
  }

  @action handlePasswordChange(value: string) {
    this.model.password = value;
  }

  @action async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.loginInProcess = true;
    try {
      await this.session.authenticate(
        'authenticator:oauth2',
        this.model.username,
        this.model.password,
        this.model.lifetimeOption.data
      );
    } catch (error) {
      this.messages.log(`Login failed. (${error})`, {
        type: 'error',
        context: this.constructor.name,
      });
      this.messages.showNotification(
        'Das hat leider nicht geklappt. Versuche es nochmal.',
        'error'
      );
    }
    this.loginInProcess = false;
    if (this.session.isAuthenticated) {
      this.messages.showNotification(`Anmeldung erfolgreich.`, 'success');
      this.newsfeed.refreshBookmarks();
      this.router.transitionTo('authenticated.home');
    }
  }
}
