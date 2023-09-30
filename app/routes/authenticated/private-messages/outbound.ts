import { service } from '@ember/service';
import { PrivateMessageFolder } from 'potber-client/models/private-message';
import SlowRoute from 'potber-client/routes/slow';
import CustomStore from 'potber-client/services/custom-store';

export default class PrivateMessagesOutboundRoute extends SlowRoute {
  @service declare store: CustomStore;

  async model() {
    const messages = await this.store.getPrivateMessages({
      folder: PrivateMessageFolder.outbound,
      reload: true,
    });
    const filteredMessages = [
      ...messages.filter(
        (message) => message.folder === PrivateMessageFolder.outbound,
      ),
    ];
    return filteredMessages;
  }
}
