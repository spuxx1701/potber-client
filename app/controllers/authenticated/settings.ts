import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import RendererService from 'potber-client/services/renderer';
import {
  autoRefreshSidebarOptions,
  avatarStyleOptions,
  boxStyleOptions,
  landingPageOptions,
  SettingsRouteModel,
  sidebarLayoutOptions,
  fontSizeOptions,
} from 'potber-client/routes/authenticated/settings';
import MessagesService from 'potber-client/services/messages';
import AppService from 'potber-client/services/app';
import ModalService from 'potber-client/services/modal';
import SettingsService from 'potber-client/services/settings';
import CustomSession from 'potber-client/services/custom-session';

export default class SettingsController extends Controller {
  declare model: SettingsRouteModel;

  @service declare settings: SettingsService;
  @service declare session: CustomSession;
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare modal: ModalService;
  @service declare app: AppService;

  avatarStyleOptions = avatarStyleOptions;
  boxStyleOptions = boxStyleOptions;
  sidebarLayoutOptions = sidebarLayoutOptions;
  fontSizeOptions = fontSizeOptions;
  landingPageOptions = landingPageOptions;
  autoRefreshSidebarOptions = autoRefreshSidebarOptions;

  @action handleAvatarStyleSelect(option: DropdownOption) {
    this.settings.avatarStyle = option.data;
  }

  @action handleBoxStyleSelect(option: DropdownOption) {
    this.settings.boxStyle = option.data;
    this.renderer.updateBoxStyle();
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
    this.settings.sidebarLayout = option.data;
    this.renderer.updateSidebarLayout();
  }

  @action handleFontSizeSelect(option: DropdownOption) {
    this.settings.fontSize = option.data;
    this.renderer.updateFontSize();
  }

  @action handleLandingPageSelect(option: DropdownOption) {
    this.settings.landingPage = option.data;
  }

  @action handleAutoRefreshSidebarSelect(option: DropdownOption) {
    this.settings.autoRefreshSidebar = option.data;
  }

  @action async handleSignOut() {
    this.session.invalidate();
  }
}
