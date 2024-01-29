import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import BoardCategory from 'potber-client/models/board-category';
import RendererService from 'potber-client/services/renderer';
import BoardCategoryItem from 'potber-client/components/routes/board-overview/item';
import classNames from 'potber-client/helpers/class-names';
import styles from './styles.css';

export interface Signature {
  Args: {
    category: BoardCategory;
  };
}

export default class BoardOverviewCategory extends Component<Signature> {
  @service declare renderer: RendererService;
  styles = styles;

  @tracked expanded = false;

  toggleExpanded = (event: MouseEvent) => {
    this.renderer.createClickRipple(event);
    this.expanded = !this.expanded;
  };

  <template>
    <div class={{classNames this 'category'}}>
      <button
        class={{classNames this 'toggle'}}
        type='button'
        {{on 'click' this.toggleExpanded}}
      >
        <div class={{classNames this 'header'}}>
          <p class='title'>{{@category.name}}</p>
          <p class='subtitle'>{{@category.description}}</p>
        </div>
        <FaIcon
          class={{classNames this 'toggle-chevron'}}
          @icon={{if this.expanded 'chevron-down' 'chevron-right'}}
        />
      </button>
      {{#if this.expanded}}
        {{#each @category.boards as |board|}}
          <BoardCategoryItem @board={{board}} />
        {{/each}}
      {{/if}}
    </div>
  </template>
}
