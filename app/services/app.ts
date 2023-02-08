import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import LocalStorageService from './local-storage';
import MessagesService from './messages';
import ModalService from './modal';
import NewsFeedService from './news-feed';
import RendererService from './renderer';
import SessionService from './session';

export default class AppService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  @service declare session: SessionService;
  @service declare router: RouterService;
  @service declare modal: ModalService;
  @service declare newsFeed: NewsFeedService;
  @service declare messages: MessagesService;
  initialized = false;
  deferredInstallPrompt: any = undefined;

  async initialize() {
    if (this.initialized) return;
    this.localStorage.initialize();
    this.renderer.initialize();
    await this.session.initialize();
    // this.checkForNewVersion();
    this.newsFeed.refresh();
    this.initialized = true;
  }
}
