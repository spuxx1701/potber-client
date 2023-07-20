import Controller from '@ember/controller';
import { PrivateMessagesReadRouteModel } from 'potber-client/routes/authenticated/private-messages/read';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';

export default class PrivateMessagesReadController extends Controller {
  declare model: PrivateMessagesReadRouteModel;

  get subtitle() {
    return createPrivateMessageSubtitle(this.model.message);
  }
}
