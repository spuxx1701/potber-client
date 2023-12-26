import { service } from '@ember/service';
import { PrivateMessageFolder } from 'potber-client/models/private-message';
import SlowRoute from 'potber-client/routes/base/slow';
import CustomStore from 'potber-client/services/custom-store';

export default class PrivateMessagesInboundRoute extends SlowRoute {
  @service declare store: CustomStore;

  async model() {
    const messages = await this.store.getPrivateMessages({
      folder: PrivateMessageFolder.inbound,
      reload: true,
    });
    const filteredMessages = [
      ...messages.filter(
        (message) => message.folder === PrivateMessageFolder.inbound,
      ),
    ];
    return filteredMessages;
  }
}
