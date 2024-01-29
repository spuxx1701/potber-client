import formatDate from 'ember-intl/helpers/format-date';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import Board from 'potber-client/models/board';
import ButtonLink from 'potber-client/components/common/button-link';
import styles from './styles.css';
import classNames from 'potber-client/helpers/class-names';

export interface Signature {
  Args: {
    board: Board;
  };
}

export default class BoardOverviewItem extends Component<Signature> {
  styles = styles;

  <template>
    <ButtonLink
      class={{classNames this 'item'}}
      @route='authenticated.board'
      @query={{hash BID=@board.id page=undefined}}
    >
      <p class='title'>{{@board.name}}</p>
      <p class='subtitle'>{{@board.description}}</p>
      {{#if @board.lastPost}}
        <p class='subtitle'>Letzter Post von
          <b>{{@board.lastPost.author.name}}</b>
          ({{formatDate @board.lastPost.date}})</p>
      {{/if}}
    </ButtonLink>
  </template>
}
