import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import { sleep } from 'potber/utils/misc';
import LocalStorageService from './local-storage';
import ModalService from './modal';
import RendererService from './renderer';
import SessionService from './session';

export default class AppService extends Service {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  @service declare session: SessionService;
  @service declare router: RouterService;
  @service declare modal: ModalService;
  initialized = false;

  async initialize() {
    if (this.initialized) return;
    this.localStorage.initialize();
    this.renderer.initialize();
    await this.session.initialize();
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
