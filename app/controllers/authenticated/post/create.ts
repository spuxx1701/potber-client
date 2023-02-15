import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Post from 'potber-client/models/post';
import { PostCreateRouteModel } from 'potber-client/routes/authenticated/post/create';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare store: CustomStore;
  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @tracked busy = false;

  queryParams = ['TID', 'page', 'PID'];

  @action async handleSubmit(post: Post) {
    this.busy = true;
    try {
      const createdPost = await post.save();
      if (createdPost.id) {
        this.router.transitionTo('authenticated.thread', {
          queryParams: {
            TID: createdPost.threadId,
            PID: createdPost.id,
          },
        });
      }
    } catch (error) {
      this.messages.logErrorAndNotify(
        'Das hat leider nicht geklappt.',
        error,
        this.constructor.name
      );
    }
    this.busy = false;
  }
}
