import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { PostPreview } from 'potber-client/models/post';
import Thread from 'potber-client/models/thread';
import CustomStore from 'potber-client/services/custom-store';
import RendererService from 'potber-client/services/renderer';
import SettingsService from 'potber-client/services/settings';

export interface Signature {
  Args: {
    thread: Thread;
  };
}

export default class ThreadComponent extends Component<Signature> {
  declare args: Signature['Args'];

  @service declare store: CustomStore;
  @service declare renderer: RendererService;
  @service declare settings: SettingsService;

  get isImportant() {
    return (
      this.args.thread.isAnnouncement ||
      this.args.thread.isGlobal ||
      this.args.thread.isImportant ||
      this.args.thread.isSticky
    );
  }

  get bookmark() {
    if (this.store.bookmarks) {
      return this.store.bookmarks.find(
        (bookmark) => bookmark.thread?.id === this.args.thread.id,
      );
    }
  }

  get icon() {
    return this.args.thread.firstPost?.icon || undefined;
  }

  get subtitle() {
    return this.args.thread.subtitle || '';
  }

  get pagesLabel() {
    if (this.args.thread.pagesCount > 1) {
      return `${this.args.thread.pagesCount} Seiten`;
    } else if (this.args.thread.pagesCount === 1) {
      return '1 Seite';
    } else return undefined;
  }

  get lastPostLabel() {
    let post: PostPreview;
    if (this.args.thread.lastPost) {
      post = this.args.thread.lastPost;
    } else if (this.args.thread.firstPost) {
      post = this.args.thread.firstPost;
    } else return undefined;
    return htmlSafe(
      `<b>${post.author.name}</b> am ${new Date(post.date).toLocaleString()}`,
    );
  }

  get scrollToBottom() {
    return this.settings.getSetting('goToBottomOfThreadPage') || undefined;
  }
}
