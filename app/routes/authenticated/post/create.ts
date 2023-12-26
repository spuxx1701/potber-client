import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import RendererService from 'potber-client/services/renderer';
import SessionService from 'potber-client/services/session';
import ApiService from 'potber-client/services/api';
import { Threads } from 'potber-client/services/api/types';
import { WritablePost } from 'potber-client/services/api/models/post';

interface Params {
  TID: string;
  page: number;
}

export interface PostCreateRouteModel {
  thread: Threads.Read;
  post: WritablePost;
}

export default class PostCreateRoute extends Route {
  @service declare renderer: RendererService;
  @service declare session: SessionService;
  @service declare api: ApiService;

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
      const thread = await this.api.findThreadById(params.TID, {
        page: params.page,
        updateBookmark: false,
      });
      const post = new WritablePost(
        {
          message: '',
          threadId: thread.id,
        },
        this,
      );
      return {
        thread,
        post,
      } as PostCreateRouteModel;
    } catch (error) {
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
