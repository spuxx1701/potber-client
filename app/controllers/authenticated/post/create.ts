import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { PostFormContent } from 'potber-client/components/board/post-form';
import { PostCreateRouteModel } from 'potber-client/routes/authenticated/post/create';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare router: RouterService;
  @tracked busy = false;

  queryParams = ['TID', 'page'];

  @action async handleSubmit(post: PostFormContent) {
    this.busy = true;
    // const postId = await this.posts.createPost(this.model.thread.id, post);
    const postId = 'TODO';
    this.busy = false;
    if (postId) {
      this.router.transitionTo('authenticated.thread', {
        queryParams: {
          TID: this.model.thread.id,
          PID: postId,
        },
      });
    }
  }
}
