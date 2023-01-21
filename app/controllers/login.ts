import Controller from '@ember/controller';
import { action } from '@ember/object';
import { LoginRouteModel } from 'potber/routes/login';

export default class AboutController extends Controller {
  declare model: LoginRouteModel;

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log(event);
  }
}
