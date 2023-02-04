import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Post } from 'potber/services/api/types/post';
import ContentParserService from 'potber/services/content-parser';
import ENV from 'potber/config/environment';
import MessagesService from 'potber/services/messages';

interface Signature {
  Args: {
    post: Post;
    avatarStyle: string;
    subtle?: boolean;
  };
}

export default class PostComponent extends Component<Signature> {
  @service declare contentParser: ContentParserService;
  @service declare messages: MessagesService;

  declare args: Signature['Args'];

  get date() {
    return this.args.post.date.toLocaleString();
  }

  get href() {
    return `${window.location.protocol}//${window.location.host}/thread?TID=${this.args.post.threadId}&PID=${this.args.post.id}#reply_${this.args.post.id}`;
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}/thread.php?TID=${this.args.post.threadId}&PID=${this.args.post.id}#reply_${this.args.post.id}`;
  }

  get content() {
    const content = this.contentParser.parsePostContent(this.args.post.content);
    return content;
  }

  get showSmallAvatar() {
    return this.args.post.avatarUrl && this.args.avatarStyle === 'small';
  }

  get avatarUrl() {
    if (this.args.post.avatarUrl) {
      // Remove './' from avatarUrl
      const url = this.args.post.avatarUrl?.slice(
        2,
        this.args.post.avatarUrl.length
      );
      return `${ENV.APP['FORUM_URL']}${url}`;
    }
  }

  @action copyLink() {
    navigator.clipboard.writeText(this.href);
    this.messages.showNotification(
      'Link in Zwischenablage kopiert.',
      'success'
    );
  }

  @action handleMenuClick() {
    // do something
  }
}
