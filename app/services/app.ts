import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import { sleep } from 'potber/utils/misc';
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

  async initialize() {
    if (this.initialized) return;
    this.localStorage.initialize();
    this.renderer.initialize();
    await this.session.initialize();
    // this.checkForNewVersion();
    this.newsFeed.refresh();
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

  get isWebkit() {
    const userAgent = navigator.userAgent;
    const isWebkit =
      /\b(iPad|iPhone|iPod)\b/.test(userAgent) && /WebKit/.test(userAgent);
    if (isWebkit) {
      this.messages.log('Webkit recognized.', {
        type: 'warning',
        context: this.constructor.name,
      });
    }
    return isWebkit;
  }

  @action async requestStorageAccess() {
    if (!document.hasStorageAccess()) {
      this.messages.log('Requesting storace access for webkit compatibility.', {
        context: this.constructor.name,
      });
      try {
        await document.requestStorageAccess();
        this.messages.log('Storage access was granted.', {
          type: 'success',
          context: this.constructor.name,
        });
      } catch (error) {
        this.messages.showNotification(
          'Ohne diese Berechtigung funktioniert potber nicht auf iOS-Browsern.',
          'error'
        );
        this.messages.log('Storage access was denied by user.', {
          type: 'error',
          context: this.constructor.name,
        });
        throw new Error('Storage access denied was by user.');
      }
    }
  }
}
