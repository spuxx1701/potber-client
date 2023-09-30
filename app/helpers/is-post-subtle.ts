import { helper } from '@ember/component/helper';
import Post from 'potber-client/models/post';
import { ThreadPage } from 'potber-client/models/thread';

export function isPostSubtle([post, lastReadPost]: [Post, string, ThreadPage]) {
  if (!lastReadPost) return false;
  const postIdAsNumber = parseInt(post.id);
  const subtlePostIdAsNumber = parseInt(lastReadPost);
  if (postIdAsNumber <= subtlePostIdAsNumber) {
    return true;
  }
}

export default helper(isPostSubtle);
