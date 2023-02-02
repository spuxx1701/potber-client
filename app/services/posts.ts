import { service } from '@ember/service';
import PostFormComponent, {
  PostFormContent,
} from 'potber/components/board/post-form';
import ApiService from './api';
import MessagesService from './messages';
import ENV from 'potber/config/environment';

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
      const token = await this.retrieveFormToken(
        `newreply.php?TID=${threadId}`
      );
      const body = this.createFormBody(post, token, { threadId });
      console.log(body);
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

  /**
   * Creats a form body from the given post and other parameters.
   * @param post The post.
   * @param token The form token.
   * @param options Optional options. Either threadId or postId must be supplied.
   * @returns The form body.
   */
  createFormBody(
    post: PostFormContent,
    token: string,
    options?: { threadId?: string }
  ): string {
    const keyValuePairs = [];
    if (options?.threadId) {
      keyValuePairs.push(`TID=${options.threadId}`);
    }
    keyValuePairs.push(`token=${token}`);
    keyValuePairs.push(`post_title=${post.title}`);
    keyValuePairs.push(`post_icon=${post.icon}`);
    keyValuePairs.push(`message=${post.message}`);
    keyValuePairs.push(`post_converturls=${post.convertUrls ? '1' : '0'}`);
    keyValuePairs.push(`post_disablebbcode=${post.disableBbCode ? '1' : '0'}`);
    keyValuePairs.push(`post_disablesmilies=${post.disableEmojis ? '1' : '0'}`);
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
  async processResponse(response: Response) {
    const text = await response.text();
    if (new RegExp(/Antwort erstellt\s!/).test(text)) {
      this.messages.showNotification('Post wurde erstellt.', 'success');
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
    // Attempt to retrieve and return the post id
    const postIdMatches = text.match(/(?:(PID=)(\d*)(#))/);
    if (postIdMatches && postIdMatches.length >= 3) {
      return postIdMatches[2];
    } else return null;
  }
}
