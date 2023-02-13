import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import BoardCategory from 'potber-client/models/board-category';
import RendererService from 'potber-client/services/renderer';

export interface Signature {
  Args: {
    category: BoardCategory;
  };
}

export default class BoardCategoryComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  @tracked expanded = false;

  @action toggleExpanded(event: MouseEvent) {
    this.renderer.createClickRipple(event);
    this.expanded = !this.expanded;
  }
}
