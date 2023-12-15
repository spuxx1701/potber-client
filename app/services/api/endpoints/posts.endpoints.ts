import ApiService from 'potber-client/services/api';
import { Post, Posts } from '../types';
import { ApiError } from '../error';

/**
 * Creates a new post.
 * @param post The new post.
 */
export async function create(
  this: ApiService,
  post: Posts.Create,
): Promise<Post> {
  try {
    const createdPost = await this.fetch('posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
    return createdPost;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 403:
          this.messages.showNotification(
            this.intl.t('error.posts.create.forbidden'),
            'error',
          );
          break;
        case 429:
          this.messages.showNotification(
            this.intl.t('error.posts.create.too-many-requests'),
            'error',
          );
          break;
        default:
          this.messages.showNotification(this.intl.t('error.unknown'), 'error');
      }
    }
    throw error;
  }
}
