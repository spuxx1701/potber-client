import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber-client/services/local-storage';
import ENV from 'potber-client/config/environment';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import Board from 'potber-client/models/board';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class NavBoardComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare messages: MessagesService;

  declare args: Signature['Args'];

  get subtitle() {
    return `Seite ${this.currentPage}`;
  }

  get currentPage() {
    return this.args.board.page.number || 1;
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
    return this.currentPage + 1;
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}board.php?BID=${this.args.board.id}&page=${this.currentPage}`;
  }

  @action addToFavorites() {
    const boards = [...(this.localStorage.boardFavorites || [])];
    const ids = boards.map((board) => board.id);
    ids.push(this.args.board.id);
    this.localStorage.setBoardFavorites(ids);
    this.messages.showNotification(
      'Board wurde zu Deinen Favoriten hinzugefügt.',
      'success'
    );
  }

  @action async reload() {
    this.renderer.showLoadingIndicator();
    (getOwner(this as unknown) as any)
      .lookup('route:authenticated.board')
      .refresh()
      .then(() => {
        this.renderer.hideLoadingIndicator();
      })
      .catch(() => {
        this.renderer.hideLoadingIndicator();
      });
  }
}
