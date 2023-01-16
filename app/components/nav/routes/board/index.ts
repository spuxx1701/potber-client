import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Board } from 'potber/services/api/types/board';
import LocalStorageService from 'potber/services/local-storage';
import ENV from 'potber/config/environment';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import RendererService from 'potber/services/renderer';

export interface Signature {
  Args: {
    board: Board;
    page?: number;
  };
}

export default class NavBoardComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;

  declare args: Signature['Args'];

  get subtitle() {
    return `Seite ${this.currentPage}`;
  }

  get currentPage() {
    return this.args.page || 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get nextPageVisible() {
    return true;
  }

  get nextPage() {
    console.log('next: ' + (this.currentPage + 1));
    return this.currentPage + 1;
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

  @action async reload() {
    this.renderer.showLoadingIndicator();
    (getOwner(this as unknown) as any)
      .lookup('route:board')
      .refresh()
      .then(() => {
        this.renderer.hideLoadingIndicator();
      })
      .catch(() => {
        this.renderer.hideLoadingIndicator();
      });
  }
}
