import { service } from '@ember/service';
import Component from '@glimmer/component';
import Board from 'potber-client/models/board';
import LocalStorageService from 'potber-client/services/local-storage';

interface Signature {
  Args: {
    inSidebar: boolean;
  };
}

export default class QuickstartBopardFavoritesComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;

  get boards(): Board[] | null {
    return this.localStorage.boardFavorites;
  }

  get status() {
    if (!this.boards) {
      return 'error';
    } else if (this.boards.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
