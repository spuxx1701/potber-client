import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Bookmark } from 'potber-client/services/api/types/bookmark';
import LocalStorageService from 'potber-client/services/local-storage';

interface Signature {
  Args: {
    bookmarks: Bookmark[] | null;
  };
}

export default class SidebarComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;
  @service declare session: any;

  get authenticated() {
    return this.session.data.authenticated;
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
