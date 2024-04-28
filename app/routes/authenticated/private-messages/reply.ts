import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ApiService from 'potber-client/services/api';

interface Params extends Record<string, unknown> {
  id: string;
}

export default class PrivateMessagesReplyRoute extends Route {
  @service declare api: ApiService;

  async model(params: Params) {
    const { id } = params;
    if (!id) throw new Error();
    const message = await this.api.replyToPrivateMessage(id);
    return { message };
  }
}
