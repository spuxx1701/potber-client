import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ContentParserService from 'potber-client/services/content-parser';
import ENV from 'potber-client/config/environment';
import MessagesService from 'potber-client/services/messages';
import Post from 'potber-client/models/post';
import CustomStore from 'potber-client/services/custom-store';
import NewsfeedService from 'potber-client/services/newsfeed';
import Thread from 'potber-client/models/thread';
import SettingsService, { AvatarStyle } from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';
import LocalStorageService from 'potber-client/services/local-storage';
import ModalService from 'potber-client/services/modal';
import CustomSession from 'potber-client/services/custom-session';
import { htmlSafe } from '@ember/template';

interface Signature {
  Args: {
    post: Post;
    thread: Thread;
    subtle?: boolean;
    isPreview?: boolean;
  };
}

export default class PostComponent extends Component<Signature> {
  @service declare contentParser: ContentParserService;
  @service declare messages: MessagesService;
  @service declare session: CustomSession;
  @service declare store: CustomStore;
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare modal: ModalService;

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);
  }

  declare args: Signature['Args'];

  get elementId() {
    return `post-${this.args.post.id}`;
  }

  get date() {
    if (this.args.isPreview) {
      return new Date().toLocaleString();
    }
    return new Date(this.args.post.date).toLocaleString();
  }

  get href() {
    return `${window.location.protocol}//${window.location.host}/thread?TID=${this.args.post.threadId}&PID=${this.args.post.id}`;
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}/thread.php?TID=${this.args.post.threadId}&PID=${this.args.post.id}`;
  }

  get message() {
    if (typeof this.args.post.message === 'string') {
      const content = this.contentParser.parsePostContent(
        this.args.post.message
      );
      return htmlSafe(content);
    } else {
      return null;
    }
  }

  get showSmallAvatar() {
    return (
      this.args.post.avatarUrl &&
      this.settings.avatarStyle === AvatarStyle.small
    );
  }

  @action async showAuthorProfile() {
    try {
      const user = await this.store.findRecord(
        'user',
        this.args.post.author.id
      );
      this.modal.userProfile({ user });
    } catch (error: any) {
      if (error.errors && error.errors[0]?.status === '404') {
        this.messages.showNotification(
          'Dieser User existiert nicht (mehr).',
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

  @action copyLink() {
    if (this.args.isPreview) return;
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
      this.newsfeed.refreshBookmarks();
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

  @action async savePost() {
    try {
      const savedPosts = [
        ...((await this.localStorage.getSavedPosts()) as Post[]),
      ];
      if (savedPosts.find((post) => post.id === this.args.post.id)) {
        this.messages.showNotification(
          'Du hast diesen Post bereits gespeichert.',
          'error'
        );
        return;
      }
      savedPosts.push(this.args.post);
      this.localStorage.setSavedPosts(savedPosts);
      this.messages.showNotification('Post gespeichert', 'success');
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Das hat leider nicht geklappt.',
        error,
        this.constructor.name
      );
    }
  }

  get canEdit() {
    return this.session.sessionData?.userId === this.args.post.author.id;
  }

  get editingInfo() {
    if (this.args.post.editedCount && this.args.post.lastEdit) {
      return `${this.args.post.editedCount}x bearbeitet, zuletzt von ${
        this.args.post.lastEdit.user.name
      } am ${new Date(this.args.post.lastEdit.date).toLocaleString()}`;
    }
  }
}
