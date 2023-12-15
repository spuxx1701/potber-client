import Transition from '@ember/routing/transition';
import Post from 'potber-client/models/post';
import Thread from 'potber-client/models/thread';
import PostCreateRoute, { PostCreateRouteModel } from './create';
import { Posts } from 'potber-client/services/api/types';

interface Params {
  TID: string;
  page: number;
  PID: string;
}

export interface PostQuoteRouteModel {
  thread: Thread;
  post: Post;
}

export default class PostQuoteRoute extends PostCreateRoute {
  // We need to tell the route to refresh the model after the query parameters have changed
  queryParams = {
    TID: {
      refreshModel: true,
    },
    PID: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  async model(params: Params, transition: Transition<unknown>) {
    const model = await super.model(params, transition);
    try {
      // Prepare the quote
      const quotedPost = await this.api.quotePost(params.PID);
      (model as PostCreateRouteModel).post.message = quotedPost.message;
      return model;
    } catch (error) {
      transition.abort();
    }
  }
}
