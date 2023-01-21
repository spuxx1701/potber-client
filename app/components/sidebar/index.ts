import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Bookmark } from 'potber/services/api/types/bookmark';
import LocalStorageService from 'potber/services/local-storage';
import SessionService from 'potber/services/session';

interface Signature {
  Args: {
    bookmarks: Bookmark[] | null;
  };
}

export default class SidebarComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;
  @service declare session: SessionService;

  get authenticated() {
    return this.session.session.authenticated;
  }

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
