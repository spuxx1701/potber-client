import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Board } from 'potber/services/api/types/board';
import LocalStorageService from 'potber/services/local-storage';
import ENV from 'potber/config/environment';
import { action } from '@ember/object';

export interface Signature {
  Args: {
    board: Board;
    currentPage?: number;
  };
}

export default class MainNavBoardComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;

  declare args: Signature['Args'];

  get subtitle() {
    return `Seite ${this.currentPage}`;
  }

  get nextPageVisible() {
    return true;
  }

  get currentPage() {
    return this.args.currentPage || 1;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get isTopNav() {
    return this.localStorage.mainNavPosition === 'top';
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}board.php?BID=${this.args.board.id}&page=${this.currentPage}`;
  }

  @action addToFavorites() {
    const boards = [...(this.localStorage.boardFavorites || [])];
    const ids = boards.map((board) => board.id);
    ids.push(this.args.board.id);
    this.localStorage.setBoardFavorites(ids);
  }
}
