import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import { PostFormContent } from 'potber-client/components/board/post-form';
import { Thread } from 'potber-client/services/api/types/thread';
import MessagesService from 'potber-client/services/messages';
import PostsService from 'potber-client/services/posts';
import RendererService from 'potber-client/services/renderer';
import RSVP from 'rsvp';

interface Params {
  TID: string;
  PID: string;
}

export interface PostEditRouteModel {
  threadId: string;
  post: PostFormContent;
}

export default class PostEditRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare posts: PostsService;

  async model(params: Params, transition: Transition<unknown>) {
    try {
      // Retrieve the thread with its last page so we can return to the post after editing
      // Initialize the post
      const post = await this.posts.initializePostFormContent(
        `editreply.php?PID=${params.PID}`,
        params.PID
      );
      return RSVP.hash({
        threadId: params.TID,
        post,
      });
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
