import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import MessagesService from 'potber-client/services/messages';
import RendererService from 'potber-client/services/renderer';

export default class ApplogRoute extends Route {
  @service declare messages: MessagesService;
  @service declare renderer: RendererService;

  model() {
    return this.messages.messages.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  @action didTransition() {
    this.renderer.tryResetScrollPosition();
  }
}
