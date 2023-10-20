import Component from '@glimmer/component';
import PrivateMessage, {
  PrivateMessageFolder,
} from 'potber-client/models/private-message';
import { createPrivateMessageSubtitle } from 'potber-client/utils/private-messages';
import { appConfig } from 'potber-client/config/app.config';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import MessagesService from 'potber-client/services/messages';
import NewsfeedService from 'potber-client/services/newsfeed';
import type { IntlService } from 'ember-intl';

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

  get subtitle() {
    return createPrivateMessageSubtitle(this.args.message);
  }

  get originalUrl() {
    return `${appConfig.forumUrl}/pm/?a=2&mid=${this.args.message.id}`;
  }

  markAsUnread = async () => {
    try {
      await this.args.message.markAsUnread();
      this.args.message.unread = true;
      this.messages.showNotification(
        'Nachricht wurde als ungelesen markiert.',
        'success',
      );
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Das hat leider nicht geklappt. Versuche es später nochmal',
        error,
        this.constructor.name,
      );
    }
  };

  get getOtherFolders() {
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

  moveToFolder = async (folder: PrivateMessageFolder) => {
    try {
      await this.args.message.moveToFolder({ folder });
      this.args.message.folder = folder;
      this.messages.showNotification('Nachricht wurde verschoben.', 'success');
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Das hat leider nicht geklappt. Versuche es später nochmal',
        error,
        this.constructor.name,
      );
    }
  };
}
