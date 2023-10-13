import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import Post from 'potber-client/models/post';
import SettingsService from 'potber-client/services/settings';

export function isPostSubtle([post, lastReadPost, darkenReadPosts]: [
  Post,
  string,
  boolean,
]) {
  if (!lastReadPost || !darkenReadPosts) return false;
  const postIdAsNumber = parseInt(post.id);
  const subtlePostIdAsNumber = parseInt(lastReadPost);
  if (postIdAsNumber <= subtlePostIdAsNumber) {
    return true;
  }
}
export default class IsPostSubtleHelper extends Helper {
  @service declare settings: SettingsService;

  compute([post, lastReadPost]: [Post, string, boolean]) {
    return isPostSubtle([
      post,
      lastReadPost,
      this.settings.getSetting('darkenReadPosts'),
    ]);
  }
}
