import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'potber-client/components/common/control/dropdown';
import LocalStorageService from 'potber-client/services/local-storage';
import RendererService from 'potber-client/services/renderer';
import {
  avatarStyleOptions,
  boxStyleOptions,
  landingPageOptions,
} from 'potber-client/routes/authenticated/settings';
import MessagesService from 'potber-client/services/messages';
import AppService from 'potber-client/services/app';
import ModalService from 'potber-client/services/modal';

export default class SettingsController extends Controller {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare modal: ModalService;
  @service declare app: AppService;

  avatarStyleOptions = avatarStyleOptions;
  boxStyleOptions = boxStyleOptions;
  landingPageOptions = landingPageOptions;

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
}
