import ApiService from 'potber-client/services/api';
import { Posts } from '../types';

/**
 * Creates a new post.
 * @param post The new post.
 */
export async function create(this: ApiService, post: Posts.Create) {
  return this.fetch('posts', { method: 'POST', body: JSON.stringify(post) });
}
