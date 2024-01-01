import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Posts } from '../types';
import { ApiError } from '../error';

/**
 * Finds and returns a post by its id and threadId.
 * @param id The post id.
 * @param threadId The thread id.
 */
export async function findById(
  this: ApiService,
  id: string,
  threadId: string,
  options?: PublicFetchOptions,
): Promise<Posts.Read> {
  try {
    const post = await this.fetch(`posts/${id}?threadId=${threadId}`, {
      ...options,
      request: { method: 'GET' },
    });
    return post;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 403:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.forbidden'),
            'error',
          );
          break;
        case 404:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.not-found'),
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

/**
 * Creates a new post.
 * @param post The new post.
 * @returns The newly created post.
 */
export async function create(
  this: ApiService,
  post: Posts.Write,
  options?: PublicFetchOptions,
): Promise<Posts.Read> {
  try {
    const createdPost = await this.fetch('posts', {
      ...options,
      request: {
        method: 'POST',
        body: JSON.stringify(post),
      },
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

/**
 * Updates a post.
 * @param id The post id.
 * @param post The updated state of the post.
 * @returns The post after the update as returned by the API.
 */
export async function update(
  this: ApiService,
  id: string,
  post: Posts.Write,
  options?: PublicFetchOptions,
): Promise<Posts.Read> {
  try {
    const updatedPost = await this.fetch(`posts/${id}`, {
      ...options,
      request: {
        method: 'PUT',
        body: JSON.stringify(post),
      },
    });
    return updatedPost;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 403:
          this.messages.showNotification(
            this.intl.t('error.posts.update.forbidden'),
            'error',
          );
          break;
        case 429:
          this.messages.showNotification(
            this.intl.t('error.posts.update.too-many-requests'),
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

/**
 * Quotes the post with the given id. Returns an object containing the quoted post message.
 * @param id The post id.
 * @returns The object containing the quoted post message.
 */
export async function quote(
  this: ApiService,
  id: string,
  options?: PublicFetchOptions,
): Promise<Posts.Quote> {
  try {
    const quotedPost: Posts.Quote = await this.fetch(`posts/${id}/quote`, {
      ...options,
      request: { method: 'GET' },
    });
    return quotedPost;
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 403:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.forbidden'),
            'error',
          );
          break;
        case 404:
          this.messages.showNotification(
            this.intl.t('error.posts.find-by-id.not-found'),
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

/**
 * Reports the post with the given post id to the corresponding board's moderators.
 * @param id The post id.
 */
export async function report(
  this: ApiService,
  id: string,
  report: Posts.Report,
  options?: PublicFetchOptions,
) {
  try {
    await this.fetch(`posts/${id}/report`, {
      ...options,
      request: { method: 'POST', body: JSON.stringify(report) },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 409:
          this.messages.showNotification(
            this.intl.t('error.posts.report.conflict'),
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
