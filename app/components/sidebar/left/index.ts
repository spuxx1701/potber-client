import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber/services/local-storage';

export default class SidebarLeftComponent extends Component {
  @service declare localStorage: LocalStorageService;

  get navOnTop() {
    return this.localStorage.mainNavPosition === 'top';
  }
}
