import Component from '@glimmer/component';
import { service } from '@ember/service';
import styles from './styles.module.css';
import ContentParserService from 'potber-client/services/content-parser';
import MessagesService from 'potber-client/services/messages';
import Post from 'potber-client/models/post';
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
import BookmarkStore from 'potber-client/services/stores/bookmark';
import { getAnchorId } from 'potber-client/utils/misc';
import SocialsService from 'potber-client/services/socials';
import ClassNames from 'potber-client/helpers/class-names';

interface Signature {
  Args: {
    post: Post;
    thread: Thread;
    subtle?: boolean;
    disableMenu?: boolean;
  };
}

export default class PostComponent extends Component<Signature> {
  styles = styles;

  @service declare contentParser: ContentParserService;
  @service declare messages: MessagesService;
  @service declare session: CustomSession;
  @service declare settings: SettingsService;
  @service declare renderer: RendererService;
  @service declare localStorage: LocalStorageService;
  @service declare modal: ModalService;
  @service declare api: ApiService;
  @service declare intl: IntlService;
  @service('stores/bookmark') declare bookmarkStore: BookmarkStore;
  @service declare socials: SocialsService;

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);
  }

  declare args: Signature['Args'];

  get elementId() {
    return getAnchorId(this.args.post.id);
  }

  get authorName() {
    return (
      this.args.post.author.name ??
      this.intl.t('route.thread.post.deleted-user')
    );
  }

  get date() {
    return this.args.post.date
      ? new Date(this.args.post.date).toLocaleString()
      : new Date().toLocaleString();
  }

  get href() {
    return `${window.location.protocol}//${window.location.host}/thread?TID=${this.args.post.threadId}&PID=${this.args.post.id}`;
  }

  get url() {
    return `${appConfig.forumUrl}thread.php?TID=${this.args.post.threadId}&PID=${this.args.post.id}#reply_${this.args.post.id}`;
  }

  get message() {
    if (typeof this.args.post.message === 'string') {
      const content = this.contentParser.parsePostContent(
        this.args.post.message,
        { privileged: this.args.post.author.privileged },
      );
      return htmlSafe(content);
    } else {
      return null;
    }
  }

  get showAvatar() {
    return (
      this.args.post.avatarUrl &&
      this.settings.getSetting('avatarStyle') === AvatarStyle.small
    );
  }

  showAuthorProfile = async () => {
    try {
      const user = await this.api.findUserById(this.args.post.author.id);
      this.modal.userProfile({ user });
    } catch (error: any) {
      // In case of an error, do not call the modal
      return;
    }
  };

  copyUrl = () => {
    if (this.args.disableMenu) return;
    navigator.clipboard.writeText(this.url);
    this.messages.showNotification(
      'Link in Zwischenablage kopiert.',
      'success',
    );
  };

  setBookmark = async () => {
    await this.api.createBookmark(this.args.post.id, this.args.post.threadId);
    this.messages.showNotification(
      this.intl.t('route.thread.create-bookmark-success'),
      'success',
    );
    this.bookmarkStore.reload();
  };

  savePost = async () => {
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
  };

  report = () => {
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
  };

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

  blockUser = () => {
    this.socials.blockUser(
      this.args.post.author.id,
      this.args.post.author.name,
    );
    this.messages.showNotification(
      this.intl.t('feature.blocklist.blocked-user', {
        username: this.args.post.author.name,
      }),
      'success',
    );
  };

  unblockUser = () => {
    this.socials.unblockUser(this.args.post.author.id);
    this.messages.showNotification(
      this.intl.t('feature.blocklist.unblocked-user', {
        username: this.args.post.author.name,
      }),
      'success',
    );
  };

  get blocked() {
    return this.socials.isUserBlocked(this.args.post.author.id);
  }

  unblockPost = (event: MouseEvent) => {
    (event.target as HTMLButtonElement).remove();
  };

  checkForQuotesByBlockedUsers = (element: HTMLDivElement) => {
    const quotes = element.querySelectorAll(`span.quote`);
    for (const quote of quotes) {
      const body = quote.querySelector('blockquote');
      const authorName = quote.getAttribute('data-author-name');
      if (!authorName || !body) continue;
      const block = this.socials.isUserBlocked(authorName);
      if (block) {
        const mask = document.createElement('button');
        mask.className = new ClassNames().compute([this, 'blocked-mask']);
        mask.addEventListener('click', () => {
          mask.remove();
        });
        body.appendChild(mask);
      }
    }
  };
}
