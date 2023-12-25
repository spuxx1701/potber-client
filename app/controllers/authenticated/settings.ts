import Controller from '@ember/controller';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown/types';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import AppService from 'potber-client/services/app';
import ModalService from 'potber-client/services/modal';
import SettingsService, { Settings } from 'potber-client/services/settings';
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

  handleSettingSelect = (
    settingKey: keyof Settings,
    option: DropdownOption,
  ) => {
    if (this.settings.getSetting(settingKey) === undefined)
      throw new Error(`Unknown setting key: ${settingKey}`);
    this.settings.setSetting(settingKey, option.data);
  };

  handleThemeSelect = (option: DropdownOption) => {
    this.settings.setSetting('theme', option.data);
    this.renderer.updateTheme();
  };

  handleSidebarLayoutSelect = (option: DropdownOption) => {
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
  };

  handleFontSizeSelect = (option: DropdownOption) => {
    this.settings.setSetting('fontSize', option.data);
    this.renderer.updateFontSize();
  };

  handleGesturesSelect = (option: DropdownOption) => {
    this.settings.setSetting('gestures', option.data);
    this.deviceManager.toggleGesturesSupport();
    window.location.reload();
  };

  handleDebugSelect = (option: DropdownOption) => {
    this.settings.setSetting('debug', option.data);
    this.settings.toggleDebugMode(option.data);
  };

  handleSignOut = () => {
    this.session.invalidate();
  };
}
