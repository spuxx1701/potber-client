import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import { sleep } from 'potber-client/utils/misc';
import DeviceManagerService from './device-manager';
import LocalStorageService from './local-storage';
import ModalService from './modal';
import NewsfeedService from './newsfeed';
import RendererService from './renderer';
import CustomSession from './custom-session';

export default class AppService extends Service {
  @service declare renderer: RendererService;
  @service declare deviceManager: DeviceManagerService;
  @service declare router: RouterService;
  @service declare modal: ModalService;
  @service declare localStorage: LocalStorageService;
  @service declare newsfeed: NewsfeedService;
  @service declare session: CustomSession;
  initialized = false;
  deferredInstallPrompt: any = undefined;

  async initialize() {
    if (this.initialized) return;
    this.renderer.initialize();
    this.deviceManager.initialize();
    await this.session.setup();
    if (this.session.isAuthenticated) {
      this.session.update();
      this.localStorage.initialize();
      this.newsfeed.refresh();
    }
    this.checkForNewVersion();
    this.initialized = true;
  }

  async checkForNewVersion() {
    const unencountedVersion = this.localStorage.getUnencountedVersion();
    if (unencountedVersion) {
      await sleep(1000);
      this.modal.confirm({
        title: 'Es gibt Neuigkeiten!',
        text: `Potber wurde auf Version ${unencountedVersion} aktualisiert.
        Tippe auf 'OK', um mehr über die Änderungen zu erfahren.`,
        icon: 'star',
        cancelLabel: 'Geh weg!',
        onSubmit: () => {
          this.modal.close();
          this.router.transitionTo('changelog');
        },
      });
    }
    this.localStorage.setEncounteredVersion();
  }
}
