import Route from '@ember/routing/route';
import { service } from '@ember/service';
import MessagesService from 'potber-client/services/messages';

export default class ApplogRoute extends Route {
  @service declare messages: MessagesService;

  model() {
    return this.messages.messages.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }
}
