import ApiService, { PublicFetchOptions } from 'potber-client/services/api';
import { Posts } from '../types';

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
  const post = await this.fetch(`posts/${id}?threadId=${threadId}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.posts.find-by-id.forbidden'),
      },
      {
        statusCode: 404,
        message: this.intl.t('error.posts.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return post;
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
  const createdPost = await this.fetch('posts', {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.posts.create.forbidden'),
      },
      {
        statusCode: 429,
        message: this.intl.t('error.posts.create.too-many-requests'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: {
      method: 'POST',
      body: JSON.stringify(post),
    },
  });
  return createdPost;
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
  const updatedPost = await this.fetch(`posts/${id}`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.posts.update.forbidden'),
      },
      {
        statusCode: 429,
        message: this.intl.t('error.posts.update.too-many-requests'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: {
      method: 'PUT',
      body: JSON.stringify(post),
    },
  });
  return updatedPost;
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
  const quotedPost: Posts.Quote = await this.fetch(`posts/${id}/quote`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 403,
        message: this.intl.t('error.posts.find-by-id.forbidden'),
      },
      {
        statusCode: 404,
        message: this.intl.t('error.posts.find-by-id.not-found'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'GET' },
  });
  return quotedPost;
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
  await this.fetch(`posts/${id}/report`, {
    ...options,
    statusNotifications: [
      {
        statusCode: 409,
        message: this.intl.t('error.posts.report.conflict'),
      },
      {
        statusCode: '*',
        message: this.intl.t('error.unknown'),
      },
    ],
    request: { method: 'POST', body: JSON.stringify(report) },
  });
}
