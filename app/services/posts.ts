import { service } from '@ember/service';
import { PostFormContent } from 'potber-client/components/board/post-form';
import ApiService from './api';
import MessagesService from './messages';
import ENV from 'potber-client/config/environment';

export default class PostsService extends ApiService {
  @service declare messages: MessagesService;

  /**
   * Calls '/newreply.php' and attempts to create a new post.
   * @param threadId The thread ID the post should belong to.
   * @param token The security token
   * @param options
   */
  async createPost(threadId: string, post: PostFormContent) {
    try {
      const body = this.createFormBody('post', post, { threadId });
      const response = await fetch(`${ENV.APP['FORUM_URL']}newreply.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        credentials: 'include',
        body,
      });
      return await this.processResponse(response);
    } catch (error) {
      this.messages.log('Failed to create post: ' + error, {
        type: 'error',
        context: this.constructor.name,
      });
    }
  }

  async editPost(post: PostFormContent) {
    if (!post.id)
      throw new Error('Post ID must be provided when editing a post.');
    try {
      const body = this.createFormBody('edit', post, { postId: post.id });
      const response = await fetch(`${ENV.APP['FORUM_URL']}editreply.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        credentials: 'include',
        body,
      });
      return await this.processResponse(response);
    } catch (error) {
      this.messages.log(`Failed to edit post '${post.id}': ${error}`, {
        type: 'error',
        context: this.constructor.name,
      });
    }
  }

  /**
   * Creats a form body from the given post and other parameters.
   * @param prefix Whether you want to create a post or an edit request.
   * @param post The post.
   * @param options Optional options. Either threadId or postId must be supplied.
   * @returns The form body.
   */
  createFormBody(
    prefix: 'post' | 'edit',
    post: PostFormContent,
    options?: { threadId?: string; postId?: string }
  ): string {
    const keyValuePairs = [];
    if (options?.threadId) {
      keyValuePairs.push(`TID=${options.threadId}`);
    }
    if (options?.postId) {
      keyValuePairs.push(`PID=${options.postId}`);
    }
    keyValuePairs.push(`token=${post.token}`);
    keyValuePairs.push(`${prefix}_title=${escape(post.title)}`);
    keyValuePairs.push(`${prefix}_icon=${post.icon}`);
    keyValuePairs.push(`message=${escape(post.message)}`);
    keyValuePairs.push(`${prefix}_converturls=${post.convertUrls ? '1' : '0'}`);
    keyValuePairs.push(
      `${prefix}_disablebbcode=${post.disableBbCode ? '1' : '0'}`
    );
    keyValuePairs.push(
      `${prefix}_disablesmilies=${post.disableEmojis ? '1' : '0'}`
    );
    keyValuePairs.push(`submit=Eintragen`);
    return keyValuePairs.join('&');
  }

  /**
   * Process the response after attempting to create or edit a post for signs
   * of success or failure. Returns true if success could be confirmed and raises
   * errors if success could not be confirmed. Will also attempt to extract and display
   * information about why the process failed.
   * @param response The response object.
   * @returns Whether the check was successful.
   */
  async processResponse(response: Response): Promise<string | boolean | null> {
    const text = await response.text();
    if (new RegExp(/Antwort erstellt/).test(text)) {
      // Attempt to retrieve and return the post id
      const postIdMatches = text.match(/(?:(PID=)(\d*)(#))/);
      if (postIdMatches && postIdMatches.length >= 3) {
        return postIdMatches[2] as string;
      } else return null;
    } else if (new RegExp(/Antwort wurde editiert/).test(text)) {
      return true;
    } else {
      if (new RegExp(/Du postest zu viel in zu kurzer Zeit/).test(text)) {
        this.messages.showNotification(
          'Du postest zu viel in zu kurzer Zeit.',
          'error'
        );
        throw new Error('Too many requests.');
      } else {
        this.messages.showNotification(
          'Das hat leider nicht geklappt.',
          'error'
        );
        throw new Error('Unable to confirm success due to an unknown reason.');
      }
    }
  }
}
