import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { PostFormContent } from 'potber-client/components/board/post-form';
import { PostCreateRouteModel } from 'potber-client/routes/authenticated/post/create';
import CustomStore from 'potber-client/services/custom-store';
import MessagesService from 'potber-client/services/messages';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare store: CustomStore;
  @service declare messages: MessagesService;
  @service declare router: RouterService;
  @tracked busy = false;

  queryParams = ['TID', 'page'];

  @action async handleSubmit(post: PostFormContent) {
    this.busy = true;
    try {
      const newPost = this.store.createRecord('post', {
        threadId: this.model.thread.id,
        ...post,
      });
      await newPost.save();
      if (newPost.id) {
        this.router.transitionTo('authenticated.thread', {
          queryParams: {
            TID: this.model.thread.id,
            PID: newPost.id,
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

    // const post = await this.store.createRecord('post', {});
    // const postId = 'TODO';
  }
}
