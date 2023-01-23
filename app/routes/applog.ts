import Route from '@ember/routing/route';
import { service } from '@ember/service';
import MessagesService from 'potber/services/messages';

export default class ApplogRoute extends Route {
  @service declare messages: MessagesService;

  model() {
    return this.messages.messages;
  }
}
