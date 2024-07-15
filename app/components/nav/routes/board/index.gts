import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'potber-client/services/local-storage';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import { appConfig } from 'potber-client/config/app.config';
import Button from 'potber-client/components/common/control/button';
import Menu from 'potber-client/components/common/control/menu';
import ButtonLink from 'potber-client/components/common/button-link';
import { hash } from '@ember/helper';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import Portal from 'ember-stargate/components/portal';
import NavHeader from '../../component/header';
import MenuButton from 'potber-client/components/common/control/menu/button';
import MenuLinkExternal from 'potber-client/components/common/control/menu/link-external';
import MenuLink from 'potber-client/components/common/control/menu/link';
import { IntlService, t } from 'ember-intl';
import BoardRoute from 'potber-client/routes/authenticated/board';
import { Boards } from 'potber-client/services/api/types';

export interface Signature {
  Args: {
    board: Boards.Read;
  };
}

export default class NavBoardComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare messages: MessagesService;
  @service declare intl: IntlService;

  declare args: Signature['Args'];

  get subtitle() {
    return `${this.intl.t('route.board.subtitle', { page: this.currentPage })}`;
  }

  get currentPage() {
    return this.args.board.page.number || 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get nextPageVisible() {
    return true;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get originalUrl() {
    return `${appConfig.forumUrl}board.php?BID=${this.args.board.id}&page=${this.currentPage}`;
  }

  @action addToFavorites() {
    const boards = [...(this.localStorage.boardFavorites || [])];
    const ids = boards.map((board) => board.id);
    ids.push(this.args.board.id);
    this.localStorage.setBoardFavorites(ids);
    this.messages.showNotification(
      this.intl.t('route.board.add-to-favorites.success'),
      'success',
    );
  }

  @action async reload() {
    this.renderer.showLoadingIndicator();
    const owner = getOwner(this);
    if (!owner) throw new Error('Owner not found');
    (owner.lookup('route:authenticated.board') as BoardRoute)
      .refresh()
      .finally(() => {
        this.renderer.hideLoadingIndicator();
      });
  }

  <template>
    <Portal @target='top-nav'>
      <NavHeader @title={{@board.name}} @subtitle={{this.subtitle}} />
    </Portal>

    <Portal @target='bottom-nav'>
      <ButtonLink
        @title={{t 'route.board.back'}}
        @size='square'
        @route='authenticated.board-overview'
        @variant='primary-transparent'
        class='nav-element-left'
      ><FaIcon @icon='arrow-up' /></ButtonLink>

      <div class='nav-element-center'>
        {{#if this.previousPageVisible}}
          <ButtonLink
            @title={{t 'route.board.previous-page'}}
            @size='square'
            @route='authenticated.board'
            @query={{hash BID=@board.id page=this.previousPage}}
            @variant='primary-transparent'
          ><FaIcon @icon='chevron-left' /></ButtonLink>
        {{else}}
          <Button
            @text={{t 'misc.refresh'}}
            @size='square'
            @icon='rotate-right'
            @variant='primary-transparent'
            @onClick={{this.reload}}
          />
        {{/if}}

        <Menu
          @position={{unless this.renderer.isDesktop 'top' 'bottom'}}
          @variant='primary-transparent'
          @icon='ellipsis'
        >
          <MenuButton
            @text={{t 'route.board.add-to-favorites.label'}}
            @icon='star'
            @onClick={{this.addToFavorites}}
          />
          <MenuLinkExternal
            @text={{t 'route.board.original-url'}}
            @icon='up-right-from-square'
            @href={{this.originalUrl}}
            target='_blank'
          />
          <MenuLink
            @text={{t 'route.board.first-page'}}
            @icon='backward-step'
            @route='authenticated.board'
            @query={{hash BID=@board.id page='1'}}
          />
        </Menu>

        {{#if this.nextPageVisible}}
          <ButtonLink
            @title={{'route.board.next-page'}}
            @size='square'
            @route='authenticated.board'
            @query={{hash BID=@board.id page=this.nextPage}}
            @variant='primary-transparent'
          ><FaIcon @icon='chevron-right' /></ButtonLink>
        {{/if}}
      </div>
      <ButtonLink
        @title={{t 'route.board.create-thread'}}
        @size='square'
        @route='authenticated.create-thread'
        @query={{hash BID=@board.id}}
        @variant='primary-transparent'
        class='nav-element-right'
      ><FaIcon @icon='message' /></ButtonLink>
    </Portal>
  </template>
}
