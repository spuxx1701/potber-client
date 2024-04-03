import Route from '@ember/routing/route';
import { NewPrivateMessage } from 'potber-client/services/api/models/private-message';
import { PrivateMessages } from 'potber-client/services/api/types';

export interface PrivateMessagesCreateRouteModel {
  message: PrivateMessages.Create;
}

export default class PrivateMessagesCreateRoute extends Route {
  async model() {
    const message = new NewPrivateMessage(this);
    return { message };
  }
}
