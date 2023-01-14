import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { BoardCategory } from 'potber/services/api/types/board-category';

export interface Signature {
  Args: {
    category: BoardCategory;
  };
}

export default class BoardCategoryComponent extends Component<Signature> {
  declare args: Signature['Args'];

  @tracked expanded = false;

  @action toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
