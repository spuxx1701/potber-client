import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Bookmark from 'potber-client/models/bookmark';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    bookmark: Bookmark;
    inSidebar: boolean;
  };
}

export default class QuickstartNewsfeedBookmarkComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  get subtitle() {
    if (this.args.bookmark.newPostsCount === 1) {
      return `${this.args.bookmark.newPostsCount} neuer Post`;
    } else {
      return `${this.args.bookmark.newPostsCount} neue Posts`;
    }
  }

  get isClosed() {
    return this.args.bookmark.thread?.isClosed;
  }

  @action handleLinkClick() {
    if (this.args.inSidebar && !this.renderer.isDesktop) {
      this.renderer.toggleLeftSidebar(false);
    }
  }
}
