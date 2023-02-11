import Component from '@glimmer/component';
import { Board } from 'potber-client/services/api/types/board';

export interface Signature {
  Args: {
    boards: Board[] | null;
  };
}

export default class SidebarBoardFavoritesComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get status() {
    if (!this.args.boards) {
      return 'error';
    } else if (this.args.boards.length === 0) {
      return 'empty';
    } else {
      return 'ok';
    }
  }
}
