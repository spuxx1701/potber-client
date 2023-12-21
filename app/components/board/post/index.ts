import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import ContentParserService from 'potber-client/services/content-parser';
import MessagesService from 'potber-client/services/messages';
import Post from 'potber-client/models/post';
import NewsfeedService from 'potber-client/services/newsfeed';
import Thread from 'potber-client/models/thread';
import SettingsService, { AvatarStyle } from 'potber-client/services/settings';
import RendererService from 'potber-client/services/renderer';
import LocalStorageService from 'potber-client/services/local-storage';
import ModalService from 'potber-client/services/modal';
import CustomSession from 'potber-client/services/custom-session';
import { htmlSafe } from '@ember/template';
import { appConfig } from 'potber-client/config/app.config';
import ApiService from 'potber-client/services/api';
import { IntlService } from 'ember-intl';

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
  @service declare newsfeed: NewsfeedService;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare modal: ModalService;
  @service declare api: ApiService;
  @service declare intl: IntlService;

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

  get url() {
    return `${appConfig.forumUrl}/thread.php?TID=${this.args.post.threadId}&PID=${this.args.post.id}`;
  }

  get message() {
    if (typeof this.args.post.message === 'string') {
      const content = this.contentParser.parsePostContent(
        this.args.post.message,
        { groupId: this.args.post.author.groupId },
      );
      return htmlSafe(content);
    } else {
      return null;
    }
  }

  get showSmallAvatar() {
    return (
      this.args.post.avatarUrl &&
      this.settings.getSetting('avatarStyle') === AvatarStyle.small
    );
  }

  @action async showAuthorProfile() {
    try {
      const user = await this.api.findUserById(this.args.post.author.id);
      this.modal.userProfile({ user });
    } catch (error: any) {
      // In case of an error, do not call the modal
      return;
    }
  }

  @action copyUrl() {
    if (this.args.isPreview) return;
    navigator.clipboard.writeText(this.url);
    this.messages.showNotification(
      'Link in Zwischenablage kopiert.',
      'success',
    );
  }

  @action async setBookmark() {
    await this.api.createBookmark(this.args.post.id, this.args.post.threadId);
    this.messages.showNotification(
      this.intl.t('route.thread.create-bookmark-success'),
      'success',
    );
    this.newsfeed.refreshBookmarks();
  }

  @action async savePost() {
    try {
      const savedPosts = [
        ...((await this.localStorage.getSavedPosts()) as Post[]),
      ];
      if (savedPosts.find((post) => post.id === this.args.post.id)) {
        this.messages.showNotification(
          'Du hast diesen Post bereits gespeichert.',
          'error',
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
        this.constructor.name,
      );
    }
  }

  @action report() {
    this.modal.input({
      title: 'Post melden',
      icon: 'triangle-exclamation',
      label:
        'Bitte gib einen Grund an, weshalb Du diesen Post an die Moderator:innen melden möchtest.',
      submitLabel: 'Melden',
      useTextarea: true,
      onSubmit: async (cause: string) => {
        try {
          await this.api.reportPost(this.args.post.id, { cause });
          this.messages.showNotification(
            this.intl.t('route.thread.report-post-success'),
            'success',
          );
        } catch (error) {
          // In case of an error do nothing so the user can potentially try again
        }
        this.modal.close();
      },
    });
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
