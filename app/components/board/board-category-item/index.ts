import Component from '@glimmer/component';
import { Board } from 'potber/services/api/types/board';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class BoardCategoryItemComponent extends Component<Signature> {
  declare args: Signature['Args'];
}
