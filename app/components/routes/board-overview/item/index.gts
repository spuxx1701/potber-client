import formatDate from 'ember-intl/helpers/format-date';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import ButtonLink from 'potber-client/components/common/button-link';
import styles from './styles.module.css';
import classNames from 'potber-client/helpers/class-names';
import { Boards } from 'potber-client/services/api/types';

export interface Signature {
  Args: {
    board: Boards.Read;
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
