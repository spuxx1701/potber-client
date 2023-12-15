import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import ApiService from 'potber-client/services/api';
import { Posts } from 'potber-client/services/api/types';
import RendererService from 'potber-client/services/renderer';

interface Params {
  TID: string;
  PID: string;
}

export interface PostEditRouteModel {
  threadId: string;
  post: Posts.Write;
}

export default class PostEditRoute extends Route {
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
      const post = await this.api.findPostById(params.PID, params.TID);
      return post;
    } catch (error) {
      transition.abort();
    }
  }

  @action didTransition() {
    this.renderer.trySetScrollPosition();
  }
}
