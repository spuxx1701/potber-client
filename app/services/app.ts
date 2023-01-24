import Service, { service } from '@ember/service';
import LocalStorageService from './local-storage';
import RendererService from './renderer';
import SessionService from './session';

export default class AppService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  @service declare session: SessionService;
  initialized = false;

  async initialize() {
    if (this.initialized) return;
    this.localStorage.initialize();
    this.renderer.initialize();
    await this.session.initialize();
    this.initialized = true;
  }
}
