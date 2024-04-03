import { service } from '@ember/service';
import SlowRoute from 'potber-client/routes/base/slow';
import ApiService from 'potber-client/services/api';
import { PrivateMessageFolder } from 'potber-client/services/api/types/private-messages';

export default class PrivateMessagesSystemRoute extends SlowRoute {
  @service declare api: ApiService;

  async model() {
    const messages = await this.api.findManyPrivateMessages({
      query: {
        folder: PrivateMessageFolder.system,
      },
    });
    return messages;
  }
}
