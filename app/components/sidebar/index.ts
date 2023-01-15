import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber/services/local-storage';
import SessionService from 'potber/services/session';

export default class SidebarComponent extends Component {
  @service declare localStorage: LocalStorageService;
  @service declare session: SessionService;

  get navOnTop() {
    return this.localStorage.mainNavPosition === 'top';
  }

  get boardFavorites() {
    if (this.localStorage.boardFavorites) {
      return this.localStorage.boardFavorites?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    return null;
  }
}
