import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Board } from 'potber/services/api/types/board';
import { service } from '@ember/service';
import RendererService from 'potber/services/renderer';
import ENV from 'potber/config/environment';
import LocalStorageService from 'potber/services/local-storage';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class SidebarBoardFavoriteComponent extends Component<Signature> {
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
