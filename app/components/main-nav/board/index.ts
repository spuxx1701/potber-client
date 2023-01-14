import Component from '@glimmer/component';
import { Board } from 'potber/services/api/types/board';

export interface Signature {
  Args: {
    board: Board;
    currentPage?: number;
  };
}

export default class MainNavBoardComponent extends Component<Signature> {
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
}
