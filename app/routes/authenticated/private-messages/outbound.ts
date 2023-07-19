import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PrivateMessageFolder } from 'potber-client/models/private-message';
import CustomStore from 'potber-client/services/custom-store';

export default class PrivateMessagesOutboundRoute extends Route {
  @service declare store: CustomStore;

  async model() {
    const messages = await this.store.getPrivateMessages({
      folder: PrivateMessageFolder.outbound,
    });
    const filteredMessages = messages.filter(
      (message) => message.folder === PrivateMessageFolder.outbound
    );
    return filteredMessages;
  }
}
