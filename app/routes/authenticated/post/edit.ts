import { action } from '@ember/object';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import SlowRoute from 'potber-client/routes/slow';
import ApiService from 'potber-client/services/api';
import { WritablePost } from 'potber-client/services/api/models/post';
import RendererService from 'potber-client/services/renderer';

interface Params {
  TID: string;
  PID: string;
}

export interface PostEditRouteModel {
  threadId: string;
  postId: string;
  post: WritablePost;
}

export default class PostEditRoute extends SlowRoute {
  @service declare renderer: RendererService;
  @service declare api: ApiService;

  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    PID: {
      refreshModel: true,
    },
  };

  async model(params: Params, transition: Transition<unknown>) {
    try {
      const currentPost = await this.api.findPostById(params.PID, params.TID);
      const post = new WritablePost({ ...currentPost }, this);
      return {
        threadId: params.TID,
        post,
      } as PostEditRouteModel;
    } catch (error) {
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
