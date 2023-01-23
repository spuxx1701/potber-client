import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import RSVP from 'rsvp';
import ApiService from 'potber/services/api';
import SessionService from 'potber/services/session';
import MessagesService from 'potber/services/messages';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare api: ApiService;
  @service declare session: SessionService;
  @service declare messages: MessagesService;

  async beforeModel() {
    this.messages.log(`Initializing app.`, {
      context: this.constructor.name,
    });
    // Initialization
    this.localStorage.initialize();
    this.renderer.initialize();
    await this.session.initialize();
    this.messages.log(`App successfully initialized.`, {
      type: 'success',
      context: this.constructor.name,
    });
  }

  async model() {
    return RSVP.hash({
      bookmarksSummary: await this.api.getBookmarksSummary(),
    });
  }
}
