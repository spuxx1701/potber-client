import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import PrivateMessage from 'potber-client/models/private-message';
import ContentParserService from 'potber-client/services/content-parser';
import { getPrivateMessageFolderLabel } from 'potber-client/utils/private-messages';

interface Signature {
  Args: {
    message: PrivateMessage;
  };
}

export default class PrivateMessagesViewComponent extends Component<Signature> {
  @service declare contentParser: ContentParserService;

  get folder() {
    return getPrivateMessageFolderLabel(this.args.message.folder);
  }

  get content() {
    const content = this.contentParser.parsePrivateMessageContent(
      this.args.message.content || '',
    );
    return htmlSafe(content);
  }
}
