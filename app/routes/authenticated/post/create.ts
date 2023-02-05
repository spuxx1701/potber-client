import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import { PostFormContent } from 'potber/components/board/post-form';
import { Thread } from 'potber/services/api/types/thread';
import MessagesService from 'potber/services/messages';
import PostsService from 'potber/services/posts';
import RendererService from 'potber/services/renderer';
import ThreadsService from 'potber/services/threads';
import RSVP from 'rsvp';

interface Params {
  TID: string;
  page: number;
}

export interface PostCreateRouteModel {
  thread: Thread;
  post: PostFormContent;
}

export default class PostCreateRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare threads: ThreadsService;
  @service declare posts: PostsService;

  async model(params: Params, transition: Transition<unknown>) {
    try {
      // Retrieve the thread with its last page so we can display recent posts and other information about the thread
      const thread = await this.threads.getThread(params.TID, {
        page: params.page,
        updateBookmark: false,
      });
      // Initialize the post
      const post = await this.posts.initializePostFormContent(
        `newreply.php?TID=${params.TID}`
      );
      return RSVP.hash({
        thread,
        post,
      } as PostCreateRouteModel);
    } catch (error) {
      this.messages.showNotification(
        'Da ist etwas schiefgegangen. Bitte versuche es nochmal.',
        'error'
      );
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.tryResetScrollPosition();
  }
}
