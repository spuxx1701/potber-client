import EmberObject from '@ember/object';
import { Model } from './model';
import { Posts } from '../types';

interface IWritablePost extends Posts.Write {
  id?: string;
}

export class WritablePost extends Model implements IWritablePost {
  message!: string;
  threadId!: string;
  id?: string;
  title?: string;
  icon?: string;
  convertUrls?: boolean = true;
  disableBbCode?: boolean;
  disableEmojis?: boolean;

  constructor(init: IWritablePost, context: EmberObject) {
    super(context);
    Object.assign(this, init);
  }

  /**
   * Saves the post to the server.
   */
  async save(options: { method: 'POST' | 'PUT' }): Promise<Posts.Read> {
    if (options.method === 'PUT' && !this.id)
      throw new Error('Cannot update a post without an id.');
    super.save();
    let post: Posts.Read | undefined;
    try {
      if (options.method === 'PUT' && this.id) {
        post = await this.api.updatePost(this.id, this, {
          timeoutWarning: true,
        });
      } else {
        post = await this.api.createPost(this, { timeoutWarning: true });
      }
      this._isSaving = false;
      return post;
    } catch (error) {
      this._isSaving = false;
      throw error;
    }
  }
}
