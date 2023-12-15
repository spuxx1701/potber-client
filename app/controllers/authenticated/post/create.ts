import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { PostCreateRouteModel } from 'potber-client/routes/authenticated/post/create';
import ApiService from 'potber-client/services/api';
import { Post } from 'potber-client/services/api/types';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare store: CustomStore;
  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @service declare api: ApiService;
  @tracked busy = false;

  queryParams = ['TID', 'page'];

  @action async handleSubmit(post: Post) {
    this.busy = true;
    try {
      const createdPost = await this.api.createPost(post);
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID: createdPost.threadId,
          PID: createdPost.id,
        },
      });
    } catch (error) {
      // Errors have already been handled, so do nothing and allow the user to try again
    }
    this.busy = false;
  }
}
