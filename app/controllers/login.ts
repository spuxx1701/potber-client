import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { LoginRouteModel, LOGIN_LIFETIME_OPTIONS } from 'potber/routes/login';
import SessionService from 'potber/services/session';

export default class AboutController extends Controller {
  @service declare session: SessionService;
  declare model: LoginRouteModel;
  lifetimeOptions = LOGIN_LIFETIME_OPTIONS;

  @action handleUsernameChange(value: string) {
    this.model.username = value;
  }

  @action handlePasswordChange(value: string) {
    this.model.password = value;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.session.signIn(
      this.model.username,
      this.model.password,
      this.model.lifetimeOption.data
    );
  }
}
