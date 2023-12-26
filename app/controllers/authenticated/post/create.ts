import Controller from '@ember/controller';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { PostCreateRouteModel } from 'potber-client/routes/authenticated/post/create';
import ApiService from 'potber-client/services/api';
import { WritablePost } from 'potber-client/services/api/models/post';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @service declare api: ApiService;

  queryParams = ['TID', 'page'];

  handleSubmit = async (post: WritablePost) => {
    try {
      const createdPost = await post.save({ method: 'POST' });
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID: createdPost.threadId,
          PID: createdPost.id,
        },
      });
    } catch (error) {
      // Errors have already been handled, so do nothing and allow the user to try again
    }
  };
}
