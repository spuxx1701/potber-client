import Component from '@glimmer/component';
import { service } from '@ember/service';
import { fn } from '@ember/helper';
import RouterService from '@ember/routing/router-service';
import Portal from 'ember-stargate/components/portal';
import type { IntlService } from 'ember-intl';
import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import ButtonLink from 'potber-client/components/common/button-link';
import Menu from 'potber-client/components/common/control/menu';
import MenuLinkExternal from 'potber-client/components/common/control/menu/link-external';
import MenuLink from 'potber-client/components/common/control/menu/link';
import MenuButton from 'potber-client/components/common/control/menu/button';
import NavHeader from 'potber-client/components/nav/component/header';
import { PrivateMessage } from 'potber-client/services/api/models/private-message';
import { PrivateMessageFolder } from 'potber-client/services/api/types/private-messages';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';
import { appConfig } from 'potber-client/config/app.config';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import NewsfeedService from 'potber-client/services/newsfeed';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class NavRoutesPrivateMessagesViewComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare newsfeed: NewsfeedService;
  @service declare intl: IntlService;
  @service declare modal: ModalService;
  @service declare router: RouterService;

  get message() {
    return this.args.message;
  }

  get subtitle() {
    return createPrivateMessageSubtitle(this.message);
  }

  get originalUrl() {
    return `${appConfig.forumUrl}/pm/?a=2&mid=${this.message.id}`;
  }

  get otherFolders() {
    const folders = Object.values(PrivateMessageFolder);
    return folders
      .filter((folder) => folder !== this.args.message.folder)
      .map((folder) => {
        return {
          key: folder,
          label: this.intl.t(`private-messages.folder.${folder}`),
        };
      });
  }

  markAsUnread = async () => {
    await this.message.markAsUnread();
    this.messages.showNotification(
      this.intl.t('route.private-messages.view.mark-as-unread.success'),
      'success',
    );
  };

  moveToFolder = async (folder: PrivateMessageFolder) => {
    await this.message.moveToFolder(folder);
    this.messages.showNotification(
      this.intl.t('route.private-messages.view.move-to-folder.success'),
      'success',
    );
  };

  delete = () => {
    this.modal.confirm({
      title: this.intl.t('private-messages.view.modal.delete.title'),
      text: this.intl.t('private-messages.view.modal.delete.text'),
      icon: 'trash',
      onSubmit: async () => {
        this.modal.close();
        await this.message.delete();
        this.router.transitionTo(
          `authenticated.private-messages.${this.message.folder}`,
        );
        this.messages.showNotification(
          this.intl.t('route.private-messages.view.delete.success'),
          'success',
        );
      },
    });
  };

  <template>
    {{#unless @message.isDeleted}}
      <Portal @target='top-nav'>
        <NavHeader @title={{@message.title}} @subtitle={{this.subtitle}} />
      </Portal>

      <Portal @target='bottom-nav'>
        <ButtonLink
          @title={{@message.folder}}
          @size='square'
          @route='authenticated.private-messages.{{@message.folder}}'
          class='nav-element-left'
        ><FaIcon @icon='arrow-up' /></ButtonLink>

        <div class='nav-element-center'>
          <Menu
            @position={{unless this.renderer.isDesktop 'top' 'bottom'}}
            @variant='primary-transparent'
            @icon='ellipsis'
          >
            <MenuLinkExternal
              @text='Original öffnen'
              @icon='up-right-from-square'
              @href={{this.originalUrl}}
              target='_blank'
            />
            <MenuButton
              @text='Als ungelesen markieren'
              @icon='envelope'
              @onClick={{this.markAsUnread}}
              target='_blank'
            />
            {{#each this.otherFolders as |folder|}}
              <MenuButton
                @text='Verschieben nach {{folder.label}}'
                @icon='folder'
                @onClick={{fn this.moveToFolder folder.key}}
                target='_blank'
              />
            {{/each}}
            <MenuButton
              @text='Nachricht löschen'
              @icon='trash'
              @onClick={{this.delete}}
              target='_blank'
            />
            <MenuLink
              @text='Weiterleiten'
              @icon='share'
              @route={{'authenticated.private-messages.forward'}}
              @model={{@message.id}}
            />
            <MenuLink
              @text='Antworten'
              @icon='reply'
              @route={{'authenticated.private-messages.reply'}}
              @model={{@message.id}}
            />
          </Menu>
        </div>
      </Portal>
    {{/unless}}
  </template>
}
