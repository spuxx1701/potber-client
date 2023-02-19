import Component from '@glimmer/component';
import Board from 'potber-client/models/board';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class BoardCategoryItemComponent extends Component<Signature> {
  declare args: Signature['Args'];
}
