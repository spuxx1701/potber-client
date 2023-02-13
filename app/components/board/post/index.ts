import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ContentParserService from 'potber-client/services/content-parser';
import ENV from 'potber-client/config/environment';
import MessagesService from 'potber-client/services/messages';
import Post from 'potber-client/models/post';
import Bookmark from 'potber-client/models/bookmark';
import CustomStore from 'potber-client/services/custom-store';
import NewsFeedService from 'potber-client/services/news-feed';

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
  @service declare session: any;
  @service declare store: CustomStore;
  @service declare newsFeed: NewsFeedService;

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

  get message() {
    if (typeof this.args.post.message === 'string') {
      const content = this.contentParser.parsePostContent(
        this.args.post.message
      );
      return content;
    } else {
      return null;
    }
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

  @action async setBookmark() {
    try {
      const bookmark = this.store.createRecord('bookmark', {
        postId: this.args.post.id,
        threadId: this.args.post.threadId,
      });
      await bookmark.save();
      this.messages.showNotification('Bookmark gespeichert', 'success');
      this.newsFeed.refreshBookmarks();
    } catch (error: any) {
      if (error.errors?.find((httpError: any) => httpError.status === '400')) {
        this.messages.showNotification(
          'Lesezeichen ist bereits gesetzt.',
          'error'
        );
      } else {
        this.messages.logErrorAndNotify(
          'Das hat leider nicht geklappt.',
          error,
          this.constructor.name
        );
      }
    }
  }

  get canEdit() {
    return (
      this.session.isAuthenticated &&
      this.session.data.userId === this.args.post.author.id
    );
  }

  get editingInfo() {
    if (this.args.post.editedCount && this.args.post.lastEdit) {
      return `${this.args.post.editedCount}x bearbeitet, zuletzt von ${
        this.args.post.lastEdit.user.name
      } am ${this.args.post.lastEdit.date.toLocaleString()}`;
    }
  }
}
