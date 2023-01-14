import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber/services/local-storage';
import SessionService from 'potber/services/session';

export default class SidebarLeftComponent extends Component {
  @service declare localStorage: LocalStorageService;
  @service declare session: SessionService;

  get navOnTop() {
    return this.localStorage.mainNavPosition === 'top';
  }
}
