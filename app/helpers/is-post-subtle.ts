import { helper } from '@ember/component/helper';
import Post from 'potber-client/models/post';
import { ThreadPage } from 'potber-client/models/thread';

export function isPostSubtle([post, subtleUntilPostId]: [
  Post,
  string,
  ThreadPage
]) {
  if (!subtleUntilPostId) return false;
  const postIdAsNumber = parseInt(post.id);
  const subtlePostIdAsNumber = parseInt(subtleUntilPostId);
  if (postIdAsNumber <= subtlePostIdAsNumber) {
    return true;
  }
}

export default helper(isPostSubtle);
