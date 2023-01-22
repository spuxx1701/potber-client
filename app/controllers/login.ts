import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { LoginRouteModel, LOGIN_LIFETIME_OPTIONS } from 'potber/routes/login';
import MessagesService from 'potber/services/messages';
import SessionService from 'potber/services/session';

export default class AboutController extends Controller {
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare messages: MessagesService;
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
    if (
      await this.session.signIn(
        this.model.username,
        this.model.password,
        this.model.lifetimeOption.data
      )
    ) {
      this.messages.showNotification(`Anmeldung erfolgreich.`, 'success');
      this.router.transitionTo('/');
    } else {
      this.model.password = '';
      this.messages.showNotification(
        'Das hat leider nicht geklappt. Versuche es nochmal.',
        'error'
      );
    }
    this.loginInProcess = false;
  }
}
