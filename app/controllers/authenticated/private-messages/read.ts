import Controller from '@ember/controller';
import { PrivateMessagesViewRouteModel } from 'potber-client/routes/authenticated/private-messages/view';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';

export default class PrivateMessagesReadController extends Controller {
  declare model: PrivateMessagesViewRouteModel;

  get subtitle() {
    return createPrivateMessageSubtitle(this.model.message);
  }
}
