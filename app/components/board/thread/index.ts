import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { Thread } from 'potber/services/api/types/thread';
import { FirstPost, LastPost } from 'potber/services/api/types/post';

export interface Signature {
  Args: {
    thread: Thread;
  };
}

export default class ThreadComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get isImportant() {
    return (
      this.args.thread.isAnnouncement ||
      this.args.thread.isGlobal ||
      this.args.thread.isImportant ||
      this.args.thread.isSticky
    );
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
    let post: FirstPost | LastPost;
    if (this.args.thread.lastPost) {
      post = this.args.thread.lastPost;
    } else if (this.args.thread.firstPost) {
      post = this.args.thread.firstPost;
    } else return undefined;
    return htmlSafe(
      `<b>${post.author.name}</b> am ${post.date.toLocaleString()}`
    );
  }
}
