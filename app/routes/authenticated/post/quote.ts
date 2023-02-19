import Transition from '@ember/routing/transition';
import Post from 'potber-client/models/post';
import Thread from 'potber-client/models/thread';
import PostCreateRoute from './create';

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
      const quotedPost = await this.store.findRecord('post', params.PID, {
        reload: true,
        adapterOptions: {
          queryParams: {
            threadId: params.TID,
            quote: true,
          },
        },
      });
      if (model) model.post.message = `${quotedPost.message}\n\n`;
      return model;
    } catch (error) {
      this.messages.showNotification(
        'Da ist etwas schiefgegangen. Bitte versuche es nochmal.',
        'error'
      );
      transition.abort();
    }
  }
}
