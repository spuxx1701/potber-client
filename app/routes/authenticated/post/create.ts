import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import Post from 'potber-client/models/post';
import Thread from 'potber-client/models/thread';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';
import RendererService from 'potber-client/services/renderer';
import RSVP from 'rsvp';

interface Params {
  TID: string;
  page: number;
}

export interface PostCreateRouteModel {
  thread: Thread;
  post: Post;
}

export default class PostCreateRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare store: CustomStore;

  async model(params: Params, transition: Transition<unknown>) {
    try {
      // Retrieve the thread with its last page so we can display recent posts and other information about the thread
      const thread = await this.store.findRecord('thread', params.TID, {
        queryParams: {
          page: params.page,
          updateBookmark: false,
        },
      });
      // Initialize the post
      const post = this.store.createRecord('post', {
        threadId: thread.id,
      });
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
