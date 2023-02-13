import Helper from '@ember/component/helper';
import Post from 'potber-client/models/post';
import { ThreadPage } from 'potber-client/models/thread';

export default class IsPostSubtleHelper extends Helper {
  compute([currentPost, subtleUntilPostId, page]: [Post, string, ThreadPage]) {
    if (!subtleUntilPostId) return false;
    for (const post of page.posts) {
      if (post.id === subtleUntilPostId) return false;
      else if (post.id === currentPost.id) return true;
    }
  }
}
