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
} from 'potber/routes/settings';
import MessagesService from 'potber/services/messages';
import AppService from 'potber/services/app';
import ModalService from 'potber/services/modal';

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
