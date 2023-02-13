import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Bookmark from 'potber-client/models/bookmark';
import RendererService from 'potber-client/services/renderer';

interface Signature {
  Args: {
    bookmark: Bookmark;
  };
}

export default class SidebarNewsFeedBookmarkComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  get subtitle() {
    if (this.args.bookmark.newPostsCount === 1) {
      return `${this.args.bookmark.newPostsCount} neuer Post`;
    } else {
      return `${this.args.bookmark.newPostsCount} neue Posts`;
    }
  }

  @action handleLinkClick() {
    this.renderer.closeLeftSidebar();
  }
}
