import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'potber/components/common/control/dropdown';
import LocalStorageService from 'potber/services/local-storage';
import RendererService from 'potber/services/renderer';
import {
  navPositionOptions,
  benderOptions,
  boxStyleOptions,
} from 'potber/routes/settings';

export default class SettingsController extends Controller {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;

  navPositionOptions = navPositionOptions;
  benderOptions = benderOptions;
  boxStyleOptions = boxStyleOptions;

  @action handleNavPositionSelect(option: DropdownOption) {
    this.localStorage.setMainNavPosition(option.data);
    this.renderer.updateMainNavPosition();
  }

  @action handleBendersSelect(option: DropdownOption) {
    this.localStorage.setBenders(option.data);
  }

  @action handleBoxStyleSelect(option: DropdownOption) {
    this.localStorage.setBoxStyle(option.data);
    this.renderer.updateBoxStyle();
  }
}
