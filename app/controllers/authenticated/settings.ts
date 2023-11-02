import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import AppService from 'potber-client/services/app';
import ModalService from 'potber-client/services/modal';
import SettingsService from 'potber-client/services/settings';
import DeviceManagerService from 'potber-client/services/device-manager';
import CustomSession from 'potber-client/services/custom-session';
import {
  SettingsRouteModel,
  settingsConfig,
} from 'potber-client/routes/authenticated/settings';

export default class SettingsController extends Controller {
  declare model: SettingsRouteModel;

  @service declare settings: SettingsService;
  @service declare session: CustomSession;
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare modal: ModalService;
  @service declare app: AppService;
  @service declare deviceManager: DeviceManagerService;

  config = settingsConfig;

  @action handleAvatarStyleSelect(option: DropdownOption) {
    this.settings.setSetting('avatarStyle', option.data);
  }

  @action handleThemeSelect(option: DropdownOption) {
    this.settings.setSetting('theme', option.data);
    this.renderer.updateTheme();
  }

  @action handleSidebarLayoutSelect(option: DropdownOption) {
    if (this.renderer.isDesktop) {
      this.modal.confirm({
        title: 'Desktopmodus',
        icon: 'desktop',
        text: 'Aufgrund der Größe Deines Monitors läuft die Anwendung im Desktopmodus. Eine Änderung des Sidebarlayouts hat im Desktopmodus keine Auswirkungen.',
        onSubmit: () => this.modal.close(),
      });
    }
    this.settings.setSetting('sidebarLayout', option.data);
    this.renderer.updateSidebarLayout();
  }

  @action handleFontSizeSelect(option: DropdownOption) {
    this.settings.setSetting('fontSize', option.data);
    this.renderer.updateFontSize();
  }

  @action handleDarkenReadPostsSelect(option: DropdownOption) {
    this.settings.setSetting('darkenReadPosts', option.data);
  }

  @action handleLandingPageSelect(option: DropdownOption) {
    this.settings.setSetting('landingPage', option.data);
  }

  @action handleAutoRefreshSidebarSelect(option: DropdownOption) {
    this.settings.setSetting('autoRefreshSidebar', option.data);
  }

  @action handleReplaceForumUrlsSelect(option: DropdownOption) {
    this.settings.setSetting('replaceForumUrls', option.data);
  }
  @action handleEnableGesturesSelect(option: DropdownOption) {
    if (option.data) {
      this.modal.confirm({
        title: 'Gestensteuerung',
        icon: 'triangle-exclamation',
        text: 'Die Gestensteuerung ist experimentell und work in progress. Je nach Browser oder Gerät funktioniert sie gegebenenfalls nur unzuverlässig oder gar nicht. Möglicherweise kommt es zu Konflikten mit der Gestensteuerung Deines Geräts.',
        hideCancel: true,
        onSubmit: () => {
          this.modal.close();
          this.settings.setSetting('enableGestures', option.data);
          this.deviceManager.toggleGesturesSupport();
          window.location.reload();
        },
      });
    } else {
      this.settings.setSetting('enableGestures', option.data);
      this.deviceManager.toggleGesturesSupport();
      window.location.reload();
    }
  }

  @action handleDebugSelect(option: DropdownOption) {
    this.settings.setSetting('debug', option.data);
    this.settings.toggleDebugMode(option.data);
  }

  @action async handleSignOut() {
    this.session.invalidate();
  }
}
