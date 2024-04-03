import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber-client/services/api';
import { PrivateMessage } from 'potber-client/services/api/models/private-message';
import PrivateMessageStore from 'potber-client/services/stores/private-message';

interface Params {
  id: string;
}

export interface PrivateMessagesViewRouteModel {
  message: PrivateMessage;
}

export default class PrivateMessagesViewRoute extends Route {
  @service declare api: ApiService;
  @service('stores/private-message')
  declare privateMessageStore: PrivateMessageStore;

  async model(params: Params) {
    const { id } = params;
    const message = await this.api.findPrivateMessageById(id);
    message.unread = false;
    return { message };
  }

  afterModel() {
    this.privateMessageStore.reload({ delay: 500 });
  }
}
