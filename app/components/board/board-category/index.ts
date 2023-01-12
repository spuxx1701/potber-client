import Component from '@glimmer/component';
import { BoardCategory } from 'potber/services/api/types/board';

export interface Signature {
  Args: {
    category: BoardCategory;
  };
}

export default class BoardCategoryComponent extends Component<Signature> {
  declare args: Signature['Args'];
}
