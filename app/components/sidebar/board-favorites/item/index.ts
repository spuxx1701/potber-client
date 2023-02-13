import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import ENV from 'potber-client/config/environment';
import LocalStorageService from 'potber-client/services/local-storage';
import Board from 'potber-client/models/board';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class SidebarBoardFavoritesItemComponent extends Component<Signature> {
  @service declare localStorage: LocalStorageService;
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}board.php?BID=${this.args.board.id}`;
  }

  @action handleLinkClick() {
    this.renderer.closeLeftSidebar();
  }

  @action remove() {
    const boards = [...(this.localStorage.boardFavorites || [])];
    const index = boards.indexOf(this.args.board);
    boards.splice(index, 1);
    const remainingIds = boards.map((board) => board.id);
    this.localStorage.setBoardFavorites(remainingIds);
  }
}
