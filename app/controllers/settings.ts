import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'potber/components/common/control/dropdown';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import {
  avatarStyleOptions,
  boxStyleOptions,
  landingPageOptions,
  runModeOptions,
} from 'potber/routes/settings';
import MessagesService from 'potber/services/messages';
import AppService from 'potber/services/app';

export default class SettingsController extends Controller {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare app: AppService;

  avatarStyleOptions = avatarStyleOptions;
  boxStyleOptions = boxStyleOptions;
  landingPageOptions = landingPageOptions;
  runModeOptions = runModeOptions;

  @action handleAvatarStyleSelect(option: DropdownOption) {
    this.localStorage.setAvatarStyle(option.data);
  }

  @action handleBoxStyleSelect(option: DropdownOption) {
    this.localStorage.setBoxStyle(option.data);
    this.renderer.updateBoxStyle();
  }

  @action handleLandingPageSelect(option: DropdownOption) {
    this.localStorage.setLandingPage(option.data);
  }

  @action handleRunModeSelect(option: DropdownOption) {
    if (!('serviceWorker' in navigator)) {
      this.messages.showNotification(
        'Dein Browser unterstützt dieses Feature nicht.',
        'error'
      );
      this.messages.log('Browser does not support service workers', {
        type: 'error',
        context: this.constructor.name,
      });
      return;
    }
    if (option.data === 'pwa') {
      this.app.registerPwaServiceWorker();
    } else {
      this.app.unregisterPwaServiceWorker();
    }
    this.localStorage.setRunMode(option.data);
  }
}
