import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import { Posts } from 'potber-client/services/api/types';
import Thread from 'potber-client/models/thread';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';
import RendererService from 'potber-client/services/renderer';
import SessionService from 'potber-client/services/session';

interface Params {
  TID: string;
  page: number;
}

export interface PostCreateRouteModel {
  thread: Thread;
  post: Posts.Create;
}

export default class PostCreateRoute extends Route {
  @service declare renderer: RendererService;
  @service declare messages: MessagesService;
  @service declare store: CustomStore;
  @service declare session: SessionService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params: Params, transition: Transition<unknown>) {
    try {
      // Retrieve the thread with its last page so we can display recent posts and other information about the thread
      const thread = await this.store.findRecord('thread', params.TID, {
        adapterOptions: {
          queryParams: {
            page: params.page,
            updateBookmark: false,
          },
        },
      });
      const post: Posts.Create = {
        message: '',
        threadId: thread.id,
      };
      return {
        thread,
        post,
      } as PostCreateRouteModel;
    } catch (error) {
      // Abort the transition and allow the user to try again
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
