import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { LoginRouteModel, LOGIN_LIFETIME_OPTIONS } from 'potber/routes/login';
import MessagesService from 'potber/services/messages';
import SessionService from 'potber/services/session';

export default class AboutController extends Controller {
  @service declare session: SessionService;
  @service declare messages: MessagesService;
  declare model: LoginRouteModel;
  lifetimeOptions = LOGIN_LIFETIME_OPTIONS;

  @action handleUsernameChange(value: string) {
    this.model.username = value;
  }

  @action handlePasswordChange(value: string) {
    this.model.password = value;
  }

  @action async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (
      await this.session.signIn(
        this.model.username,
        this.model.password,
        this.model.lifetimeOption.data
      )
    ) {
      this.messages.showNotification(`Anmeldung erfolgreich.`, 'success');
    } else {
      this.model.password = '';
      this.messages.showNotification(
        'Das hat leider nicht geklappt. Versuche es nochmal.',
        'error'
      );
    }
  }
}
